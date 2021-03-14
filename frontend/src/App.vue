<template>
  <div class="app vh-100 d-flex flex-column">
    <navbar-cmp />
    <div class="demark"></div>
    <router-view></router-view>
    <div class="mt-auto demark"></div>
    <footer-cmp />
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    components: {
      "navbar-cmp": Navbar,
      "footer-cmp": Footer
    }  
  }
</script>

<style lang="scss">

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #091F43;
}

.app {
  background-color: #D4D4D4;
}

.demark {
  width: 100%;
  height: 0.4rem;
  border: 0.2rem solid #D1515A;
  background-color: #D1515A;
  margin: 0;
}

</style>
