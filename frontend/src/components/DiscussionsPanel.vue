<template>
  <div id="discussionsPanel" class="expanded d-flex flex-column">
    <div class="d-flex flex-row-reverse">
      <div class="discussion-icon me-3 expanded" id="discussionsPanelToggle" data-bs-toggle="tooltip" data-bs-placement="top" title="Masquer les discussions" @click="toggleDiscussionPanel">
        <b-icon-arrow-left-circle />
      </div>
      <div class="discussion-icon me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Nouvelle discussion" @click="showModalCreate = true">
        <b-icon-chat-left-text />
      </div>
      <div class="discussion-icon me-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Rechercher dans les discussions" @click="toggleDiscussionsFilter">
        <b-icon-search />
      </div >
      <div id="discussionsFilterWrapper" class="mx-3">
        <input type="text" id="discussionsFilter" class="rounded-3 m-auto" title="Mots à rechercher séparés par un espace" placeholder="Rechercher..." @input="setDiscussionsFilter" />
      </div>
    </div>
    <discussions-list />
    <div v-if="showModalCreate" @drop.prevent="dropHandler($event)" @dragover.prevent="dragOverHandler($event)">
      <modal-cmp @closeModalCreate="closeModalCreate()" aria-label="Créer une nouvelle discussion">
        <template v-slot:header>
          <label for="inputModalSubjectCreate" aria-label="sujet de la discussion">Nouvelle discussion</label>
          <input id="inputModalSubjectCreate" v-model="subject" type="text" placeholder="Sujet" class="mx-auto rounded-3"/>
        </template>
        <template v-slot:body>
          <label for="textareaModalMessageCreate" aria-label="message de la nouvelle discussion">Message</label>
          <textarea
            id="textareaModalMessageCreate"
            v-model="message"
            placeholder="Message"
            class="mx-auto rounded-3"
          >
          </textarea>
          <p class="drop-text">Vous pouvez également déposer une image (y compris les images animées, 500Ko maximum) dans la zone de texte, ou utiliser le bouton suivant :</p>
          <p class="file-error" v-if="imgError !== null">{{ imgError }}</p>
          <label for="inputImg" class="file-label mx-auto mb-3 btn btn-secondary">Choisir une image</label>
          <input
            id="inputImg"
            type="file"
            accept="image/*"
            @change.prevent="imageInput($event)"
          />
          <img id="imgPlayer" src="@/assets/icon.svg" alt="Image envoyée par le rédacteur du message" />
        </template>
        <template v-slot:footer>
          <button type="button" class="btn btn-secondary mt-3" aria-label="Annuler la création de discussion" @click="cancelDiscussion">
            Annuler
          </button>
          <button type="button" class="btn btn-success mt-3" aria-label="Valider la création de discussion" @click="createDiscussion">
            Valider
          </button>
          <div id="discussionCreateError" class="my-2" v-if="errorMessage !== null">
            <p>{{ errorMessage }}</p>
          </div>
        </template>
      </modal-cmp>
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
        message: null,
        userId: parseInt(localStorage.getItem('userId')),
        uploadedImg: null,
        imgError: null,
        errorMessage: null
      }
    },
    computed: {
      ...mapState(['currentDiscussion'])
    },
    methods: {
      closeModalCreate() {
        const img = document.getElementById("imgPlayer");
        img.classList.remove('displayed');
        this.uploadedImg = null;
        this.imgError = null;
        this.subject = null;
        this.message = null;
        this.showModalCreate = false;
      },
      createDiscussion () {
        if (this.subject === null || this.message === null) {
          this.errorMessage = "Le sujet ou le message sont manquants."
          return false;
        } else if (this.imgError !== null) {
          this.errorMessage = "Il y a une erreur concernant le fichier joint."
          return false;
        }
        this.errorMessage = null;
        const input = document.getElementById('discussionsFilter');
        if (input.classList.contains('expanded')) {
          this.updateDiscussionsFilter('');
          input.value = '';
        }
        const discussion = {
          subject: this.subject,
          message: this.message,
          userId: parseInt(localStorage.getItem('userId'))
        };
        if (this.uploadedImg === null) {
          axios.post('http://localhost:3000/api/discussion/createDiscussion', discussion)
          .then(function (response) {
            this.setCurrentDiscussion(response.data.discussion);
            this.updateAddedDiscussion(true);
            this.subject = null;
            this.message = null;
            this.uploadedImg = null;
            this.showModalCreate = false;
          }.bind(this))
          .catch((error) => {
            this.subject = null;
            this.message = null;
            this.uploadedImg = null;
            const img = document.getElementById("imgPlayer");
            img.classList.remove('displayed');
            if (error.response.status === 401) {
              this.identify401(error);
            } else {
              this.errorMessage = "Une erreur est survenue. Veuillez réessayer."
              console.log(error);
            }
          });
        } else {
          const formData = new FormData();
          formData.append('discussion', JSON.stringify(discussion));
          formData.append('image', this.uploadedImg);
          axios.post('http://localhost:3000/api/discussion/createDiscussion', formData)
          .then(function (response) {
            this.setCurrentDiscussion(response.data.discussion);
            this.updateAddedDiscussion(true);
            this.subject = null;
            this.message = null;
            this.uploadedImg = null;
            this.showModalCreate = false;
          }.bind(this))
          .catch((error) => {
            this.subject = null;
            this.message = null;
            this.uploadedImg = null;
            const img = document.getElementById("imgPlayer");
            img.classList.remove('displayed');
            this.errorMessage = "Une erreur est survenue. Veuillez réessayer."
            if (error.response.status === 401) {
              this.identify401(error);
            } else {
              console.log(error);
            }
          });
        }
      },
      cancelDiscussion() {
        this.showModalCreate = false;
        this.uploadedImg = null;
        const img = document.getElementById("imgPlayer");
        img.classList.remove('displayed');
        this.errorMessage = null;
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
      dropHandler(event) {
        event.stopPropagation();
        const dt = event.dataTransfer;
        const file = dt.files[0];
        if (!file) {
          this.imgError = null;
          return false;
        } else if (file.size && file.size > 500000) {
          this.imgError = "Désolé, ce fichier est trop gros. La taille limite est de 500Ko.";
          return false;
        } else if ((file.type && file.type.indexOf('image') === -1) || !file.type) {
          this.imgError = "Ce fichier n'est pas une image : " + file.type + " !";
          return false;
        } else {
          this.uploadedImg = file;
          this.imgError = null;
          const reader = new FileReader();
          const img = document.getElementById("imgPlayer");
          img.classList.add('displayed');
          reader.addEventListener('load', (event) => {
            img.src = event.target.result;
          });
          reader.readAsDataURL(this.uploadedImg);
        }
      },
      dragOverHandler(event) {
        event.stopPropagation();
      },
      imageInput(event) {
        event.stopPropagation();
        const file = event.target.files[0];
        if (!file) {
          this.imgError = null;
          return false;
        } else if (file.size && file.size > 500000) {
          this.imgError = "Désolé, ce fichier est trop gros. La taille limite est de 500Ko."
          return false;
        } else if ((file.type && file.type.indexOf('image') === -1) || !file.type) {
          this.imgError = "Ce fichier n'est pas une image : " + file.type + " !"
          return false;
        } else {
          this.uploadedImg = file;
          this.imgError = null;
          const reader = new FileReader();
          const img = document.getElementById("imgPlayer");
          img.classList.add('displayed');
          reader.addEventListener('load', (event) => {
            img.src = event.target.result;
          });
          reader.readAsDataURL(this.uploadedImg);
        }
        
      },
      ...mapActions(['setCurrentDiscussion', 'updateDiscussionsFilter','updateAddedDiscussion','identify401'])
    },
    components: {
      "b-icon-chat-left-text": BIconChatLeftText,
      "b-icon-search": BIconSearch,
      "b-icon-arrow-left-circle": BIconArrowLeftCircle,
      "modal-cmp": Modal,
      "discussions-list": DiscussionsList
    }
  }
</script>

<style lang="scss">

  #discussionsPanel {
    width: 3.5rem;
    background-color: #091F43;
    color: white;
    overflow: hidden;
    transition: 0.6s ease-in-out;
    .discussion-icon {
      font-size: 1.5rem;
      cursor: pointer;
    }
    &.expanded {
      width: 40%;
      
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
  .drop-text {
    font-size: 0.8rem;
    font-weight: 400;

  }

  #dropZone {
    width: 20rem;
    height: 3rem;
    border: 0.2rem solid #D1515A;
    border-radius: 0.5rem;
  }
  #imgPlayer {
    max-width: 5rem;
    display: none;
    &.displayed {
      display: unset;
    }
  }
  #discussionCreateError, .file-error {
    color: red;
    font-size: 1.2rem;
  }
  .file-label {
    cursor: pointer;
    font-weight: 600;
    padding-left: 3rem!important;
    padding-right: 3rem!important;
    width: max-content;
  }
  #inputImg {
    display: none!important;
  }

@media (max-width: 767px) {
  #discussionsPanel {
    width: 100%!important;
    color: white!important;
  }
  #discussionsPanelToggle {
    display: none;
  }
}

</style>