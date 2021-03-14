<template>
  <div>
    <form 
      id="signupForm"
      @submit.prevent="signupSubmit"
      action="/signup"
      method="post"
    >
      <div v-if="errors.length">
        <b>Veuillez corriger l'(les) erreur(s) suivante(s) :</b>
        <ul>
          <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
        </ul>
      </div>

      <p class="p-0">
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

      <p class="p-0">
        <label for="email">Email</label>
        <input
          class="mx-auto"
          type="email"
          id="email"
          v-model="email"
          name="email"
          @input="emailInput"
        />
      </p>

      <p class="p-0">
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

      <p class="p-0">
        <label for="passwordConfirm">Confirmer le mot de passe</label>
        <input
          class="mx-auto"
          type="password"
          id="passwordConfirm"
          v-model="passwordConfirm"
          name="passwordConfirm"
          @input="passwordConfirmInput"
        />
      </p>

      <p class="p-0">
        <button
          class="mx-auto"
          type="submit"
        >S'inscrire</button>
      </p>

    </form>
    <div class="bad-login" v-if="badLogin === true">
      {{ errorMessage }}
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';


export default {
  name: 'SignupForm',
  data() {
    return {
      badLogin: false,
      errorMessage: null,
      errors: [],
      pseudo: null,
      email: null,
      password: null,
      passwordConfirm: null,
      userId: null/* localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : null */
    }
  },
  computed: {
    ...mapState(['loggedIn'])
  },
  methods: {
    pseudoInput (e) {
      this.pseudo = e.target.value;
    },
    emailInput (e) {
      this.email = e.target.value;
    },
    passwordInput (e) {
      this.password = e.target.value;
    },
    passwordConfirmInput (e) {
      this.passwordConfirm = e.target.value;
    },
    signupSubmit () {
      if (this.pseudo && this.email && this.password && this.passwordConfirm && this.password === this.passwordConfirm) {
        this.submitRequest();
      }
      this.errors = [];
      if (!this.pseudo) {
        this.errors.push('Pseudo requis.');
      }
      if (!this.email) {
        this.errors.push('Email requis.');
      }
      if (!this.password) {
        this.errors.push('Mot de passe requis.');
      }
      if (!this.passwordConfirm) {
        this.errors.push('Veuillez confirmer le mot de passe.');
      }
      if (this.password !== this.passwordConfirm) {
        this.errors.push('Les mots de passe ne correspondent pas.');
      }

    },
    submitRequest () {
      axios.post('http://localhost:3000/api/auth/signup', { 
        pseudo: this.pseudo,
        email: this.email,
        password: this.password
      })
      .then(function (response) {
        if (response.status === 201) {
          axios.post('http://localhost:3000/api/auth/login', { 
            pseudo: this.pseudo,
            password: this.password
          })
          .then(function (response) {
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('pseudo', this.pseudo);
            localStorage.setItem('isAdmin', response.data.isAdmin);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            this.setLoggedIn(true);
            this.setIsAdmin(response.data.isAdmin);
            this.badLogin = false;
            this.errorMessage = null;
            this.$router.push('/');
          }.bind(this))
          .catch(function (error) {
            console.log(error.response);
            this.badLogin = true;
            this.errorMessage = error.response.json;
          });
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error.response);
        this.badLogin = true;
        this.errorMessage = error.response.data.error;
      }.bind(this));
    },
    ...mapActions(['setLoggedIn','setIsAdmin'])
  }
}
</script>