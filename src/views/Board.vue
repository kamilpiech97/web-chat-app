<template>
  <div>
    <div class="container-fluid">
      <div class="row rounded-lg overflow-hidden shadow">
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
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: "Board",
  data() {
    return {
      authUser: {},
      peerUser: {}
    };
  },
  components: {
    List,
    SingleChat
  },

  methods: {
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

    getGroupChatId() {
      this.messages = [];
      console.log(this.peerUser);
      if (this.hashString(this.authUser.id) <= this.hashString(this.peerUser)) {
        this.groupChatId = `${this.authUser.id}-${this.peerUser}`;
      } else {
        this.groupChatId = `${this.peerUser}-${this.authUser.id}`;
      }

      store.dispatch("setChatId", this.groupChatId);
      console.log(this.groupChatId);
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      console.log("works");
      let resultUser = db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(function(doc) {
        store.dispatch("setSession", doc.data());

      });
      } else {
        this.authUser = {};
      }
    });

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "storePeerUser") {
        console.log(`Updating to ${state.currentPeerUser}`);

        this.authUser = this.$store.state.user;
        this.peerUser = this.$store.state.currentPeerUser;
        this.getGroupChatId();
      }
    });
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
