<template>
  <div class="d-flex flex-fill flex-column">
    <signupform />
  </div>
</template>

<script>
import signupform from '@/components/signupform'

export default {
  name: 'signup',
  components: {
    signupform
  }

}
</script>