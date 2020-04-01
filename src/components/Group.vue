<template>
  <div>
    <div class="button-div">
       <a v-on:click="openMenu();"><font-awesome-icon icon="bars" style="font-size:30px;" /></a>
    </div>
    <div class="container-fluid">
      <div class="row rounded-lg overflow-hidden shadow">
        <!-- Users box-->
        <div class="col-3 px-0 messages-div" id="messages-div">
          <div class="bg-white">

            <div class="bg-gray px-4 py-2 bg-light d-flex">
              <a v-on:click="logout();" class="mr-3"><font-awesome-icon icon="sign-out-alt" style="font-size:30px;" /></a>
              <p class="h5 mb-0 py-1">Recent {{ authUser.displayName}}</p>
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
                <div :key="user.id" v-for="user in users" class="list-group-item list-group-item-action list-group-item-light rounded-0" :class="[user.id===authUser.uid?'d-none':'']">
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
        <!-- Chat Box-->
        <div class="col-lg-9 px-0 chat-div">
          <div class="px-4 py-5 chat-box bg-white">
            <!-- Sender Message-->
            <div :key="item.key" v-for="item in messages" class="media w-50 mb-3 active" :class="[item.idFrom===authUser.uid?'ml-auto':'']">
               <div class="media-body ml-3">
                <div class="rounded py-2 px-3 mb-2" :class="[item.idFrom===authUser.uid?'bg-primary':'bg-light']">
                  <p class="text-small mb-0" :class="[item.idFrom===authUser.uid?'text-white':'text-muted']">{{item.message}}</p>
                </div>
                <p class="small text-muted">{{item.nickname}}</p>
              </div>
            </div>
          </div>
          <!-- Typing area -->
            <div class="input-group">
              <input type="text" v-model="message" @keyup.enter="saveMessage"  placeholder="Type a message" aria-describedby="button-addon2" class="form-control rounded-0 border-0 py-4 bg-light">
              <div class="input-group-append">
                <button id="button-addon3" class="btn btn-link"> <font-awesome-icon icon="image" /></button>
                <button id="button-addon2" type="submit" class="btn btn-link"> <font-awesome-icon icon="paper-plane" v-on:click="saveMessage()" /></button>
              </div>
            </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { auth } from 'firebase'

export default {
  name: 'Chat',

  data() {
    return {
      typing: [],
      messages: [],
      users: [],
      message:null,
      authUser:{},
      peerUser:this.$route.params.id,
      groupChatId:{},
      listener:null
    };
  },
  watch: {
  '$route' () {
        this.listener = null;
        console.log('destroy');
        this.groupChatId=null;
        this.peerUser = this.$route.params.id,
        this.getGroupChatId();
    }
  },
  created(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
          console.log('works');
          this.authUser=user;
      }else{
        this.authUser={}
      }
    })

    //this.fetchMessages();
  },
  mounted() {
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
  
  methods:{
      componentWillUnmount() {
        if (this.listener) {
            this.listener()
        }
    },
      changePeer(id){
          this.componentWillUnmount();
          this.peerUser=id;
          this.getGroupChatId();
      },
      getGroupChatId(){
        if (this.listener) {
            this.listener = null;
        }
        this.messages=[];
        if ( this.hashString(this.authUser.uid) <= this.hashString(this.peerUser)) {
            this.groupChatId = `${this.authUser.uid}-${this.peerUser}`
        } else {
            this.groupChatId = `${this.peerUser}-${this.authUser.uid}`
        }
        console.log(this.groupChatId);
        this.fetchMessages()
      },
      setPeerUser(id){
          this.peerUser = id;
      },
   hashString(str){
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)
            hash = hash & hash // Convert to 32bit integer
        }
        return hash
    },
      openMenu(){
        document.getElementById('messages-div').classList.add("active");
        console.log('open');
      },
       closeMenu(){
        document.getElementById('messages-div').classList.remove("active");
        console.log('close');
      },
    logout(){
      firebase.auth().signOut().then(function() {
        this.$router.push('/login')
      }, function(error) {
        console.log(error)
      });
    },
    scrollToBottom(){
      let box = document.querySelector('.chat-box');
      box.scrollTop=box.scrollHeight;
    },
    getNow: function() {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    const dateTime = date +' '+ time;
                    this.timestamp = dateTime;
                    return dateTime;
                },

    saveMessage(){
        db
          .collection('msg')
          .doc(this.groupChatId)
          .collection(this.groupChatId)
          .doc(this.getNow())
          .set({
            message:this.message,
            idFrom: this.authUser.uid,
            idTo: this.peerUser,
            createdAt: new Date()
        }).then(() => {
            this.message=null;
        })
            setTimeout(()=>{ this.scrollToBottom(); }, 70);
           
    },

    fetchMessages(){
       this.listener = db
        .collection('msg')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .orderBy('createdAt')
        .onSnapshot((querySnapshot)=>{
          let allMessages=[];
          querySnapshot.forEach(doc=>{
            allMessages.push(doc.data())
          })
          this.messages=allMessages;
          setTimeout(()=>{ this.scrollToBottom(); }, 10);
        })
            
    },

  },

  beforeRouteEnter(to,from,next){
    next(vm=>{
      firebase.auth().onAuthStateChanged(user=>{
        if(user){
          next();
        }else{
          next('/login');
        }
      })
    })
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 html{
      overflow-y: hidden;
    }
  body {
    background-color: #74EBD5;
    background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);
    font-family: 'Montserrat', sans-serif!important;
    min-height: 100vh;
  }

  .mobile-close{
    display: none;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    width: 5px;
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    width: 1em;
    background-color: #ddd;
    outline: 1px solid slategrey;
    border-radius: 1rem;
  }

  .text-small {
    font-size: 0.9rem;
  }

  .messages-box,
  .chat-box {
    height: 95vh;
    overflow-y: scroll;
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  input::placeholder {
    font-size: 0.9rem;
    color: #999;
  }
  .button-div{
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    z-index: 1001;
  }
  a{
    cursor: pointer;
  }

  @media (max-width: 991px){
    .mobile-close{
      display: block;
    }
    .messages-div{
      display: none;
      z-index: 1002;
    }
    .messages-div.active{
      max-width: 100%!important;
      width: 100%!important;
      flex: 100%!important;
      display: block;
    }
    .chat-div {
      max-width: 100%!important;
    }
    .button-div{
      display: block;
    }
  }
</style>
