import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    currentPeerUser: null,
    currentPeerUserNickname: null,
    chatId: null,
    loading: false,
  },
  getters: {
    getUser: state => state.user,
    getPeerUser: state => state.currentPeerUser,
    getPeerUserNickanme: state => state.currentPeerUserNickname,
    getChatId: state => state.chatId,
    getLoading: state => state.loading,
  },
  mutations: {
    storeUser(state, data) {
      state.user = data
    },
    storePeerUser(state, data) {
      state.currentPeerUser = data
    },
    storePeerUserNickname(state, data) {
      state.currentPeerUserNickname = data
    },
    storeChatId(state, data) {
      state.chatId = data
    },
    storeGroup(state, data) {
      state.chatId = data
    },
    changeLoadingStatus(state, data) {
      state.loading = data
    }
  },
  actions: {
    setSession({
      commit
    }, data) {
      commit('storeUser', data)
    },
    setPeerUser({
      commit
    }, data) {
      commit('storePeerUser', data)
    },
    setPeerUserNickname({
      commit
    }, data) {
      commit('storePeerUserNickname', data)
    },
    setChatId({
      commit
    }, data) {
      commit('storeChatId', data)
    },
    setGroup({
      commit
    }, data) {
      commit('storeGroup', data)
    },
    setLoading({
      commit
    }, data) {
      commit('changeLoadingStatus', data)
    },
  }
})