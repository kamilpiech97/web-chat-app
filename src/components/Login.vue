<template>
  <div>
    <h1>Login</h1>
    <h3>Sign in with google and use!</h3>
    <button @click="login">Login with google</button>
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
                  photoUrl: user.photoURL
                })
                .then(this.$router.push("/"));
            } else {
              this.$router.push("/");
            }
          } else {
            console.log("error");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    // checkUser(){
    //   var test = db.collection('users')
    //     .where('id', '==' ,user.uid)
    //     .get()
    //       if(test){
    //         console.log('logged');
    //       }else{
    //         console.log('no logged');
    //         newUser(user);
    //       }
    // },
    // newUser(user){
    //   db.collection('users')
    //     .add({
    //       id: user.uid,
    //       name: user.displayName,
    //       avatar: user.photoURL
    //     });
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
