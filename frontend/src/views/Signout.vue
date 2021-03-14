<template>
  <div>
    <h2 class="mt-3">Désinscription</h2>
    <p>Voulez-vous vraiment vous désinscrire ?</p>
    <p class="danger">(Attention, cette action est irréversible !)</p>
    <signout-form class="d-flex flex-fill flex-column" />
  </div>
</template>

<script>

import SignoutForm from '@/components/SignoutForm.vue';

export default {
  name: 'Signout',
  components: {
    "signout-form": SignoutForm
  }
}
</script>

<style lang="scss">
  .danger {
    color: white;
    font-weight: 600;
    background-color: #dc3545;
    padding: 0.5rem;
    margin-bottom: 3rem;
    width: max-content;
    margin-left: auto;
    margin-right: auto;
  }
</style>