export default {
    methods: {
        storeMessage(type) {
              db.collection(this.typeOfRoom)
                .doc(this.chatId)
                .collection(this.chatId)
                .doc(this.getNow())
                .set({
                  messageId: this.randomUniqId(),
                  message: this.message,
                  userId: this.$store.state.user.userId,
                  toUserId: this.$store.state.currentPeerUser,
                  nickname: this.$store.state.user.nickname,
                  status: type,
                  Timestamp: this.getNow()
                })
                .then(() => {
                  this.message = null;
                  this.sendNotification(this.typeOfRoom);
                });
              setTimeout(() => {
                this.scrollToBottom();
              }, 70);
        },
        saveMessage(type){
            if(this.validateMessageData()){
                this.storeMessage(type);
            }
        },
        validateMessageData(){
            if(this.message){
                return true;
            }else{
                this.alert('Wiadomość nie może być pusta!', 'error');
                return false;
            }
        }
    }
}