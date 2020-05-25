export default {
    methods:{
        notify(user) {
            if (!("Notification" in window) || this.checkPeerUser(user.fromUserId)) {
                
            } else {
                new Notification("Nowa wiadomość od "+ user.fromUserName);
                
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