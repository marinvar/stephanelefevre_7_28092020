<template>
  <div>
    <h2 class="mt-3">Déconnexion</h2>
    <p>Voulez-vous vraiment vous déconnecter ?</p>
    <button type="button" class="btn btn-secondary m-3" @click="cancelLogout">
      Annuler
    </button>
    <button type="button" class="btn btn-success m-3" @click="logout">
      Se connecter
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
      this.updateDiscussionsFilter("");
      this.setCurrentDiscussion({
          User: {pseudo: "Administrateur"},
          subject: "Welcome",
          message: "Vous êtes maintenant sur le réseau social de Groupomania. Sélectionnez une discussion dans le panneau dédié pour l'afficher dans cet espace.",
          created_at: ": Au tout début..."
        });
      this.setLoggedIn(false);
      this.setIsAdmin(false);
      this.$router.push('/');
    },
    ...mapActions(['setLoggedIn','setIsAdmin','setCurrentDiscussion','updateDiscussionsFilter'])
  }
}
</script>