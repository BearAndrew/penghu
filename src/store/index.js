import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    login({ commit }, user) {
      // 處理登入邏輯
      commit('SET_USER', user)
    },
    logout({ commit }) {
      // 處理登出邏輯
      commit('SET_USER', null)
    }
  },
  getters: {
    isAuthenticated: state => !!state.user
  }
})
