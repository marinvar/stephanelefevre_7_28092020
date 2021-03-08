<template>
  <div id="socialNetwork" class="d-flex flex-fill">
    <div v-if="$store.state.userToken === null || $store.state.userId === null" class="mx-auto flex-fill">
      <p>Désolé,<br />vous devez <br /><router-link to="/signup">vous inscrire</router-link> ou<br />
      <router-link to="/login">vous connecter</router-link><br />
      pour accéder au réseau social d'entreprise<br /> de Groupomania !</p>
    </div>
    <div v-else-if="$store.state.userToken !== null && $store.state.userId !== null" class="d-flex flex-fill">
      <DiscussionsPanel />
      <div id="discussionDisplay" class="mx-auto expanded">
        <h1 class="mx-auto my-2">Bienvenue sur votre réseau !</h1>
        <DiscussionDisplay />
      </div>
    </div>
  </div>
</template>

<script>
import DiscussionsPanel from '@/components/DiscussionsPanel';
import DiscussionDisplay from '@/components/DiscussionDisplay';

export default {
  components: {
    DiscussionsPanel,
    DiscussionDisplay
  }  
}
</script>

<style lang='scss'>
  DiscussionsPanel {
    display: inline-block;
  }

  #discussionDisplay {
    max-width: 67%;
  }

</style>