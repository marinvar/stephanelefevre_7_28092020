<template>
  <div>
    <form 
      id="loginForm"
      @submit.prevent="loginSubmit"
      method="post"
    >
      <p>
        <label for="pseudo">Pseudo</label>
        <input
          class="mx-auto"
          type="text"
          id="pseudo"
          v-model="pseudo"
          name="pseudo"
          @input="pseudoInput"
        />
      </p>

      <p>
        <label for="password">Mot de passe</label>
        <input
          class="mx-auto"
          type="password"
          id="password"
          v-model="password"
          name="password"
          @input="passwordInput"
        />
      </p>

      <p>
        <button
          class="mx-auto btn btn-success"
          type="submit"
        >Se connecter</button>
      </p>

    </form>
    <div class="bad-login" v-if="badLogin === true">
      {{ errorMessage }}
    </div>
    <div class="connection-expired" v-if="expiredConnection === true">
      <p>Votre connexion a expiré<br />Veuillez vous reconnecter.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      badLogin: false,
      errorMessage: null,
      pseudo: null,
      password: null
    }
  },
  computed: {
    ...mapState(['loggedIn','expiredConnection'])
  },
  methods: {
    pseudoInput (e) {
      this.pseudo = e.target.value;
    },
    passwordInput (e) {
      this.password = e.target.value;
    },
    loginSubmit () {
      axios.post('http://localhost:3000/api/auth/login', { 
        pseudo: this.pseudo,
        password: this.password
      })
      .then(function (response) {
        sessionStorage.setItem('userId', response.data.userId);
        sessionStorage.setItem('userToken', response.data.token);
        sessionStorage.setItem('pseudo', this.pseudo);
        sessionStorage.setItem('isAdmin', response.data.isAdmin);
        this.updateDiscussionsFilter("");
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        this.setCurrentDiscussion({
          User: {pseudo: "Administrateur"},
          subject: "Welcome",
          message: "Vous êtes maintenant sur le réseau social de Groupomania. Sélectionnez une discussion dans le panneau dédié pour l'afficher dans cet espace.",
          created_at: ": Au tout début...",
          imageUrl: null
        });
        this.setLoggedIn(true);
        this.setIsAdmin(response.data.isAdmin);
        this.setConnectionExpired(false);
        this.badLogin = false;
        this.errorMessage = null;
        this.$router.push('/');
      }.bind(this))
      .catch(function (error) {
        this.badLogin = true;
        this.errorMessage = error.response.data.error;
      }.bind(this));
    },
    ...mapActions(['setLoggedIn','setIsAdmin','setConnectionExpired','setCurrentDiscussion','updateDiscussionsFilter'])
  }

}
</script>

<style>
  input, label {
    display: block!important;
  }

  .bad-login, .connection-expired {
    color: #D1515A;
    font-weight: 600;
  }
</style>