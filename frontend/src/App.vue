<template>
  <Navbar />
  <div id="demark"></div>
  <router-view></router-view>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';

  export default {
    components: {
      Navbar
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
  border: 0.2rem solid #D1515A;
  margin: 0;
}

</style>
