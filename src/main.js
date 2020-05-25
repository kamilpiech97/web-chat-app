import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import VueOnlineProp from "vue-online-prop";
import VueFlashMessage from 'vue-flash-message';
import firebase from "firebase";
import { sync } from 'vuex-router-sync'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

require("firebase/firestore");
require('vue-flash-message/dist/vue-flash-message.min.css');

library.add(faPaperPlane);
library.add(faCog);
library.add(faImage);
library.add(faSignOutAlt);
library.add(faTimes);
library.add(faBars);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueFlashMessage);

const config = {
  apiKey: '###',
  authDomain: '###',
  databaseURL: '###',
  projectId: '###',
  storageBucket: '###',
  messagingSenderId: '###',
  appId: '###'
};


firebase.initializeApp(config);

var db = firebase.firestore();
window.db = db;

var database = firebase.database();
window.database = database;

sync(store, router);

Vue.config.productionTip = false;
Vue.use(VueOnlineProp)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
