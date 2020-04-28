<template>
  <!-- Chat Box-->
  <div class="col-lg-9 px-0 chat-div">
      <!-- <Info v-if="this.$store.state.currentPeerUser"/> -->
    <div class="px-4 py-5 chat-box bg-white">
      <!-- Sender Message-->
      <div
        :key="item.key"
        v-for="item in messages"
        class="text-left media w-50 mb-3 active"
        :class="[item.userId === $store.state.user.id ? 'ml-auto':'']"
      >
          <!-- TEXT Message-->
          <div class="media-body ml-3" 
            v-if="item.type == 1">
            <div class="rounded py-2 px-3 mb-2"
              :class="[item.userId === $store.state.user.id?'bg-primary':'bg-dark']">
              <p
                class="text-small mb-0"
                :class="[item.userId === $store.state.user.id?'text-white':'text-white']"
              >{{item.message}}</p>
            </div>
            <small v-on:click="deleteMessage(item.createdAt)"  v-if="item.userId === $store.state.user.id && item.deleted == 0" class="delete-link">Usuń |</small>
            <small
              v-if="item.userId === $store.state.user.id"
              class="small text-left text-muted"
            > {{item.nickname}}</small> 
            <small
              class="small text-left text-muted" v-else>
              {{item.nickname}}</small>
          </div>
          <!-- PHOTO Message--> 
          <div class="media-body ml-3" 
            v-if="item.type == 2">
            <div class="rounded py-2 px-3 mb-2"
              :class="[item.userId === $store.state.user.id?'bg-primary':'bg-dark']">
              <img
                :src="item.message"
                class="img-fluid"
              >
            </div>
            <small
              v-if="item.userId != $store.state.currentPeerUser"
              class="small text-left text-muted"
            >{{item.nickname}}</small>
            <small v-on:click="deleteMessage(item.createdAt)" v-if="item.userId === $store.state.user.id && item.deleted == 0" class="delete-link">Usuń | </small>
            <small
              v-if="item.userId === $store.state.user.id"
              class="small text-left text-muted"
            >{{item.nickname}}</small>
          </div>
      </div>
    </div>
    <!-- Typing area -->
    <div class="input-group typing-box">
      <input
        type="text"
        v-model="message"
        @keyup.enter="saveMessage(1)"
        placeholder="Type a message"
        aria-describedby="button-addon2"
        class="form-control rounded-0 border-0 py-4 bg-light"
      />
      <div class="input-group-append">
        <button id="button-addon3" class="btn btn-link" onclick="document.getElementById('fileInput').click()">
          <input id="fileInput" type="file" style="display:none" @change="storePhoto($event);"/>
          <font-awesome-icon icon="image" />
        </button>
        <button id="button-addon2" type="submit" class="btn btn-link">
          <font-awesome-icon icon="paper-plane" v-on:click="saveMessage(1)" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
import firebase, { auth, firestorage }  from "firebase";
import Info from "@/components/Info.vue";

export default {
  name: "SingleChat",

  data() {
    return {
      message: "",
      file: null,
      messages: {},
      chatId: {}
    };
  },
  components: {
    Info
  },

  methods: {
    componentWillUnmount() {
      if (this.listener) {
        this.listener();
      }
    },

    fetchMessages() {
      this.listener = db
        .collection("msg")
        .doc(this.chatId)
        .collection(this.chatId)
        .orderBy("createdAt")
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
    },

    scrollToBottom() {
      let box = document.querySelector(".chat-box");
      box.scrollTop = box.scrollHeight;
    },

    getNow: function() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
      return dateTime;
    },

    saveMessage(type) {
      console.log(this.chatId);
      db.collection("msg")
        .doc(this.chatId)
        .collection(this.chatId)
        .doc(this.getNow())
        .set({
          message: this.message,
          userId: this.$store.state.user.id,
          nickname: this.$store.state.user.nickname,
          type:type,
          deleted: "0",
          createdAt: this.getNow()
        })
        .then(() => {
          this.message = null;
        });
      setTimeout(() => {
        this.scrollToBottom();
      }, 70);
    },
    storePhoto(e){
        this.file = e.target.files[0];
        console.log(this.file);
        var uploadTask = firebase.storage().ref(this.file.name).put(this.file);
        uploadTask.on("state_changed", null,
          err => {
            console.log('fail')
          },
          () => {
                  uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                  this.message = downloadURL;
                  this.saveMessage(2);
                  })
                })
        this.file = null;
    },
    deleteMessage(id){
      db.collection("msg")
        .doc(this.chatId)
        .collection(this.chatId)
        .doc(id)
        .update({
          type: "1",
          message: "Wiadomość usunięta",
          deleted: "1"
          
      })
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "storeChatId") {
        console.log(`Updating to ${state.chatId}`);
        this.componentWillUnmount();
        this.chatId = this.$store.state.chatId;
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
.typing-box{
  border-top: 1px solid black;
  border-left: 1px solid black;
}
.delete-link{
  color: red;
  cursor: pointer;
}
</style>