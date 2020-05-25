<template>
  <div>
    <flash-message transitionIn="animated swing" class="alert-box"></flash-message>
    <div class="d-flex align-items-center login-box">
      <div class="m-auto">
        <h2>{{this.text}}</h2>
        <br />
        <div class="md-form mb-5 text-left">
          <i class="fas fa-user prefix grey-text"></i>
          <label for="nickname">Email</label>
          <input type="email" ref="email" id="email" class="form-control" v-model="email" required />
        </div>
        <button @click="resetPassword()" id="reset" class="btn-lg">Resetuj</button>
        <br />
        <br />
        <router-link to="/logowanie">
          <button id="login" class="btn-sm btn-info">Zaloguj się!</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import store from "../store";
import alert from "../mixins/alert";
import reset from "../mixins/reset";

export default {
  name: "Login",
  mixins: [alert, reset],
  data() {
    return {
      text: "Resetowanie hasła",
      email: null
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next("/");
        } else {
          next();
        }
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box {
  height: 100vh;
}
</style>
