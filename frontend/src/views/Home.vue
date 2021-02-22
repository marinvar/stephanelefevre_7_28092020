<template>
  <div class="home">
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
