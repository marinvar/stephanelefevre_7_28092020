<template>
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
      >
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
      >
    </p>

    <p>
      <input
        class="mx-auto"
        type="submit"
        value="Se connecter"
      >
    </p>

  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      pseudo: null,
      password: null
    }
  },
  computed: {
    ...mapState(['loggedIn'])
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
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('pseudo', this.pseudo);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        this.setLoggedIn(true);
        this.$router.push('/');
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    ...mapActions(['setLoggedIn'])
  }

}
</script>

<style>
  input, label {
    display: block;
  }
</style>