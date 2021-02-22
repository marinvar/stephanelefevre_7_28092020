import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: null,
    userToken: null
  },
  mutations: {
    SET_ID(state, input) {
      state.userId = input;
    },
    SET_TOKEN(state, input) {
      state.userToken = input;
    }
  },
  actions: {
    setUserId ({ commit }, value) {
      commit('SET_ID', value);
    },
    setToken ({ commit }, value) {
      commit('SET_TOKEN', value);
    }
    /* signupSubmit ( *//* context *//* { commit }, e) { // commit comes from context
      e.preventDefault();
    */
  },
  modules: {
  }
})
