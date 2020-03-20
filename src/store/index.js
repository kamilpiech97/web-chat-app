import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: ""
  },
  mutations: {
    setName(name) {
      state.name = name;
    }
  },
  actions: {
    name: state => state.name
  },
  modules: {}
});
