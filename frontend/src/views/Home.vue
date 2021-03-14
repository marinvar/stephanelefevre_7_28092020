<template>
  <div class="home flex-fill d-flex">
    <social-network />
  </div>
</template>

<script>
// @ is an alias to /src
import SocialNetwork from '@/components/SocialNetwork.vue';

export default {
  name: 'Home',
  components: {
    "social-network": SocialNetwork
  }
}
</script>

<style lang="scss">

</style>