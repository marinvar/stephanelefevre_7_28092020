<template>
  <Modal>
    <template v-slot:header>
      Editer un commentaire
    </template>
    <template v-slot:body>
      <form
        id="editCommentForm"
        method="post"
      >
        <div class="input-group p-3">
          <input
            type="text"
            :value="comment"
            id="editCommentInput"
            class="form-control"
            placeholder="Commentaire"
            @input="commentInput"
          />
          <button
            id="editCommentButton"
            class="btn btn-success"
            @click.prevent="submitCommentEdit"
          ><BIconTelegram /></button>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <div></div>
    </template> 
  </Modal>
</template>

<script>
import { /* mapState,  */mapActions } from 'vuex';
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
    BIconTelegram,
    Modal
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
      axios.post('http://localhost:3000/api/comment/editComment', bodyParameters)
      .then(function () {
        this.comment = "";
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
