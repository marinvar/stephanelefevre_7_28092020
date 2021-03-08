<template>
  <div class="about">
    <h1>Bienvenue sur le réseau social de Groupomania</h1>
    <p>Vous devez être inscrit pour pouvoir utiliser le réseau.</p>
    <p><router-link to="/login">Connectez-vous</router-link> si c'est déjà le cas, ou
    <br /><router-link to="/signup">Inscrivez-vous</router-link> si ce n'est déjà fait !</p>
    <p>Ce réseau social d'entreprise est mis à disposition des employés de Groupomania.<br />
      Vous pouvez l'utiliser pour vos relations entre collègues à titre professionnel.<br />
      Merci de respecter la charte de l'entreprise<br />
      et de proscrire toute discussion à caractère discriminant.</p>
  </div>
</template>

<style lang="scss">

  p {
    margin: 1rem;
    padding: 1rem;
  }

</style>