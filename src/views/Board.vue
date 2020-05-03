<template>
  <div>
    <div class="container-fluid">
      <div class="row rounded-lg overflow-hidden shadow">
        <div v-if="!$online" class="offline-box">
          <h1 class="bg-danger text-white">Brak internetu!</h1>
        </div>
        <flash-message transitionIn="animated swing" class="alert-box"></flash-message>
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
      this.authUser = this.$store.state.user;
      console.log(this.peerUser);
      console.log(this.authUser);
      if (this.hashString(this.authUser.userId) <= this.hashString(this.peerUser)) {
        this.groupChatId = `${this.authUser.userId}-${this.peerUser}`;
      } else {
        this.groupChatId = `${this.peerUser}-${this.authUser.userId}`;
      }
      store.dispatch("setChatId", this.groupChatId);
      console.log(this.groupChatId);
    },
    checkNotifications(){
        this.listenerNotify = db.collection("notifications")
        .where('toUserId', '==', this.$store.state.user.userId)
        .onSnapshot(querySnapshot => {
          let newNotification = [];
          querySnapshot.forEach(doc => {
            newNotification.push(doc.data());
            store.dispatch("setNotification", newNotification[0]);
          });

      });
    },
        checkNotificationsGrant(){
            if (Notification.permission !== "denied") {
                // If it's okay let's create a notification
                Notification.requestPermission().then(function(permission) { 
                  console.log('udzielono zgody');
                });
              }
        },
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("works");
      } else {
        this.authUser = {};
      }
    });
  },
  created() {
    console.log(this.$store.state.user.nickname);
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
        this.notify(state.notification);
      }

      if (mutation.type === "logoutUser") {
        console.log(`Notify end!`);
        this.listenerNotify();
      }

      this.authUser = this.$store.state.user;
      
    });
     this.checkNotificationsGrant();
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
.alert-box{
  position: absolute;
  z-index: 1051;
  right: 10px;
  top: 10px;
}

.alert-box .danger{
  background: #a94442!important;
}
</style>