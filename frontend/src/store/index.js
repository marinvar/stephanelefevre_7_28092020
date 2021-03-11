import { createStore } from 'vuex';
import axios from 'axios';
  
export default createStore({
  state: {
    currentDiscussion: {
      User: {pseudo: "Administrateur"},
      subject: "Welcome",
      message: "Vous êtes maintenant connecté. Sélectionnez une discussion dans le panneau de gauche pour l'afficher ici.",
      created_at: ": Au tout début..."},
    discussionsFilter: [],
    loggedIn: false,
    addedComment: false,
    addedDiscussion: false
  },
  mutations: {
    SET_LOGGED_IN(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    SET_CURRENT_DISCUSSION(state, discussion) {
      state.currentDiscussion = discussion;
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
      /* axios.get('http://localhost:3000/api/discussion/getDiscussionsFiltered', { filter: state.discussionsFilter })
      .then(response => {
        state.discussions = response.data.discussions;
      })
      .catch(
        error => console.error('error when loading discussions :', error)
      ); */
    },
    UPDATE_ADDED_COMMENT(state, value) {
      state.addedComment = value;
    },
    UPDATE_ADDED_DISCUSSION(state, value) {
      state.addedDiscussion = value;
    }
  
  },
  actions: {
    setLoggedIn ({ commit }, value) {
      commit('SET_LOGGED_IN', value);
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
    },
    updateAddedComment ({ commit }, value) {
      commit('UPDATE_ADDED_COMMENT', value);
    },
    updateAddedDiscussion ({ commit }, value) {
      commit('UPDATE_ADDED_DISCUSSION', value);
    }
  },
  modules: {
  }
})
