<template>
  <!-- Users box-->
    <div class="col-lg-3 px-0">
      <div class="button-div">
        <a v-on:click="openMenu();">
          <font-awesome-icon icon="bars" style="font-size:30px;" />
        </a>
      </div>
      <div class="bg-white messages-div" id="messages-div">
        <div class="bg-gray px-4 py-2 bg-light d-flex">
          <a v-on:click="logout();" class="mr-3">
            <font-awesome-icon icon="sign-out-alt" style="font-size:30px;" />
          </a>
          <p class="h5 mb-0 py-1">{{ $store.state.user.nickname }}</p>
        </div>

        <div class="messages-box">
          <div class="list-group rounded-0">
            <a 
            v-on:click="changePeer(user.id, user.nickname);openMenu();"
              :key="user.id"
              v-for="user in users"
              class="list-group-item list-group-item-action list-group-item-light rounded-0"
              :class="[user.id ===  $store.state.user.id ?'d-none':'', user.id ===  $store.state.currentPeerUser ? 'active text-white':'']"
            >
                <div class="media">
                  <img v-bind:src="user.photoUrl" alt="user" width="50" class="rounded-circle" />
                  <div class="media-body ml-4">
                    <div class="d-flex align-items-center justify-content-between mb-1">
                      <h6 class="mb-0" :class="[user.status === 'online' ? 'text-success': 'text-danger']">{{user.nickname}}</h6>
                    </div>
                  </div>
                </div>
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import firebase, { auth } from "firebase";
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: "SingleChat",
  data() {
    return {
      users: {},
      user: ''
    };
  },
  methods: {
    openMenu() {
      document.getElementById("messages-div").classList.toggle("active");
      console.log("open");
    },
    changePeer(id, nickname) {
      store.dispatch("setPeerUser", id);
      store.dispatch("setPeerUserNickname", nickname);
      console.log(this.$store.state.currentPeerUserNickname);
    },
    updateStatus(){
      db.collection("users")
        .doc(this.$store.state.user.id)
        .update({
          status: "offline"
      })
    },
    logout() {
      this.updateStatus();
      firebase
        .auth()
        .signOut()
        .then(
          function() {
            this.$router.push("/login");
          },
          function(error) {
            console.log(error);
          }
        );
    }
  },

  beforeCreate() {
    let resultUsers = db
      .collection("users")
      .onSnapshot(querySnapshot => {
        let allUsers = [];
        querySnapshot.forEach(doc => {
          allUsers.push(doc.data());
        });

        this.users = allUsers;
      });

  },
  //  created(){
  //     window.addEventListener('beforeunload', this.updateStatus());
  //  }
};
</script>
