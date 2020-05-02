import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    currentPeerUser: null,
    currentPeerUserNickname: null,
    chatId: null,
    notification: null,
    loading: false,
    typeOfRoom: null,
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
    removePeerUser(state, data) {
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
    storeNotification(state, data) {
      state.notification = data
    },
    storeTypeOfRoom(state, data) {
      state.typeOfRoom = data
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
    removePeerUser({
      commit
    }, data) {
      commit('removePeerUser', data)
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
    setNotification({
      commit
    }, data) {
      commit('storeNotification', data)
    },
    setTypeOfRoom({
      commit
    }, data) {
      commit('storeTypeOfRoom', data)
    },
    setLoading({
      commit
    }, data) {
      commit('changeLoadingStatus', data)
    },
  }
})