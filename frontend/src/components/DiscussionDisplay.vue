<template>
  <div>
    <DiscussionHeader>
      <template v-slot:subject>
        <div class="discussion-subject fs-3" v-bind:title="currentDiscussion.subject">
          {{ currentDiscussion.subject }}
        </div>
      </template>
      <template v-slot:created>
        <div  class="discussion-created" v-bind:title="'Par ' + currentDiscussion.User.pseudo + ', le ' + currentDiscussion.created_at">
          Par {{ currentDiscussion.User.pseudo }}, le {{ currentDiscussion.created_at }}
        </div>
      </template>
    </DiscussionHeader>
    <DiscussionBody>
      <template v-slot:message>
        <p class="text-start">
          {{ currentDiscussion.message }}
        </p>
      </template>
    </DiscussionBody>
    <hr>
    <h2 class="fs-5">Commentaires</h2>
    <div v-for="comment in discussionComments" v-bind:key="comment.id" >
      <DiscussionComment>
        <template v-slot:message>
          <div class="text-start">
            {{ comment.message }}
          </div>
        </template>
        <template v-slot:created>
          <div  class="discussion-created" v-bind:title="'Par ' + discussion.User.pseudo + ', le ' + discussion.created_at">
            Par {{ comment.User.pseudo }}, le {{ comment.created_at }}
          </div>
        </template>
      </DiscussionComment>
    </div>
      <form
        id="createComment"
        @submit="createComment"
        method="post"
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
  </div>
</template>

<script>
import DiscussionHeader from '@/components/DiscussionHeader';
import DiscussionBody from '@/components/DiscussionBody';
import DiscussionComment from '@/components/DiscussionComment';
import { mapState } from 'vuex';
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
  components: {
    DiscussionHeader,
    DiscussionBody,
    DiscussionComment
  },
  methods: {
    commentInput (e) {
      this.comment = e.target.value;
    },
    submitComment (e) {
      e.preventDefault();
      const bodyParameters = {
        comment: this.comment,
        author: localStorage.getItem('pseudo') ? localStorage.getItem('pseudo') : 'Anonymous',
        discussionId: this.currentDiscussion.id
      }
      axios.post('http://localhost:3000/api/comment/createComment', bodyParameters)
      .then(function (response) {
        console.log(response);
        /* this.setCurrentDiscussion(response.data.discussion);
        this.updateDiscussions(); */
        this.comment = "";
        document.getElementById('createCommentInput').value = '';
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}

</script>

<style lang="scss">
p {
  word-break: break-word;
  margin: 1rem;
}


</style>