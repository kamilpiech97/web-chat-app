import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
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
import VueOnlineProp from "vue-online-prop"


import firebase from "firebase";
require("firebase/firestore");

library.add(faPaperPlane);
library.add(faCog);
library.add(faImage);
library.add(faSignOutAlt);
library.add(faTimes);
library.add(faBars);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const config = {
  apiKey: "AIzaSyCVKbiumZ91iu_m72jb58-iaiSmtaWfHSA",
  authDomain: "vue-test-31727.firebaseapp.com",
  databaseURL: "https://vue-test-31727.firebaseio.com",
  projectId: "vue-test-31727",
  storageBucket: "vue-test-31727.appspot.com",
  messagingSenderId: "344612897431"
};


firebase.initializeApp(config);

var db = firebase.firestore();
window.db = db;



Vue.config.productionTip = false;
Vue.use(VueOnlineProp)
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
