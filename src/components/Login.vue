<template>
  <div>
    <div class="d-flex align-items-center login-box">
      <div class="m-auto">
        <h2>Zaloguj się za pomocą Google i korzystaj!</h2>
        <img src="../assets/googlelogo.png" alt class="mt-2 mb-2" />
        <br />
        <button @click="login" class="btn-lg">Logowanie</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import store from "../store";

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
              .where("userId", "==", user.uid)
              .get();

              console.log('1');
              if (result.docs.length === 0) {
                db.collection("users")
                  .doc(user.uid)
                  .set({
                    userId: user.uid,
                    nickname: user.displayName,
                    avatar: user.photoURL,
                    status: "online"
                  })
                  .then(() =>{
              console.log('2');
                    let loginData = {
                      userId: user.uid,
                      nickname: user.displayName,
                      avatar: user.photoURL,
                    };
                    console.log(loginData);
              console.log('3');
                    store.dispatch("setSession", loginData);
                    this.$router.push("/")
                  });
              } else {
                store.dispatch("setSession",  result.docs[0].data());
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
    checkUser() {
      var result = db
        .collection("users")
        .where("id", "==", user.uid)
        .get();
      if (result) {
        console.log("logged");
      } else {
        console.log("no logged");
        newUser(user);
      }
    },
    newUser(user) {
      db.collection("users").add({
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
.login-box {
  height: 100vh;
}
</style>
