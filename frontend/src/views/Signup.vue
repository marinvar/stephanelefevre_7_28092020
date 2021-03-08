<template>
  <div class="d-flex flex-fill flex-column">
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm'

export default {
  name: 'Signup',
  components: {
    SignupForm
  }

}
</script>