<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" role="dialog" aria-modal="true">
          <div class="modal-header">
            <slot name="header">
              Default header
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              Default body
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              Default footer
              <button type="button" class="btn btn-success mt-3" aria-label="Fermer cette fenêtre" @click="$emit('closeModal')">
                Fermer
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: block;
  color: #091F43;
  font-size: 1.2rem;
  font-weight: 600;
  min-width: 18rem;
  width: 60%;
  margin: 0px auto;
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  display: block!important;
}

#textareaModalMessageCreate, #inputModalSubjectCreate {
  width: 90%;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>