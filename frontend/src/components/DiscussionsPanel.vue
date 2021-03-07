<template>
  <div id="discussionsPanel" class="expanded">
    <div class="d-flex flex-row-reverse my-2">
      <div class="discussion-icon me-3 expanded" id="discussionsPanelToggle" data-bs-toggle="tooltip" data-bs-placement="top" title="Masquer les discussions" @click="toggleDiscussionPanel">
        <BIconArrowLeftCircle />
      </div>
      <div class="discussion-icon me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Nouvelle discussion" @click="showModalCreate = true">
        <BIconChatLeftText />
      </div>
      <div class="discussion-icon me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Rechercher dans les discussions" @click="toggleDiscussionsFilter">
        <BIconSearch />
      </div >
      <div id="discussionsFilterWrapper" class="me-3">
        <input id="discussionsFilter" class="rounded-3 m-auto expanded" title="Mots à rechercher séparés par un espace" placeholder="Rechercher..." @input="setDiscussionsFilter" />
      </div>
    </div>
    <h2 class="mt-3">Discussions</h2>
    <DiscussionsList />
    <div v-if="showModalCreate">
      <Modal @closeModalCreate="closeModalCreate()"> 
        <template v-slot:header>
          <label for="inputModalSubjectCreate">Nouvelle discussion</label>
          <input id="inputModalSubjectCreate" v-model="subject" type="text" placeholder="Sujet" class="mx-auto rounded-3"/>
        </template>
        <template v-slot:body>
          <label for="textareaModalMessageCreate">Message</label>
          <textarea id="textareaModalMessageCreate" v-model="message" placeholder="Message" class="mx-auto rounded-3">
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

let timeout = null;

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
      toggleDiscussionsFilter () {
        const input = document.getElementById('discussionsFilter');
        if (input.classList.contains('expanded')) {
          input.classList.remove('expanded');
          this.updateDiscussionsFilter('');
          input.value = '';
        } else {
          input.classList.add('expanded');          
        }
      },
      setDiscussionsFilter (event) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.updateDiscussionsFilter(event.target.value);
        }, 1000);
        
      },
      ...mapActions(['setCurrentDiscussion', 'updateDiscussions', 'updateDiscussionsFilter'])
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
    #discussionsFilterWrapper {
      overflow: hidden;
      align-self: center;
      #discussionsFilter {
        transition: 0.4s;
        transform: translate(100%);
        &.expanded {
          transform: translate(0%);
        }
        &:focus {
          outline: none;
          border: 0.2rem solid #D1515A;
        }
      }
    }
  }



</style>