<template>
  <form 
    id="signupForm"
    @submit="signupSubmit"
    action="/signup"
    method="post"
  >
    <p v-if="errors.length">
      <b>Veuillez corriger l'(les) erreur(s) suivante(s) :</b>
      <ul>
        <li v-bind:key="error" v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

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
      <label for="firstName">Prénom</label>
      <input
        class="mx-auto"
        type="text"
        id="firstName"
        v-model="firstName"
        name="firstName"
        @input="firstNameInput"
      >
    </p>

    <p>
      <label for="lastName">Nom</label>
      <input
        class="mx-auto"
        type="text"
        id="lastName"
        v-model="lastName"
        name="lastName"
        @input="lastNameInput"
      >
    </p>

    <p>
      <label for="email">Email</label>
      <input
        class="mx-auto"
        type="email"
        id="email"
        v-model="email"
        name="email"
        @input="emailInput"
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
      <label for="passwordConfirm">Confirmer le mot de passe</label>
      <input
        class="mx-auto"
        type="password"
        id="passwordConfirm"
        v-model="passwordConfirm"
        name="passwordConfirm"
        @input="passwordConfirmInput"
      >
    </p>

    <p>
      <input
        class="mx-auto"
        type="submit"
        value="S'inscrire"
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
      errors: [],
      pseudo: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirm: null
    }
  },
  computed: {
    ...mapState(['userId', 'userToken'])
  },
  methods: {
    pseudoInput (e) {
      this.pseudo = e.target.value;
    },
    firstNameInput (e) {
      this.firstName = e.target.value;
    },
    lastNameInput (e) {
      this.lastName = e.target.value;
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
    signupSubmit (e) {
      e.preventDefault();
      if (this.pseudo && this.firstName && this.lastName && this.email && this.password && this.passwordConfirm && this.password === this.passwordConfirm) {
        this.submitRequest();
      }
      this.errors = [];
      if (!this.pseudo) {
        this.errors.push('Pseudo requis.');
      }
      if (!this.firstName) {
        this.errors.push('Prénom requis.');
      }
      if (!this.lastName) {
        this.errors.push('Nom requis.');
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
        firstName: this.firstName,
        lastName: this.lastName,
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
            this.setUserId(response.data.userId);
            this.setToken(response.data.token)
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
          this.$router.push('/');
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    ...mapActions(['setUserId', 'setToken'])
  }

}
</script>

<style>
  input, label {
    display: block;
  }
</style>