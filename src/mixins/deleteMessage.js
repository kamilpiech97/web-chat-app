export default {
    methods: {
        deleteMessage(id) {
            db.collection("msg")
                .doc(this.$store.state.chatId)
                .collection(this.$store.state.chatId)
                .doc(id)
                .update({
                    type: "1",
                    message: "Wiadomość usunięta",
                    deleted: "1"

                })
        }
    }
}