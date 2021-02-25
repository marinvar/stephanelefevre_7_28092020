<template>
  <div class="home" clas="d-flex">
    <SocialNetwork />
    
  </div>
</template>

<script>
// @ is an alias to /src
import SocialNetwork from '@/components/SocialNetwork.vue'

export default {
  name: 'Home',
  components: {
    SocialNetwork
  }
}
</script>

<style lang="scss">

</style>