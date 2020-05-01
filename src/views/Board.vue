<template>
  <div>
    <div class="container-fluid">
      <div class="row rounded-lg overflow-hidden shadow">
        <div v-if="!$online" class="offline-box">
          <h1 class="bg-danger text-white">Brak internetu!</h1>
        </div>
        <List />
        <SingleChat />
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import List from "@/components/List.vue";
import SingleChat from "@/components/SingleChat.vue";
import firebase, { auth } from "firebase";
import { mapState, mapGetters } from "vuex";
import store from "../store";
import notifyMe from "../mixins/notifyMe";

export default {
  name: "Board",
  mixins:[notifyMe],
  data() {
    return {
      authUser: {},
      group: {},
      peerUser: {}
    };
  },
  components: {
    List,
    SingleChat
  },

  methods: {
    handleConnectivityChange(status) {
      console.log(status);
    },
    user() {
      alert(this.$store.state.user.uid);
    },
    hashString(str) {
      console.log(this.peerUser);
      console.log(this.authUser);
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    },

    initializeGroup(name) {
      this.clearMessages();
      this.setGroup(name);
    },

    setGroup(name) {
      store.dispatch("setChatId", name);
    },

    initializePeerUser() {
      this.clearMessages();
      this.getGroupChatId();
    },

    clearMessages() {
      this.messages = [];
    },

    getGroupChatId() {
      console.log(this.peerUser);
      if (this.hashString(this.authUser.id) <= this.hashString(this.peerUser)) {
        this.groupChatId = `${this.authUser.id}-${this.peerUser}`;
      } else {
        this.groupChatId = `${this.peerUser}-${this.authUser.id}`;
      }
      store.dispatch("setChatId", this.groupChatId);
      console.log(this.groupChatId);
    },
    checkNotifications(){
        this.listenerNotify = db.collection("notifications")
        .where('toUserId', '==', this.$store.state.user.id)
        .onSnapshot(querySnapshot => {
          let newNotification = [];
          querySnapshot.forEach(doc => {
            newNotification.push(doc.data());
            store.dispatch("setNotification", newNotification[0]);
          });

      });
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("works");
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(function(doc) {
            store.dispatch("setSession", doc.data());
          });
      } else {
        this.authUser = {};
      }
    });
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "storeGroup") {
        console.log(`Updating to ${state.chatId}`);
        this.authUser = this.$store.state.user;
        this.initializeGroup(this.$store.state.chatId);
      }

      if (mutation.type === "storePeerUser") {
        console.log(`Updating to ${state.currentPeerUser}`);
        this.authUser = this.$store.state.user;
        this.peerUser = this.$store.state.currentPeerUser;
        this.initializePeerUser();
      }

      if (mutation.type === "storeNotification") {
        //console.log(`Message from ${state.notification.fromUserName}`);
        this.notifyMe(state.notification);
      }
      
    });
    this.checkNotifications();
  },
  beforeDestroy() {
    this.unsubscribe();
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next();
        } else {
          next("/login");
        }
      });
    });
  }
};
</script>
<style scoped>
.offline-box {
  height: 100vh;
  width: 100vw;
  z-index: 10001;
  position: absolute;
}
.offline-box h1 {
  line-height: 6rem;
}
</style>