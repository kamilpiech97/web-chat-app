import firebase from "firebase";
export default {
    methods: {
        storePhoto(e, type) {
            this.file = e.target.files[0];
            console.log(this.file);
            var uploadTask = firebase.storage().ref(this.file.name).put(this.file);
            uploadTask.on("state_changed", null,
                err => {
                    console.log('fail')
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
            this.file = null;
        }
    }
}