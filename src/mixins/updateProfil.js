export default {
    methods: {
        updateUser() {
            if (this.validateProfilData()) {
                this.saveUser();
            }
        },
        saveUser() {
            let user = {
                nickname: this.nickname,
                avatar: this.photo
            };

            db.collection("users")
                .doc(this.$store.state.user.userId)
                .update(user)
                .then(() => {
                    this.$store.dispatch("updateUser", user);
                    this.closeAfterUpdate();
                });
        },
        validateProfilData() {
            if (this.nickname) {
                return true;
            } else {
                this.alert('Nazwa użytkownika nie może być pusta!', 'error');
                return false;
            }
        },
    }
}