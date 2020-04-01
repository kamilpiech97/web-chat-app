<template>
        <!-- Chat Box-->
        <div class="col-lg-9 px-0 chat-div">
          <div class="px-4 py-5 chat-box bg-white">
            <!-- Sender Message-->
            <div :key="item.key" v-for="item in messages" class="media w-50 mb-3 active" :class="[item.idFrom===$store.state.user.uid?'ml-auto':'']">
               <div class="media-body ml-3">
                <div class="rounded py-2 px-3 mb-2" :class="[item.idFrom===$store.state.user.uid?'bg-primary':'bg-light']">
                  <p class="text-small mb-0" :class="[item.idFrom===$store.state.user.uid?'text-white':'text-muted']">{{item.message}}</p>
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
</template>

<script>
import { mapGetters } from "vuex";
import store from "../store";
import firebase, { auth } from 'firebase';

export default {
  name: 'SingleChat',

  data() {
    return {
      message:'',
      messages:{},
      chatId:{}
    };
  },

  methods:{
    
    componentWillUnmount() {
      if (this.listener) {
        this.listener();
      }
    },

    fetchMessages(){
      this.listener = db
            .collection('msg')
            .doc(this.chatId)
            .collection(this.chatId)
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
          .doc(this.chatId)
          .collection(this.chatId)
          .doc(this.getNow())
          .set({
            message:this.message,
            idFrom: this.$store.state.user.uid,
            idTo: this.$store.state.currentPeerUser,
            createdAt: new Date()
        }).then(() => {
            this.message=null;
        })
        setTimeout(()=>{ this.scrollToBottom(); }, 70);
           
    },
    
  },
  created(){
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'storeChatId') {
                console.log(`Updating to ${state.chatId}`);

                this.componentWillUnmount();
                this.chatId = this.$store.state.chatId;
                this.fetchMessages();
            }
        });
  }

};
</script>
