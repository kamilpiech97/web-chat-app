export default {
    methods: {
        deleteMessage(id) {
            db.collection(this.typeOfRoom)
                .doc(this.$store.state.chatId)
                .collection(this.$store.state.chatId)
                .where("messageId", "==", id)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        db.collection(this.typeOfRoom)
                            .doc(this.$store.state.chatId)
                            .collection(this.$store.state.chatId)
                            .doc(doc.id)
                            .update({
                                status: 2,
                                message: "Wiadomość usunięta"

                            });

                    });
                });
        }
    }
}