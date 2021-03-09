<template>
  <form
    id="createComment"
    @submit="createComment"
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
        id="createCommentButton"
        class="btn btn-success"
        @click="submitComment"
      >Envoyer</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
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
    submitComment (e) {
      e.preventDefault();
      console.log(this.currentDiscussion);
      const bodyParameters = {
        comment: this.comment,
        author: localStorage.getItem('pseudo') ? localStorage.getItem('pseudo') : 'Anonymous',
        discussionId: this.currentDiscussion.id
      }
      axios.post('http://localhost:3000/api/comment/createComment', bodyParameters)
      .then(function (response) {
        console.log(response);
        this.comment = "";
        document.getElementById('createCommentInput').value = '';
        this.updateComments();
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    },
    ...mapActions(['updateComments'])
  }
}
</script>