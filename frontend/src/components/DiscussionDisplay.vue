<template>
<div class="d-flex flex-column flex-fill">
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
    <h2 class="fs-5 mt-5">Commentaires</h2>
    <div v-for="comment in comments" v-bind:key="comment.id" >
      <DiscussionComment>
        <template v-slot:message>
          <div class="text-start">
            {{ comment.comment }}
          </div>
        </template>
        <template v-slot:created>
          <div  class="comment-created text-end mx-3" v-bind:title="'Par ' + comment.author + ', le ' + comment.created_at">
            Par {{ comment.author }}, le {{ comment.created_at }}
          </div>
        </template>
      </DiscussionComment>
    </div>
  </div>
  <div class="mt-auto">
    <CommentInput />
  </div>
</div>
</template>

<script>
import DiscussionHeader from '@/components/DiscussionHeader';
import DiscussionBody from '@/components/DiscussionBody';
import DiscussionComment from '@/components/DiscussionComment';
import CommentInput from '@/components/CommentInput';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['currentDiscussion','comments'])
  },
  components: {
    DiscussionHeader,
    DiscussionBody,
    DiscussionComment,
    CommentInput
  }
}

</script>

<style lang="scss">
p {
  word-break: break-word;
  margin: 1rem;
}

.comment-created {
  font-size: 0.7rem;
}

</style>