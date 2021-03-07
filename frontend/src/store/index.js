import { createStore } from 'vuex';
import axios from 'axios';
  
export default createStore({
  state: {
    userId: null,
    userToken: null,
    currentDiscussion: null,
    discussionsFilter: [],
    discussions: []
  },
  mutations: {
    SET_ID(state, userId) {
      state.userId = userId;
    },
    SET_TOKEN(state, userToken) {
      state.userToken = userToken;
    },
    SET_CURRENT_DISCUSSION(state, subject) {
      state.currentDiscussion = subject;
    },
    ADD_DISCUSSION(state, discussion) {
      state.discussions.push(discussion);
    },
    UPDATE_DISCUSSIONS(state) {
      axios.get('http://localhost:3000/api/discussion/getDiscussions')
      .then(response => {
        state.discussions = response.data.discussions;
      })
      .catch(
        error => console.error('error when loading discussions :', error)
      );
    },
    UPDATE_DISCUSSIONS_FILTER(state, filter) {
      state.discussionsFilter = filter.split(' ');
      axios.post('http://localhost:3000/api/discussion/getDiscussionsFiltered', { filter: state.discussionsFilter })
      .then(response => {
        state.discussions = response.data.discussions;
      })
      .catch(
        error => console.error('error when loading discussions :', error)
      );
    }
  
  },
  actions: {
    setUserId ({ commit }, value) {
      commit('SET_ID', value);
    },
    setToken ({ commit }, value) {
      commit('SET_TOKEN', value);
    },
    setCurrentDiscussion ({ commit }, value) {
      commit('SET_CURRENT_DISCUSSION', value);
    },
    addDiscussion ({ commit }, value) {
      commit('ADD_DISCUSSION', value);
    },
    updateDiscussions ({ commit }) {
      commit('UPDATE_DISCUSSIONS');
    },
    updateDiscussionsFilter ({ commit }, value) {
      commit('UPDATE_DISCUSSIONS_FILTER', value);
    }
    /* signupSubmit ( *//* context *//* { commit }, e) { // commit comes from context
      e.preventDefault();
    */
  },
  modules: {
  }
})
