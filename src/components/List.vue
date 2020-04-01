<template>
        <!-- Users box-->
        <div class="col-3 px-0 messages-div" id="messages-div">
          <div class="bg-white">

            <div class="bg-gray px-4 py-2 bg-light d-flex">
              <a v-on:click="logout();" class="mr-3"><font-awesome-icon icon="sign-out-alt" style="font-size:30px;" /></a>
              <p class="h5 mb-0 py-1">Recent {{ $store.state.user.displayName }}</p>
              <a v-on:click="closeMenu();" class="mobile-close"><font-awesome-icon icon="times" style="font-size:30px;" /></a>
            </div>

            <div class="messages-box">
              <div class="list-group rounded-0">
                
                <a class="list-group-item list-group-item-action active text-white rounded-0">
                  <div class="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle">
                    <div class="media-body ml-4">
                      <div class="d-flex align-items-center justify-content-between mb-1">
                        <h6 class="mb-0">Jason Doe</h6><small class="small font-weight-bold">25 Dec</small>
                      </div>
                    </div>
                  </div>
                </a>
                    <!-- setPeerUser(user.id);getGroupChatId(); -->
                <div :key="user.id" v-for="user in users" class="list-group-item list-group-item-action list-group-item-light rounded-0" :class="[user.id ===  $store.state.user.uid ?'d-none':'']">
                    <a v-on:click="changePeer(user.id)">
                        <div class="media"><img v-bind:src="user.photoUrl" alt="user" width="50" class="rounded-circle">
                            <div class="media-body ml-4">
                            <div class="d-flex align-items-center justify-content-between mb-1">
                                <h6 class="mb-0">{{user.nickname}}</h6>
                            </div>
                            </div>
                        </div>
                    </a>
                </div>


              </div>
            </div>
          </div>
        </div>
</template>

<script>
import firebase, { auth } from 'firebase'
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: 'SingleChat',
    data() {
        return {
            users:{}
        };
    },
     methods:{
        changePeer(id){
            store.dispatch("setPeerUser", id);
            console.log(this.$store.state.currentPeerUser);
        },
        logout(){
            firebase.auth().signOut().then(function() {
                this.$router.push('/login')
            }, function(error) {
                console.log(error)
            });
        },

    },
  
    beforeCreate(){
        let resultUsers = db
                .collection('users')
                .get()
                .then((querySnapshot)=>{
                let allUsers = [];
                querySnapshot.forEach(doc=>{
                    allUsers.push(doc.data()) 
                })

                this.users = allUsers;
                })

    },

};
</script>
