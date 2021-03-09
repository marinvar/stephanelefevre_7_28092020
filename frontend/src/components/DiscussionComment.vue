<template>
  <div>
    <hr>
    <div class='comment-message mx-3'>
      <slot name="message">
        Default Comment
      </slot>
    </div>
    <div class='comment-creation'>
      <slot name="created">
        Par moi, le 01/01/2021
      </slot>
    </div>
  </div>
</template>