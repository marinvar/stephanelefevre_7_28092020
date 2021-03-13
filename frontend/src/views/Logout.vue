<template>
  <div>
    <h2 class="mt-3">Déconnexion</h2>
    <p>Voulez-vous vraiment vous déconnecter ?</p>
    <button class="btn btn-secondary m-3" @click="cancelLogout">
      Annuler
    </button>
    <button class="btn btn-success m-3" @click="logout">
      Valider
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Logout',
  computed: {
    ...mapState(['loggedIn'])
  },
  methods: {
    cancelLogout() {
     this.$router.push('/');
    },
    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('pseudo');
      localStorage.removeItem('userToken');
      localStorage.removeItem('isAdmin');
      this.setLoggedIn(false);
      this.setIsAdmin(false);
      this.$router.push('/');
    },
    ...mapActions(['setLoggedIn','setIsAdmin'])
  }
}
</script>