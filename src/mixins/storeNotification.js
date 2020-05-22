export default {
    methods: {
        storeNotification() {
            db.collection("notifications")
                .doc(this.$store.state.currentPeerUser)
                .set({
                    fromUserName: this.$store.state.user.nickname,
                    fromUserId: this.$store.state.user.userId,
                    toUserId: this.$store.state.currentPeerUser,
                    createdAt: this.getNow()
                })
        },
        sendNotification(type) {
            if (type == 'privaterooms') {
                this.storeNotification();
            }
        },
    }
}