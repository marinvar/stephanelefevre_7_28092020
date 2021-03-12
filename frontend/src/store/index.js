import { createStore } from 'vuex';
import router from '../router'
  
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
      if (!loggedIn) {
        localStorage.removeItem('pseudo');
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
      }
    },
    IDENTIFY_401(state, error) {
      if (error.response.data.error.name === "TokenExpiredError" || error.response.data.error.name === "Utilisateur non trouvé !") {
        localStorage.removeItem('pseudo');
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
        state.loggedIn = false;
        router.push('/login');
      }
    },
    SET_CURRENT_DISCUSSION(state, discussion) {
      state.currentDiscussion = discussion;
    },
    ADD_DISCUSSION(state, discussion) {
      state.discussions.push(discussion);
    },
    UPDATE_DISCUSSIONS_FILTER(state, filter) {
      state.discussionsFilter = filter.split(' ');
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
    identify401 ({ commit }, value) {
      commit('IDENTIFY_401', value);
    },
    setCurrentDiscussion ({ commit }, value) {
      commit('SET_CURRENT_DISCUSSION', value);
    },
    addDiscussion ({ commit }, value) {
      commit('ADD_DISCUSSION', value);
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
