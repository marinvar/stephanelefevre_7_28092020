<template>
  <div id="navbar">
    <a href="/">
      <img alt="Logo Groupomania" src="@/assets/icon-left-font-monochrome-white.svg">
    </a>
    <div id="nav">
      <router-link to="/">Accueil</router-link>
      <router-link to="/signup">Inscription</router-link>
      <router-link to="/login">Connexion</router-link>
      <router-link to="/about">À propos</router-link>
    </div>
  </div>
</template>

<style lang="scss">

#navbar {
  background-color: #091F43;
  img {
    width: 50%;
    padding: 1rem;
    max-height: 5rem;
  }
  h1 {
    background-color: #D4D4D4;
  }
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    margin: 1rem;

    &.router-link-exact-active {
      border-bottom: 0.2rem solid #D1515A;
      padding-bottom: 0.3rem;
      border-radius: 0.5rem;
    }
  }
}

</style>