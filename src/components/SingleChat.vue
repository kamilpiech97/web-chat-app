<template>
  <!-- Chat Box-->
  <div class="col-lg-9 px-0 chat-div">
    <Info v-if="this.typeOfRoom.length === 0" />
    <flash-message transitionIn="animated swing" class="alert-box"></flash-message>
    <div class="px-4 py-5 chat-box bg-white" ref="chatBox">
      <!-- Sender Message-->
      <div
        :key="item.key"
        v-for="item in messages"
        class="text-left media w-50 mb-3 active"
        :class="[item.userId === $store.state.user.userId ? 'ml-auto':'']"
      >
        <!-- Message -->
        <div class="media-body ml-3">
          <div
            class="rounded py-2 px-3 mb-2"
            :class="[item.userId === $store.state.user.userId?'bg-primary':'bg-dark',item.status === 2 ? 'deleted-message':'']"
          >
            <div v-if="item.status == 0 || item.status == 2">
              <p
                class="text-small text-white mb-0"
                :class="[item.status === 2 ? 'font-weight-bold':'']"
              >{{item.message}}</p>
            </div>
            <div v-else>
              <img :src="item.message" class="img-fluid" />
            </div>
          </div>
          <div :class="[item.userId === $store.state.user.userId ? 'nickname-text':'']">
            <small
              v-on:click="deleteMessage(item.messageId);"
              v-if="item.userId === $store.state.user.userId && item.status != 2"
              class="delete-link"
            >Usuń |</small>
            <small
              v-if="item.userId === $store.state.user.userId"
              class="small text-left text-muted"
            >{{item.nickname}}</small>
            <small class="small text-left text-muted" v-else>{{item.nickname}}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- Typing area -->
    <div class="input-group typing-box">
      <input
        type="text"
        v-model="message"
        @keyup.enter="saveMessage(0)"
        placeholder="Type a message"
        aria-describedby="button-addon2"
        class="form-control rounded-0 border-0 py-4 bg-light"
      />
      <div class="input-group-append">
        <button
          id="button-addon3"
          class="btn btn-link"
          onclick="document.getElementById('fileInput').click()"
        >
          <input id="fileInput" type="file" style="display:none" @change="savePhoto($event);" />
          <font-awesome-icon icon="image" />
        </button>
        <button id="button-addon2" type="submit" class="btn btn-link">
          <font-awesome-icon icon="paper-plane" v-on:click="saveMessage(0)" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
import firebase, { auth, firestorage, Timestamp } from "firebase";
import Info from "@/components/Info.vue";
import deleteMessage from "@/mixins/deleteMessage";
import getNow from "@/mixins/getNow";
import storePhoto from "@/mixins/storePhoto";
import notifyMe from "../mixins/notifyMe";
import scroll from "../mixins/scroll";
import saveMessage from "../mixins/saveMessage";
import alert from "../mixins/alert";
import storeNotification from "../mixins/storeNotification";

export default {
  name: "SingleChat",
  mixins: [
    deleteMessage,
    getNow,
    storePhoto,
    notifyMe,
    scroll,
    saveMessage,
    alert,
    storeNotification
  ],
  data() {
    return {
      message: "",
      file: null,
      messages: {},
      chatId: {},
      typeOfRoom: ""
    };
  },
  components: {
    Info
  },
  methods: {
    unmount() {
      if (this.listener) {
        this.listener();
      }
    },
    fetchMessages() {
      console.log(this.typeOfRoom);
      this.listener = db
        .collection(this.typeOfRoom)
        .doc(this.chatId)
        .collection(this.chatId)
        .orderBy("timestamp")
        .onSnapshot(querySnapshot => {
          let allMessages = [];
          querySnapshot.forEach(doc => {
            allMessages.push(doc.data());
          });
          this.messages = allMessages;
          setTimeout(() => {
            this.scrollToBottom();
          }, 10);
        });
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "storeChatId") {
        console.log(`Updating to ${state.chatId}`);
        this.unmount();
        this.chatId = this.$store.state.chatId;
        this.typeOfRoom = this.$store.state.typeOfRoom;
        this.fetchMessages();
      }
    });
  }
};
</script>
<style scoped>
.media p {
  word-break: break-all;
}
.typing-box {
  border-top: 1px solid black;
  border-left: 1px solid black;
}
.delete-link {
  color: red;
  cursor: pointer;
}
.deleted-message {
  opacity: 0.5;
}
@media (max-width: 991px) {
  .media {
    width: 80% !important;
  }
  .nickname-text {
    text-align: right;
  }
}
</style>