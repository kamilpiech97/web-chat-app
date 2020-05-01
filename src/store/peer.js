import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentPeerUser: null,
        currentPeerUserNickname: null,
    },
    getters: {
        getPeerUser: state => state.currentPeerUser,
        getPeerUserNickanme: state => state.currentPeerUserNickname,
    },
    mutations: {
        storePeerUser(state, data) {
            state.currentPeerUser = data
        },
        storePeerUserNickname(state, data) {
            state.currentPeerUserNickname = data
        },
    },
    actions: {
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
    }
})