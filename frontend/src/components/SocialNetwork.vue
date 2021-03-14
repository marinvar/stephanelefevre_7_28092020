<template>
  <div id="socialNetwork" class="d-flex flex-fill">
    <div v-if="this.userToken === null || this.userId === null" class="mx-auto flex-fill">
      <p>Désolé,<br />vous devez <br /><router-link to="/signup">vous inscrire</router-link> ou<br />
      <router-link to="/login">vous connecter</router-link><br />
      pour accéder au réseau social d'entreprise<br /> de Groupomania !</p>
    </div>
    <div v-else-if="this.userToken !== null && this.userId !== null" class="d-md-flex flex-fill">
      <discussion-panel />
      <div id="discussionDisplay" class="mx-auto expanded flex-fill d-flex flex-column">
        <h1 class="mx-auto my-2 fs-5">Bienvenue sur votre réseau social, {{ pseudo }} !</h1>
        <discussion-display />
      </div>
    </div>
  </div>
</template>

<script>
import DiscussionsPanel from '@/components/DiscussionsPanel';
import DiscussionDisplay from '@/components/DiscussionDisplay';

export default {
  name: "SocialNetwork",
  data() {
    return {
      userToken: localStorage.getItem('userToken'),
      userId: parseInt(localStorage.getItem('userId')),
      pseudo: localStorage.getItem('pseudo')
    }
  },
  components: {
    "discussion-panel": DiscussionsPanel,
    "discussion-display": DiscussionDisplay
  }  
}
</script>

<style lang='scss'>
  #discussionDisplay {
    background-color: white!important;
  }


  @media (min-width: 768px) {
    #discussionDisplay {
      max-width: 60%;

    }
    
  }

</style>