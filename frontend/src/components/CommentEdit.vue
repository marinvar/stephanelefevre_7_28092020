<template>
  <modal-cmp>
    <template v-slot:header aria-label="Editer un commentaire">
      Editer un commentaire
    </template>
    <template v-slot:body>
      <form
        class="editCommentForm"
        method="post"
        @submit.prevent="submitCommentEdit"
      >
        <div class="input-group p-3">
          <input
            type="text"
            v-model="comment"
            class="form-control editCommentInput"
            placeholder="Commentaire"
            @input="commentInput"
          />
          <button
            type="submit"
            class="btn btn-success editCommentButton"
            aria-label="Envoyer le commentaire édité"
          >Editer <b-icon-telegram /></button>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <div></div>
    </template>
  </modal-cmp>
</template>

<script>
import { mapActions } from 'vuex';
import { BIconTelegram } from 'bootstrap-icons-vue';
import axios from 'axios';
import Modal from '@/components/Modal';

export default {
  props: ['initialComment'],
  data() {
    return {
      comment: this.initialComment.comment
    }
  },
  components: {
    "b-icon-telegram": BIconTelegram,
    "modal-cmp": Modal
  },
  methods: {
    commentInput (e) {
      this.comment = e.target.value;
    },
    submitCommentEdit () {
      const bodyParameters = {
        newComment: this.comment,
        id: this.initialComment.id
      }
      axios.put('http://localhost:3000/api/comment/editComment', bodyParameters)
      .then(function () {
        this.comment = null;
        this.updateAddedComment(true);
        this.updateEditComment(false);
      }.bind(this))
      .catch(function (error) {
        if (error.response.status === 401) {
            this.identify401(error);
          } else {
            console.log(error);
          }
      });
    },
    ...mapActions(['updateAddedComment','identify401','updateEditComment'])
  }
}
</script>
