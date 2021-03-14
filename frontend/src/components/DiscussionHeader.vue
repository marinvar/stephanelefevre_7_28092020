<template>
  <div>
    <hr />
    <div class="discussions-subject">
      <slot name="subject">
        Default subject
      </slot>
    </div>
    <div class="discussions-creation">
      <slot name="created">
        Par moi, le 01/01/2021
      </slot>
    </div>
  </div>
</template>

<style lang="scss">

  hr {
    margin: 0.1rem!important;
  }
</style>