<template>
  <div>
    <h1>Chat</h1>
    <div class="msgBox">
      <div :key="item.key" v-for="item in messages" :class="[item.username===authUser.displayName?'message outMessage':'message inMessage']">
        <p>
          <span>{{item.username}}</span><br>
          {{item.message}}
        </p>
      </div>
    </div>
    <input @keyup.enter="saveMessage" v-model="message" placeholder="Type message" />
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Chat',

  data() {
    return {
      typing: [],
      messages: [],
      message:null,
      authUser:{},
    };
  },
  mounted() {
    
    const dbRef = firebase.database().ref('chat');
      dbRef.on('value', message => {
        this.messages = message.val();
        setTimeout(()=>{
          this.scrollToBottom();
        }, 100);
      })
  },
  
  methods:{

    scrollToBottom(){
      let box = document.querySelector('.msgBox');
      box.scrollTop=box.scrollHeight;
    },

    saveMessage(){
      const dbRef = firebase.database().ref('chat');
      dbRef.push({
        message:this.message,
        username:this.authUser.displayName
        //date: new Date()
      }).then(()=>{
        this.scrollToBottom();
      })
      
      this.message=null;
    },

    fetchMessages(){
      const dbRef = firebase.database().ref('chat');
      dbRef.on('value', message => {
        this.messages = message.val();
      });
      setTimeout(()=>{
          this.scrollToBottom();
        }, 1000);
    },

  },

  created(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.authUser=user;
      }else{
        this.authUser={}
      }
    })

    this.fetchMessages();
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
  scroll-behavior: smooth;
}
.message{
  text-align:left;
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin-top:15px;
  padding: 5px 10px 5px 12px;
  width: 51%;
}

.outMessage{
  float:right;
  background: #55ACEF!important;
  color:white;
}

.inMessage{
  float:left;
}
input{
  margin-top:20px;
  width:100%;
  height:100px;
  border:1px solid black;
  border-radius:none;
}
span{
  font-weight: 600;
}
.msgBox {
  height: 516px;
  overflow-y: auto;
}
</style>
