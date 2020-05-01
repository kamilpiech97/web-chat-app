import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
    },
    getters: {
        getUser: state => state.user,
    },
    mutations: {
        storeUser(state, data) {
            state.user = data
        },
    },
    actions: {
        setSession({
            commit
        }, data) {
            commit('storeUser', data)
        },
    }
})