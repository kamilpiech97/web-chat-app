export default {
    methods:{
        notifyMe(user) {
            if (!("Notification" in window) || this.checkPeerUser(user.fromUserId)) {
                console.log("Alert");
            } else {
                console.log("Message info");
            var notification = new Notification("Nowa wiadomość od "+user.fromUserName);
            }
        },
        checkPeerUser(id){
            if(id == this.$store.state.currentPeerUser){
                return true;
            }else{
                return false;
            }
        }
    }
}