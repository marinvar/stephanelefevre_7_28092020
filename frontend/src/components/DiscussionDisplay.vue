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
  <div id="comments-controls" class="mt-auto">
    <div class="mt-3">
      Commentaires par Page:
      <select v-model="pageSize" @change="handlePageSizeChange($event)">
        <option v-for="size in pageSizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>
    <v-pagination
      v-model="page"
      :pages="totalPages"
      :range-size="2"
      active-color="#D1515A"
      @update:modelValue="handlePageChange"
    />
    <CommentInput />
  </div>
</div>
</template>

<script>
import DiscussionHeader from '@/components/DiscussionHeader';
import DiscussionBody from '@/components/DiscussionBody';
import DiscussionComment from '@/components/DiscussionComment';
import CommentInput from '@/components/CommentInput';
import VPagination from 'vue3-pagination';
import "vue3-pagination/dist/vue3-pagination.css";
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      comments: [],
      totalPages: 1,
      discussionId: this.currentDiscussion ? this.currentDiscussion.id : "",
      page: 1,
      count: 0,
      pageSize: 5,
      pageSizes: [3,5,8,10]
    }
  },
  components: {
    DiscussionHeader,
    DiscussionBody,
    DiscussionComment,
    CommentInput,
    VPagination
  },
  computed: {
    ...mapState(['currentDiscussion','addedComments'])
  },
  created() {
    this.$watch('currentDiscussion', () => {
      this.retrieveComments();
    }),
    this.$watch('addedComments', (newVal) => {
      if (newVal) {
        this.retrieveComments();
        this.updateAddedComments(false);
      }
    })
  },
  methods: {
    getRequestParams(discussionId, page, pageSize) {
      let params = {};
      if (discussionId) {
        params["discussionId"] = discussionId
      }
      if (page) {
        params["page"] = page - 1;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    retrieveComments () {
      const params = this.getRequestParams(
        this.currentDiscussion.id,
        this.page,
        this.pageSize
      );
      axios.get('http://localhost:3000/api/comment/getComments', { params })
      .then((response) => {
        const { comments, totalItems, totalPages } = response.data;
        this.totalPages = totalPages;
        this.comments = comments;
        this.count = totalItems;
      })
      .catch((e) => {
        console.log(e);
      });
    },
    handlePageChange (value) {
      this.page = value;
      this.retrieveComments();
    },
    handlePageSizeChange(event) {
      this.pageSize = parseInt(event.target.value);
      this.page = 1;
      this.retrieveComments();
    },
    ...mapActions(['updateAddedComments'])
    
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

.Pagination {
  justify-content: center;
  margin-bottom: 1rem;
  .Page {
    color: white;
  }
}

#discussionsPanel {
  .Pagination {
    justify-content: center;
    margin-bottom: 1rem;
    .Page {
      color: white;
    }
    .Control {
      fill: #666666;
      &.Control-active {
        fill: white;
      }
    }      
  }
}


#comments-controls {
  background-color: #D4D4D4;
  button.Page {
    color: #333333;
    &.Page-active {
      color: white;
    }
  }
  .Control {
    fill: #888888;
    &.Control-active {
      fill: 333333;
    }
  }    
}

</style>