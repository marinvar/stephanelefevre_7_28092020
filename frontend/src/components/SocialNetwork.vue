<template>
  <div id="socialNetwork">
    <div v-if="$store.state.userToken === null || $store.state.userId === null">
      <p>Désolé, vous devez <router-link to="/signup">vous inscrire</router-link> ou <router-link to="/login">Vous connecter</router-link> pour accéder au réseau social d'entreprise de Groupomania !</p>
    </div>
  </div>
</template>