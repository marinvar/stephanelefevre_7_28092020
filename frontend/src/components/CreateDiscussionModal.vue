
<template v-slot:header>
  <label for="inputModalField">Sujet de la nouvelle discussion</label>
</template>
<template v-slot:body>
  <input id="inputModalField" type="text" placeholder="Sujet" class="mx-auto"/>
</template>
<template v-slot:footer>
  <button class="btn btn-success mt-3" @click="showModal = false">
    Valider
  </button>
</template>
      