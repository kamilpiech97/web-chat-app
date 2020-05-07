import md5 from 'js-md5';
import firebase, { Timestamp  } from "firebase";

export default {
  methods: {
    validateMessageData() {
      if (this.message) {
        return true;
      } else {
        this.alert('Wiadomość nie może być pusta!', 'error');
        return false;
      }
    },
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
          timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
        .then(() => {
          this.message = null;
          this.sendNotification(this.typeOfRoom);
        });
      setTimeout(() => {
        this.scrollToBottom();
      }, 70);
    },
    saveMessage(type) {
      if (this.validateMessageData()) {
        this.storeMessage(type);
      }
    },
    randomUniqId() {
      let uniqId = md5((Math.random().toString(36).substring(2, 8)) + this.userId + firebase.firestore.FieldValue.serverTimestamp());
      return uniqId;
    },
  }
}