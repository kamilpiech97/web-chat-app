
<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-body">
        <header class="modal-header">
          <slot name="header">
            <h3 class="text-dark">Edycja konta</h3>
            <button type="button" class="btn-close" @click="close">x</button>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <div class="md-form mb-5 text-left">
              <i class="fas fa-user prefix grey-text"></i>
              <label class="mt-3" for="form34">Avatar</label>
              <br />
              <img :src="this.photo" class="img-circle w-25" alt="Cinque Terre" />
              <br />
              <input type="file" class="mt-2" @change="savePhoto($event, 'avatar');" />
            </div>
            <div class="md-form mb-5 text-left">
              <i class="fas fa-user prefix grey-text"></i>
              <label for="form34">Nazwa użytkownika</label>
              <input type="text" id="form34" class="form-control" v-model="nickname" />
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-danger" @click="close">Zamknij</button>
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
import alert from "@/mixins/alert";

export default {
  name: "modal",
  mixins: [storePhoto, updateProfil, alert],
  data() {
    return {
      nickname: "",
      file: "",
      photo: ""
    };
  },
  methods: {
    close() {
      this.$destroy;
      this.$emit("close");
    },
  },
  created() {
    this.nickname = this.$store.state.user.nickname;
    this.photo = this.$store.state.user.avatar;
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
    overflow: auto!important;
}
</style>