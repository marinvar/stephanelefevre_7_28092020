<template>
  <div class="home flex-fill d-flex">
    <SocialNetwork />
  </div>
</template>

<script>
// @ is an alias to /src
import SocialNetwork from '@/components/SocialNetwork.vue';

export default {
  name: 'Home',
  components: {
    SocialNetwork
  }
}
</script>

<style lang="scss">

h1 {
  font-size: 1.6rem;
}

</style>