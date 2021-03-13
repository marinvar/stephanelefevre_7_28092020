<template>
  <div id="socialNetwork" class="d-flex flex-fill">
    <div v-if="this.userToken === null || this.userId === null" class="mx-auto flex-fill">
      <p>Désolé,<br />vous devez <br /><router-link to="/signup">vous inscrire</router-link> ou<br />
      <router-link to="/login">vous connecter</router-link><br />
      pour accéder au réseau social d'entreprise<br /> de Groupomania !</p>
    </div>
    <div v-else-if="this.userToken !== null && this.userId !== null" class="d-flex flex-fill">
      <DiscussionsPanel />
      <div id="discussionDisplay" class="mx-auto expanded flex-fill d-flex flex-column">
        <h1 class="mx-auto my-2 fs-5">Bienvenue sur votre réseau {{ pseudo }} !</h1>
        <DiscussionDisplay />
      </div>
    </div>
  </div>
</template>

<script>
import DiscussionsPanel from '@/components/DiscussionsPanel';
import DiscussionDisplay from '@/components/DiscussionDisplay';

export default {
  data() {
    return {
      userToken: localStorage.getItem('userToken'),
      userId: parseInt(localStorage.getItem('userId')),
      pseudo: localStorage.getItem('pseudo')
    }
  },
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