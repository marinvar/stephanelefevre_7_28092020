<template>
  <div class="vh-100 d-flex flex-column">
    <Navbar />
    <div id="demark"></div>
    <router-view></router-view>
    <div id="demark" class="mt-auto"></div>
    <Footer />
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    components: {
      Navbar,
      Footer
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
  background-color: #D4D4D4;
}

#demark {
  width: 100%;
  height: 0.4rem;
  border: 0.2rem solid #D1515A;
  background-color: #D1515A;
  margin: 0;
}

</style>
