export default {
    methods: {
        deleteMessage(id) {
            db.collection(this.typeOfRoom)
                .doc(this.$store.state.chatId)
                .collection(this.$store.state.chatId)
                .doc(id)
                .update({
                    status: 2,
                    message: "Wiadomość usunięta",

                })
        }
    }
}