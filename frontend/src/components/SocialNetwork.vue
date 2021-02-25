<template>
  <div id="socialNetwork">
    <div v-if="$store.state.userToken === null || $store.state.userId === null">
      <p>Désolé,<br />vous devez <br /><router-link to="/signup">vous inscrire</router-link> ou<br />
      <router-link to="/login">vous connecter</router-link><br />
      pour accéder au réseau social d'entreprise<br /> de Groupomania !</p>
    </div>
    <div v-else-if="$store.state.userToken !== null && $store.state.userId !== null" class="d-flex">
      <DiscussionsPanel />
      <h1 class="mx-auto my-2">Bienvenue chez Groupomania !</h1>
    </div>
  </div>
</template>

<script>
import DiscussionsPanel from '@/components/DiscussionsPanel';

export default {
  components: {
    DiscussionsPanel
  }  
}
</script>