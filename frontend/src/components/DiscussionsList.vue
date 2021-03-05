<template>
  <div v-for="discussion in discussions" v-bind:key="discussion.id" class="discussions my-3 mx-3" @click="selectDiscussion">
    <DiscussionHeader>
      <template v-slot:subject>
        <div class="discussion-subject" v-bind:title="discussion.subject">
          {{ discussion.subject }}
        </div>
      </template>
      <template v-slot:created>
        <div  class="discussion-created" v-bind:title="'Par ' + discussion.User.pseudo + ', le ' + discussion.created_at">
          Par {{ discussion.User.pseudo }}, le {{ discussion.created_at }}
        </div>
      </template>
    </DiscussionHeader>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  import DiscussionHeader from '@/components/DiscussionHeader.vue';

  export default {
    computed: {
      ...mapState([ 'discussions', 'currentDiscussion' ])
    },
    methods: {
      
      selectDiscussion () {
        this.setCurrentDiscussion
      },
      ...mapActions(['setCurrentDiscussion','addDiscussion','updateDiscussions'])
    },
    beforeMount() {
      this.updateDiscussions();
    },
    components: {
      DiscussionHeader
    }
  }
</script>

<style lang="scss">

  .discussions {
    cursor: pointer;
  }

  .discussions-subject {
    font-size: 1.2rem;
  }

  .discussion-subject, .discussion-created {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .discussions-creation {
    font-size: 0.7rem;
  }


</style>