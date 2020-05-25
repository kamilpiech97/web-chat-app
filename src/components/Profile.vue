
<template>
  <div class="modal-backdrop">
    <flash-message transitionIn="animated swing" class="alert-box"></flash-message>
    <div class="modal">
      <div class="modal-body">
        <header class="modal-header">
          <slot name="header">
            <h3 class="text-dark">Edycja konta</h3>
            <router-link to="/">
              <button type="button" class="btn-close">x</button>
            </router-link>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <div class="md-form mb-5 text-left">
              <i class="fas fa-user prefix grey-text"></i>
              <label class="mt-3" for="avatar">Avatar</label>
              <br />
              <img :src="this.photo" id="avatar" class="img-circle w-25" alt="Cinque Terre" />
              <br />
              <input type="file" class="mt-2" @change="savePhoto($event, 'avatar');" />
            </div>
            <div class="md-form mb-5 text-left">
              <i class="fas fa-user prefix grey-text"></i>
              <label for="nickname">Nazwa użytkownika</label>
              <input
                type="text"
                ref="nickname"
                id="nickname"
                class="form-control"
                v-model="nickname"
              />
            </div>
            <div class="md-form mb-5 text-left">
              <i class="fas fa-user prefix grey-text"></i>
              <label for="nickname">Resetuj hasło</label>
              <br />
              <button type="button" class="btn-primary" @click="resetPassword()">Resetuj</button>
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <router-link to="/">
              <button type="button" class="btn-danger">Zamknij</button>
            </router-link>
            <button type="button" class="btn-green" @click="updateUser">Zapisz</button>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { auth } from "firebase";
import { mapGetters } from "vuex";
import store from "../store";
import storePhoto from "@/mixins/storePhoto";
import updateProfil from "@/mixins/updateProfil";
import alert from "../mixins/alert";
import reset from "../mixins/reset";

export default {
  name: "Profile",
  mixins: [storePhoto, updateProfil, alert, reset],
  data() {
    return {
      nickname: "",
      file: "",
      photo: "",
      email: this.$store.state.user.email
    };
  },
  methods: {
    closeAfterUpdate() {
      this.$router.push("/");
    }
  },
  created() {
    this.nickname = this.$store.state.user.nickname;
    this.photo = this.$store.state.user.avatar;
    this.email = this.$store.state.user.email;
  }
};
</script>


<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  opacity: 1 !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: block !important;
  flex-direction: column;
}

.modal-body {
  max-width: 800px;
  margin: auto;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal {
  overflow: auto !important;
}
</style>