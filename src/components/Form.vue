<template>
    <div>
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
</template>
<script>
import firebase, { auth } from 'firebase'

export default {
  name: 'Form',
  props: ['currentPeerUser','currentAuthUser'],
  data() {
    return {
      typing: [],
      messages: [],
      message:null,
      groupChatId:{},
      listener:null,
      peerUser:this.currentPeerUser,
      authUser:this.currentAuthUser
    };
  },
  created(){
      console.log(this.authUser.uid);
      this.getGroupChatId;
  },
  methods:{
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
        this.listener = this.fetchMessages()
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
        console.log(this.groupChatId);
        db
        .collection('msg')
        .doc(this.groupChatId)
        .collection(this.groupChatId)
        .orderBy('createdAt')
        .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        this.messages.push(change.doc.data())
                    }
                })
        setTimeout(()=>{ this.scrollToBottom(); }, 10);
        })
            
    },

  }

};
</script>