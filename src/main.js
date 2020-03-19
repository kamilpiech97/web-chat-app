// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* Import the firebase SDK and extend with firestore */
import firebase from 'firebase';
// Required for side-effects
require("firebase/firestore");

library.add(faPaperPlane)
library.add(faImage)
library.add(faSignOutAlt)
library.add(faTimes)
library.add(faBars)
Vue.component('font-awesome-icon', FontAwesomeIcon)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

 const config = {
   apiKey: "AIzaSyCVKbiumZ91iu_m72jb58-iaiSmtaWfHSA",
   authDomain: "vue-test-31727.firebaseapp.com",
   databaseURL: "https://vue-test-31727.firebaseio.com",
   projectId: "vue-test-31727",
   storageBucket: "vue-test-31727.appspot.com",
   messagingSenderId: "344612897431"
 };

// var config = {
//   apiKey: "AIzaSyACGHrm_hgrmrfCzuwRKBHqqmBfOjhHzYY",
//     authDomain: "mobileapp-fe4f9.firebaseapp.com",
//     databaseURL: "https://mobileapp-fe4f9.firebaseio.com",
//     projectId: "mobileapp-fe4f9",
//     storageBucket: "mobileapp-fe4f9.appspot.com",
//     messagingSenderId: "844278498915",
//     appId: "1:844278498915:web:29aee4a030208a19391a56",
//     measurementId: "G-3Z3XRF1ZQP"
// };

/* Initialize firebase with your configuration */
firebase.initializeApp(config);

/* Bind firebase to your Vue instance */
var db = firebase.firestore();
window.db = db;


Vue.config.productionTip = false;

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
}).$mount('#app')
