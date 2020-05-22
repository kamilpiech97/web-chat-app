<template>
  <div>
    <flash-message transitionIn="animated swing" class="alert-box"></flash-message>
    <div class="d-flex align-items-center login-box">
      <div class="m-auto">
        <h2>{{this.text}}</h2>
        <p class="text-danger">{{this.info}}</p>
        <br />
            <div class="md-form mb-5 text-left">
              <i class="fas fa-user prefix grey-text"></i>
              <label for="nickname">Nick</label>
              <input type="text"  ref="nickname" id="nickname" class="form-control" v-model="nickname" required/>
            </div>
            <div class="md-form mb-5 text-left">
              <i class="fas fa-user prefix grey-text"></i>
              <label for="nickname">Email</label>
              <input type="email"  ref="email" id="email" class="form-control" v-model="email" required/>
            </div>
            <div class="md-form mb-5 text-left">
              <i class="fas fa-user prefix grey-text"></i>
              <label for="nickname">Hasło</label>
              <input type="password"  ref="password" id="password" class="form-control" v-model="password" required/>
            </div>
        <button @click="register" id="register" class="btn-lg">Zarejestruj</button><br><br>
        <router-link to="/logowanie"><button id="login" class="btn-sm btn-info">Zaloguj się!</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import store from "../store";
import alert from "../mixins/alert";

export default {
  name: "Register",
  mixins: [alert],
  data() {
    return {
      text: "Rejestracja",
      info:'',
      password:null,
      nickname:null,
      email:null,
      avatar:"https://firebasestorage.googleapis.com/v0/b/chatapp-da38a.appspot.com/o/person.png?alt=media&token=d2ba3ade-58e7-46d6-b81f-5000c01f215a",
    };
  },
  methods: {
    register() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(async result => {
                firebase.firestore().collection('users')
                .doc(result.user.uid)
                .set({
                    nickname:this.nickname,
                    userId:result.user.uid,
                    email:this.email,
                    avatar:this.avatar,
                }).then((docRef)=>{
                  let loginData = {
                    userId: result.user.uid,
                    nickname: this.nickname,
                    avatar: this.avatar
                  };
                  store.dispatch("setSession", loginData);
                  this.$router.push({ path:'/' });
                    
                }).catch(() => {
                  this.alert('Rejestracja nie prawidłowa!', 'error');
                })
            }).catch(() => {
                  this.alert('Rejestracja nie prawidłowa!', 'error');
            })
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box {
  height: 100vh;
}
</style>
