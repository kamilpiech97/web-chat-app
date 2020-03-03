// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/* Import the firebase SDK and extend with firestore */
import firebase from 'firebase';
require('firebase/firestore');

// const config = {
//   apiKey: "AIzaSyCVKbiumZ91iu_m72jb58-iaiSmtaWfHSA",
//   authDomain: "vue-test-31727.firebaseapp.com",
//   databaseURL: "https://vue-test-31727.firebaseio.com",
//   projectId: "vue-test-31727",
//   storageBucket: "vue-test-31727.appspot.com",
//   messagingSenderId: "344612897431",
//   appId: "1:344612897431:web:8a80be28d6209edce29fd2",
//   measurementId: "G-CQWYZTVTVL"
// };

var config = {
  apiKey: "AIzaSyACGHrm_hgrmrfCzuwRKBHqqmBfOjhHzYY",
    authDomain: "mobileapp-fe4f9.firebaseapp.com",
    databaseURL: "https://mobileapp-fe4f9.firebaseio.com",
    projectId: "mobileapp-fe4f9",
    storageBucket: "mobileapp-fe4f9.appspot.com",
    messagingSenderId: "844278498915",
    appId: "1:844278498915:web:29aee4a030208a19391a56",
    measurementId: "G-3Z3XRF1ZQP"
};

/* Initialize firebase with your configuration */
firebase.initializeApp(config);

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;

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
  render: h => h(App)
}).$mount('#app')
