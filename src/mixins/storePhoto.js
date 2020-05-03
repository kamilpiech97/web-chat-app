import firebase from "firebase";
export default {
    methods: {
        savePhoto(e, type) {
            this.file = e.target.files[0];
            if (this.file.size > 1024 * 1024) {
                this.alert('Zdjęcie za duże! - mniejsze niż 1MB', 'error');
            } else {
                this.storePhoto(e, type);
            }
            this.file = null;
        },
        storePhoto(e, type) {
            var uploadTask = firebase.storage().ref(this.file.name).put(this.file);
            uploadTask.on("state_changed", null,
                err => {
                    this.alert('Błąd przesyłania!', 'error');
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        if (type == 'avatar') {
                            this.photo = downloadURL;
                        } else {
                            this.message = downloadURL;
                            this.saveMessage(1);
                        }
                    })
                })
        },


    }
}