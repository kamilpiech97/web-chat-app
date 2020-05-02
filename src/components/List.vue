<template>
  <!-- Users box-->
  <div class="col-lg-3 px-0">
    <modal v-show="isModalVisible" @close="closeModal" />
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
        <a v-on:click="showModal();" class="mr-3">
          <font-awesome-icon icon="cog" style="font-size:30px;" />
        </a>
        <p class="h5 mb-0 py-1">{{ this.$store.state.user.nickname }}</p>
      </div>

      <div class="messages-box">
        <a>
          <h3>Użytkownicy</h3>
        </a>
        <input
          type="text"
          class="w-100 form-control rounded-0 border-0 py-4 bg-light border-top-1"
          v-model="search"
          placeholder="Szukaj"
        />
        <div class="list-group rounded-0">
          <a
            v-on:click="changePeer(user.userId, user.nickname, 'privaterooms');openMenu();"
            :key="user.id"
            v-for="user in users"
            class="list-group-item list-group-item-action list-group-item-light rounded-0"
            :class="[user.userId ===  $store.state.user.userId ?'d-none':'', user.userId ===  $store.state.currentPeerUser ? 'active text-white':'']"
          >
            <div class="media">
              <img v-bind:src="user.avatar" alt="user" width="50" class="rounded-circle user-img" />
              <div class="media-body ml-4">
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <h6
                    class="mb-0"
                    :class="[user.status === 'online' ? 'text-success': 'text-danger']"
                  >{{user.nickname}}</h6>
                </div>
              </div>
            </div>
          </a>
          <a>
            <h3>Grupy</h3>
          </a>
          <a
            v-on:click="changeGroup(group, 'groupchat')"
            :key="group.id"
            v-for="group in groups"
            class="list-group-item list-group-item-action list-group-item-light rounded-0"
            :class="[group ===  $store.state.chatId ? 'active text-white':'']"
          >
            <div class="media">
              <!-- <img v-bind:src="group.photoUrl" alt="user" width="50" class="rounded-circle" /> -->
              <div class="media-body ml-4">
                <div class="d-flex align-items-center justify-content-between mb-1">
                  <h6 class="mb-0">{{group}}</h6>
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
import Modal from "@/components/Profile.vue";

export default {
  name: "SingleChat",
  data() {
    return {
      users: {},
      groups: ['mems', 'start wars'],
      isModalVisible: false,
      user: "",
      search: "",
      notification: {}
    };
  },
  components: {
    Modal
  },
  computed: {
    filteredUsers: function() {
      return this.users.filter(user => {
        return user.nickname.toLowerCase().includes(this.search.toLowerCase())
      });
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    openMenu() {
      document.getElementById("messages-div").classList.toggle("active");
      console.log("open");
    },
    changePeer(id, nickname, type) {
      store.dispatch("setTypeOfRoom", type);
      store.dispatch("setPeerUser", id);
      store.dispatch("setPeerUserNickname", nickname);
      console.log(this.$store.state.currentPeerUserNickname);
    },
    changeGroup(name, type) {
      console.log(name);
      store.dispatch("setTypeOfRoom", type);
      store.dispatch("removePeerUser", name);
      store.dispatch("setGroup", name);
    },
    logout() {
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
    let resultUsers = db.collection("users").onSnapshot(querySnapshot => {
      let allUsers = [];
      querySnapshot.forEach(doc => {
        allUsers.push(doc.data());
      });

      this.users = allUsers;
    });

    // let groups = db.collection("groupchats").onSnapshot(querySnapshot => {
    //   let allGroups = [];
    //   querySnapshot.forEach(doc => {
    //     allGroups.push(doc.data());
    //   });

    //   this.groups = allGroups;
    // });
  }
};
</script>

<style scoped>
.user-img{
  height: 50px;
}
</style>
