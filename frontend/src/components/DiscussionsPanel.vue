<template>
  <div id="discussionsPanel">
    <div class="d-flex flex-row-reverse my-2">
      <div class="discussion-icon me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Nouvelle discussion" @click="showModal = true">
        <BIconChatLeftText />
      </div>
      <div class="discussion-icon me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Rechercher dans les discussions">
        <BIconSearch />
      </div >
    </div>
    <h2 class="mt-3">Discussions</h2>
    <div v-if="showModal">
      <ModalWindow> 
        <CreateDiscussionModal />
      </ModalWindow>
    </div>    
  </div>
</template>

<script>
import { BIconChatLeftText, BIconSearch } from 'bootstrap-icons-vue';
import ModalWindow from '@/components/ModalWindow.vue';
import CreateDiscussionModal from '@/components/CreateDiscussionModal';

  export default {
    data() {
      return {
        showModal: false
      }
    },
    methods: {
      /* createDiscussion () {
        this.showModal = false;
      },
      cancelCreateDiscussion () {
        this.showModal = false;
      } */
    },
    components: {
      BIconChatLeftText,
      BIconSearch,
      ModalWindow,
      CreateDiscussionModal
    }
  }
</script>

<style lang="scss">

  #discussionsPanel {
    width: 33%;
    background-color: #091F43;
    color: white;
    overflow: hidden;
    .discussion-icon {
      font-size: 1.5rem;
    }
  }

</style>