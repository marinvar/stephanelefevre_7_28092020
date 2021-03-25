<template>
  <div>
    <form 
      id="loginForm"
      @submit.prevent="signoutSubmit"
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
          class="mx-auto mt-3 btn btn-danger"
          type="submit"
        >Se désinscrire</button>
      </p>

    </form>
    <div class="bad-login" v-if="badUser === true">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      pseudo: null,
      password: null,
      errorMessage: null,
      badUser: false
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
    signoutSubmit () {
      axios.post('http://localhost:3000/api/auth/signout', { 
        pseudo: this.pseudo,
        password: this.password
      })
      .then(() => {
        localStorage.removeItem('pseudo');
        localStorage.removeItem('userId');
        localStorage.removeItem('userToken');
        localStorage.removeItem('isAdmin');
        this.setLoggedIn(false);
        this.setIsAdmin(false);
        this.updateDiscussionsFilter("");
        this.setCurrentDiscussion({
          User: {pseudo: "Administrateur"},
          subject: "Welcome",
          message: "Vous êtes maintenant sur le réseau social de Groupomania. Sélectionnez une discussion dans le panneau dédié pour l'afficher dans cet espace.",
          created_at: ": Au tout début...",
          imageUrl: null
        });
        this.$router.push('/signup');
      })
      .catch((error) => {
        if (error.response.status === 401 && error.response.data.error.name === "TokenExpiredError") {
          this.identify401(error);
        } else {
          this.badUser = true;
          this.errorMessage = error.response.data.error;
        }
      });
    },
    ...mapActions(['setLoggedIn','identify401','setIsAdmin','setCurrentDiscussion','updateDiscussionsFilter'])
  }

}
</script>