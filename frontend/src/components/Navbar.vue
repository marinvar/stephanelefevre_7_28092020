<template>
  <header>
    <router-link to="/" id="brand">
      <img alt="Logo Groupomania" src="@/assets/icon-left-font-monochrome-white.svg" />
    </router-link>
    <nav class="navbar navbar-expand-sm pt-0">
      <div class="container-fluid justify-content-center">
        <button class="navbar-toggler custom-toggler" type="button" aria-label="Basculer l'affichage du menu" aria-pressed="false" data-bs-toggle="collapse" data-bs-target="#navbar-links">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-links">
          <ul class="navbar-nav mx-auto mb-2 mb-sm-0">
            <li class="nav-link py-1 py-sm-0 px-1"><router-link to="/">Accueil</router-link></li>
            <li class="nav-link  m-0 py-0 px-1"><router-link to="/login" v-if="!this.loggedIn">Connexion</router-link></li>
            <li class="nav-link m-0 py-0 px-1"><router-link to="/logout" v-if="this.loggedIn">Déconnexion</router-link></li>
            <li class="nav-link m-0 py-0 px-1"><router-link to="/signup" v-if="!this.loggedIn">Inscription</router-link></li>
            <li class="nav-link m-0 py-0 px-1"><router-link to="/signout" v-if="this.loggedIn">Désinscription</router-link></li>
            <li class="nav-link py-1 py-sm-0 px-1"><router-link to="/about">À propos</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
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
header {
  background-color: #091F43;
  #brand {
    border: none;
    padding: 30px;
    background-color: #091F43;
  }
  img {
    width: 70%;
    padding: 1rem;
    max-height: 5rem;
  }
  #navbar-links {
    a {
      display: block;
      font-weight: bold;
      color: white;
      text-decoration: none;
      margin: 1rem 0.3rem;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      border-top: 0.5rem solid #091F43;
      &:hover {
        color: #D4D4D4;
        border-bottom: 0.2rem solid #D1515A;
        padding-bottom: 0.3rem;
      }
      &.router-link-exact-active {
        background-color: white;
        color: #091F43;
        border-bottom: 0.5rem solid white;
        border-top: 0.5rem solid white;
        &:hover {
          border-bottom: 0.2rem solid #D1515A;
        }
      }
    }
  }
}

.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
.custom-toggler.navbar-toggler {
  border-color: rgb(255,255,255);
}

@media (max-width: 575px) {
  header {
    #navbar-links a {
      margin: 0;
      margin-bottom: 0.3rem;
      border-bottom: 0.2rem solid #091F43;
      &:hover {
        margin-bottom: 0;
      border-bottom: 0.2rem solid #D1515A;
      }
      &.router-link-exact-active {
        &:hover {
          margin-bottom: 0.2rem;
          padding-bottom: 0.4rem;
        }
      }
    }
  }
}
</style>