<template>
  <form
    id="createComment"
    @submit.prevent="submitComment"
    method="post"
    v-if="this.currentDiscussion.id"
  >
    <div class="input-group p-3">
      <input
        type="text"
        id="createCommentInput"
        class="form-control"
        placeholder="Commentaire"
        @input="commentInput"
      />
      <button
        type="submit"
        id="createCommentButton"
        class="btn btn-success"
        aria-label="Envoyer le commentaire à créer"
      >Envoyer</button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      comment: null,
    }
  },
  computed: {
    ...mapState(['currentDiscussion'])
  },
  methods: {
    commentInput (e) {
      this.comment = e.target.value;
    },
    submitComment () {
      const bodyParameters = {
        comment: this.comment,
        author: localStorage.getItem('pseudo') ? localStorage.getItem('pseudo') : 'Anonymous',
        discussionId: this.currentDiscussion.id
      }
      axios.post('http://localhost:3000/api/comment/createComment', bodyParameters)
      .then(function () {
        this.comment = null;
        document.getElementById('createCommentInput').value = '';
        this.updateAddedComment(true);
      }.bind(this))
      .catch(function (error) {
        if (error.response.status === 401) {
            this.identify401(error);
          } else {
            console.log(error);
          }
      });
    },
    ...mapActions(['updateAddedComment','identify401'])
  }
}
</script>