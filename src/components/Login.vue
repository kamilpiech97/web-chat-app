<template>
  <div>
    <div class="d-flex align-items-center login-box">
      <div class="m-auto">
        <h2>Zaloguj się za pomocą Google i korzystaj!</h2>
        <img src="../assets/googlelogo.png" alt="" class="mt-2 mb-2"><br>
        <button @click="login" class="btn-lg">Logowanie</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(async result => {
          let user = result.user;
          if (user) {
            const result = await db
              .collection("users")
              .where("id", "==", user.uid)
              .get();

            if (result.docs.length === 0) {
              // Set new data since this is a new user
              db.collection("users")
                .doc(user.uid)
                .set({
                  id: user.uid,
                  nickname: user.displayName,
                  photoUrl: user.photoURL,
                  status: "online"
                })
                .then(
                  this.$router.push("/")
                  );
            } else {
              db.collection("users")
                .doc(user.uid)
                .update({
                  status: "online"
                })
              this.$router.push("/");
            }
          } else {
            console.log("error");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkUser(){
      var result = db.collection('users')
        .where('id', '==' ,user.uid)
        .get()
          if(result){
            console.log('logged');
          }else{
            console.log('no logged');
            newUser(user);
          }
    },
    newUser(user){
      db.collection('users')
        .add({
          id: user.uid,
          name: user.displayName,
          avatar: user.photoURL
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box{
  height: 100vh;
}
</style>
