import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {
      avatar:null,
      nickname:null,
      status:null,
      userId:null
    },
    currentPeerUser: null,
    currentPeerUserNickname: null,
    chatId: null,
    notification: null,
    typeOfRoom: null,
    alert: null,
  },
  getters: {
    getUser: state => state.user,
    getPeerUser: state => state.currentPeerUser,
    getPeerUserNickanme: state => state.currentPeerUserNickname,
    getChatId: state => state.chatId,
  },
  mutations: {
    storeUser(state, data) {
      state.user = data
    },
    storeUserName(state, data) {
      state.user.nickname = data
    },
    storeUserAvatar(state, data) {
      state.user.avatar = data
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
    logoutUser(state, data) {
      state.notification = data;
    },
    storeTypeOfRoom(state, data) {
      state.typeOfRoom = data
    },
    storeAlert(state, data) {
      state.alert = data
    }
  },
  actions: {
    setSession({
      commit
    }, data) {
      commit('storeUser', data)
    },
    updateUser({
      commit
    }, data) {
      commit('storeUserName', data.nickname)
      commit('storeUserAvatar', data.avatar)
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
    logout({
      commit
    }, data) {
      commit('logoutUser', data)
    },
    setTypeOfRoom({
      commit
    }, data) {
      commit('storeTypeOfRoom', data)
    },
    setAlert({
      commit
    }, data) {
      commit('storeAlert', data)
    },
  }
})