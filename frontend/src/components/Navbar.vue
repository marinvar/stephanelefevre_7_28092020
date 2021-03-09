<template>
  <div id="navbar">
    <router-link to="/">
      <img alt="Logo Groupomania" src="@/assets/icon-left-font-monochrome-white.svg">
    </router-link>
    <div id="nav">
      <router-link to="/">Accueil</router-link>
      <router-link to="/signup" v-if="!this.loggedIn">Inscription</router-link>
      <router-link to="/login" v-if="!this.loggedIn">Connexion</router-link>
      <router-link to="/logout" v-if="this.loggedIn">Déconnexion</router-link>
      <router-link to="/about">À propos</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['loggedIn'])
  },
  methods: {
    ...mapActions(['setLoggedIn'])
  },
  beforeMount() {
    const userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : null;
    const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;
    if (userId !== null && userToken !== null) {
      this.setLoggedIn(true);
    }
  }
  
}
</script>

<style lang="scss">

#navbar {
  background-color: #091F43;
  img {
    width: 50%;
    padding: 1rem;
    max-height: 5rem;
  }
  
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    margin: 1rem;

    &.router-link-exact-active {
      border-bottom: 0.2rem solid #D1515A;
      padding-bottom: 0.3rem;
      border-radius: 0.5rem;
    }
  }
}

</style>