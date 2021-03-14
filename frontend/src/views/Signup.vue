<template>
  <div class="d-flex flex-fill flex-column">
    <signup-form />
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm'

export default {
  name: 'Signup',
  components: {
    "signup-form": SignupForm
  }

}
</script>