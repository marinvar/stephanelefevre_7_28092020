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
  </div>
</template>

<script>
import DiscussionHeader from '@/components/DiscussionHeader';
import DiscussionBody from '@/components/DiscussionBody';
import DiscussionComment from '@/components/DiscussionComment';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['currentDiscussion'])
  },
  components: {
    DiscussionHeader,
    DiscussionBody,
    DiscussionComment
  }
}

</script>

<style lang="scss">
p {
  word-break: break-word;
  margin: 1rem;
}


</style>