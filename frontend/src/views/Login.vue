<template>
  <login-form class="d-flex flex-fill flex-column" />
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    "login-form": LoginForm
  }
}
</script>