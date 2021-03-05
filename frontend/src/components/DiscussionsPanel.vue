<template>
  <div id="discussionsPanel" class="expanded">
    <div class="d-flex flex-row-reverse my-2">
      <div class="discussion-icon me-3 expanded" id="discussionsPanelToggle" data-bs-toggle="tooltip" data-bs-placement="top" title="Masquer les discussions" @click="toggleDiscussionPanel">
        <BIconArrowLeftCircle />
      </div>
      <div class="discussion-icon me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Nouvelle discussion" @click="showModalCreate = true">
        <BIconChatLeftText />
      </div>
      <div class="discussion-icon me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Rechercher dans les discussions" @click="filterDiscussions">
        <BIconSearch />
      </div >
    </div>
    <h2 class="mt-3">Discussions</h2>
    <DiscussionsList />
    <div v-if="showModalCreate">
      <Modal @closeModalCreate="closeModalCreate()"> 
        <template v-slot:header>
          <label for="inputModalSubjectCreate">Nouvelle discussion</label>
          <input id="inputModalSubjectCreate" v-model="subject" type="text" placeholder="Sujet" class="mx-auto"/>
        </template>
        <template v-slot:body>
          <label for="textareaModalMessageCreate">Message</label>
          <textarea id="textareaModalMessageCreate" v-model="message" placeholder="Message" class="mx-auto">
          </textarea>
        </template>
        <template v-slot:footer>
          <button class="btn btn-secondary mt-3" @click="showModalCreate = false">
            Annuler
          </button>
          <button class="btn btn-success mt-3" @click="createDiscussion">
            Valider
          </button>
        </template>
      </Modal>
    </div>    
  </div>
</template>

<script>
import { BIconChatLeftText, BIconSearch, BIconArrowLeftCircle } from 'bootstrap-icons-vue';
import Modal from '@/components/Modal.vue';
import DiscussionsList from '@/components/DiscussionsList.vue';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

  export default {
    data() {
      return {
        showModalCreate: false,
        subject: null,
        message: null
      }
    },
    computed: {
      ...mapState(['currentDiscussion', 'userId', 'userToken'])
    },
    methods: {
      closeModalCreate() {
        this.showModalCreate = false;
      },
      createDiscussion () {
        this.showModalCreate = false;
        const config = {
          headers: { 'Authorization': 'Bearer ' + this.userToken }
        };
        const bodyParameters = {
          subject: this.subject,
          message: this.message,
          userId: this.userId
        }
        axios.post('http://localhost:3000/api/discussion/createDiscussion', bodyParameters, config)
        .then(function (response) {
          this.setCurrentDiscussion(response.data.discussion);
          this.updateDiscussions();
          this.subject = "";
          this.message = "";
        }.bind(this))
        .catch(function (error) {
          console.log(error);
        });
      },
      toggleDiscussionPanel () {
        const panelClasses = document.getElementById('discussionsPanel').classList;
        const iconClasses = document.getElementById('discussionsPanelToggle').classList;
        if (panelClasses.contains('expanded')) {
          panelClasses.remove('expanded');
          iconClasses.remove('expanded');
          document.getElementById('discussionsPanelToggle').title = "Afficher les discussions";
        } else {
          panelClasses.add('expanded');
          iconClasses.add('expanded');
          document.getElementById('discussionsPanelToggle').title = "Masquer les discussions";
        }
      },
      filterDiscussions () {

      },
      ...mapActions(['setCurrentDiscussion', 'updateDiscussions'])
    },
    components: {
      BIconChatLeftText,
      BIconSearch,
      BIconArrowLeftCircle,
      Modal,
      DiscussionsList
    }
  }
</script>

<style lang="scss">

  #discussionsPanel {
    width: 3.5rem;
    background-color: #091F43;
    color: #091F43;
    overflow: hidden;
    transition: 0.6s ease-in-out;
    .discussion-icon {
      font-size: 1.5rem;
      cursor: pointer;
    }
    &.expanded {
      width: 33%;
      color: white
    }
  }

  #discussionsPanelToggle {
    transform: rotate(180deg);
    line-height: 2rem;
    transition: 0.4s;
    transition-delay: 0.6s;
    color: white;
    &.expanded {
      transform: rotate(0deg);
    }
  }


</style>