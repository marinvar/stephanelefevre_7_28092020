<template>
<div class="d-flex flex-column flex-fill">
  <div>
    <discussion-header>
      <template v-slot:subject>
        <div id="discussionTitle" class="discussion-subject fs-3" v-bind:title="currentDiscussion.subject">
          {{ currentDiscussion.subject }}
        </div>
      </template>
      <template v-slot:created>
        <div  class="discussion-created" v-bind:title="'Par ' + currentDiscussion.User.pseudo + ', le ' + currentDiscussion.created_at">
          Par {{ currentDiscussion.User.pseudo }}, le {{ currentDiscussion.created_at }}
        </div>
      </template>
    </discussion-header>
    <discussion-body >
      <template v-slot:message>
        <img
          class="discussionImage m-2"
          :src="currentDiscussion.imageUrl"
          alt="image envoyée par le rédacteur du message"
          v-if="currentDiscussion.imageUrl !== null"
        />
        <p class="text-start">
          {{ currentDiscussion.message }}
        </p>
      </template>
    </discussion-body >
    <div class="demark mt-5"></div>
    <h2 class="fs-5 mt-2">Commentaires</h2>
    <div v-for="comment in comments" v-bind:key="comment.id" >
      <discussion-comment>
        <template v-slot:message>
          <div class="text-start">
            {{ comment.comment }}
            <div v-if="editComment === true" :value="comment.comment">
              <comment-edit v-bind:initialComment="comment" />
            </div>
          </div>
        </template>
        <template v-slot:created>
          <div  class="comment-created text-end mx-3" v-bind:title="'Par ' + comment.author + ', le ' + comment.created_at">
            Par {{ comment.author }}, le {{ comment.created_at }}
            <button type="button" v-if="pseudo === comment.author" class="mx-1 mb-1 comment-edit" id="editComment" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Editer ce commentaire" title="Editer ce commentaire" @click="commentEdit($event)" >
              Editer <b-icon-pencil-square />
            </button>
            <button type="button" v-if="isAdmin === true || pseudo === comment.author" class="mx-1 mb-1 comment-delete" id="deleteComment" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Supprimer ce commentaire" title="Supprimer ce commentaire" @click="commentDelete(comment.id)" >
              Effacer <b-icon-trash />
            </button>
          </div>
        </template>
      </discussion-comment>
    </div>
  </div>
  <div id="comments-controls" class="mt-auto">
    <div class="mt-3">
      Commentaires par Page:
      <select v-model="pageSize" @change="handlePageSizeChange($event)" title="Nombre de commentaires par page">
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
    <comment-input />
  </div>
</div>
</template>

<script>
import DiscussionHeader from '@/components/DiscussionHeader';
import DiscussionBody from '@/components/DiscussionBody';
import DiscussionComment from '@/components/DiscussionComment';
import CommentInput from '@/components/CommentInput';
import CommentEdit from '@/components/CommentEdit';
import VPagination from 'vue3-pagination';
import "vue3-pagination/dist/vue3-pagination.css";
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import { BIconTrash, BIconPencilSquare } from 'bootstrap-icons-vue';

export default {
  data() {
    return {
      comments: [],
      totalPages: 1,
      discussionId: this.currentDiscussion ? this.currentDiscussion.id : "",
      pseudo: localStorage.getItem('pseudo'),
      page: 1,
      count: 0,
      pageSize: 6,
      pageSizes: [4,6,8,10,12],
    }
  },
  components: {
    "discussion-header": DiscussionHeader,
    "discussion-body": DiscussionBody,
    "discussion-comment": DiscussionComment,
    "comment-input": CommentInput,
    "comment-edit": CommentEdit,
    "v-pagination": VPagination,
    "b-icon-trash": BIconTrash,
    "b-icon-pencil-square": BIconPencilSquare
  },
  computed: {
    ...mapState(['currentDiscussion','addedComment','isAdmin','editComment'])
  },
  created() {
    this.$watch('currentDiscussion', () => {
      this.retrieveComments();
    }),
    this.$watch('addedComment', (newVal) => {
      if (newVal) {
        this.retrieveComments();
        this.updateAddedComment(false);
      }
    })
    this.$watch('editComment', (newVal) => {
      if (!newVal) {
        this.updateEditComment(false);
      }
    })
  },
  methods: {
    getRequestParams(discussionId, page, pageSize) {
      let params = {};
      if (discussionId) {
        params["discussionId"] = discussionId;
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
      .catch((error) => {
        if (error.response.status === 401) {
            this.identify401(error);
          } else {
            console.log(error);
          }
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
    commentDelete (id) {
      let params = {};
      params ["id"] = id; 
      axios.delete('http://localhost:3000/api/comment/deleteComment', { params })
      .then(() => {
        this.updateAddedComment(true);
      })
      .catch((error) => {
        if (error.response.status === 401) {
            this.identify401(error);
          } else {
            console.log(error);
          }
      });
    },
    commentEdit () {
      this.updateEditComment(true);
    },
    ...mapActions(['updateAddedComment','identify401','updateEditComment'])
    
  }
}

</script>

<style lang="scss">
p {
  word-break: break-word;
  margin: 1rem;
}

.discussionImage {
  max-width: 50vw;
  max-height: 10rem;
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
      fill: #333333;
    }
  }    
}

#discussionTitle {
  color: #D1515A;
}

.comment-delete, .comment-edit {
  color: white;
  font-size: 1rem;
  padding: 0.2rem;
  border-radius: 0.3rem;
}
.comment-delete {
  background-color: #D1515A;
}

.comment-edit {
  background-color: #198754;

}

</style>