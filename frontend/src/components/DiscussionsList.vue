<template>
  <div id="discussionsTab" class="d-flex flex-column flex-fill">
    <h2>Discussions</h2>
    <div v-for="discussion in discussions" v-bind:key="discussion.id" class="discussion my-1 mx-3" @click="selectDiscussion(discussion)">
      <discussion-header>
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
      </discussion-header>
    </div>
    <div id="discussions-controls" class="mt-auto">
      <div class="mt-3">
        Discussions par Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)" title="Nombre de discussions par page">
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
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import VPagination from '@/vendors/vue3-pagination';
  import "@/vendors/vue3-pagination/dist/vue3-pagination.css";
  import axios from 'axios';

  import DiscussionHeader from '@/components/DiscussionHeader.vue';

  export default {
    data() {
      return {
        discussions: [],
        totalPages: 1,
        page: 1,
        count: 0,
        pageSize: 6,
        pageSizes: [4,6,8,10]
      }
    },
    created() {
      this.$watch('discussionsFilter', () => {
        this.retrieveDiscussions();
      }),
      this.$watch('addedDiscussion', (newVal) => {
        if (newVal) {
          this.retrieveDiscussions();
          this.updateAddedDiscussion(false);
        }
      })
    },
    computed: {
      ...mapState([ 'currentDiscussion','discussionsFilter','addedDiscussion' ])
    },
    methods: {
      selectDiscussion (discussion) {
        this.setCurrentDiscussion(discussion);
      },
      getRequestParams(discussionsFilter, page, pageSize) {
        let params = {};
        if (discussionsFilter) {
          params["filter"] = discussionsFilter
        }
        if (page) {
          params["page"] = page - 1;
        }
        if (pageSize) {
          params["size"] = pageSize;
        }
        return params;
      },
      retrieveDiscussions () {
        const params = this.getRequestParams(
          Object.values({...this.discussionsFilter}),
          this.page,
          this.pageSize
        );
        const filteredAddress = 'http://localhost:3000/api/discussion/getDiscussionsFiltered';
        const nonFilteredAddress = 'http://localhost:3000/api/discussion/getDiscussions';
        if (params.filter.length > 0) {
          axios.get(filteredAddress, { params })
          .then((response) => {
            const { discussions, totalItems, totalPages } = response.data;
            this.totalPages = totalPages;
            this.discussions = discussions;
            this.count = totalItems;
          })
          .catch((error) => {
            if (error.response.status === 401) {
            this.identify401(error);
          } else {
            console.log(error);
          }
          });
        } else {
          axios.get(nonFilteredAddress, { params })
          .then((response) => {
            const { discussions, totalItems, totalPages } = response.data;
            this.totalPages = totalPages;
            this.discussions = discussions;
            this.count = totalItems;
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.identify401(error);
            } else {
              console.log(error);
            }
          });
        }
      },
      handlePageChange (value) {
        this.page = value;
        this.retrieveDiscussions();
      },
      handlePageSizeChange(event) {
        this.pageSize = parseInt(event.target.value);
        this.page = 1;
        this.retrieveDiscussions();
      },
      ...mapActions(['setCurrentDiscussion','updateAddedDiscussion','identify401'])
    },
    beforeMount() {
      this.retrieveDiscussions();
    },
    components: {
      "discussion-header": DiscussionHeader,
      "v-pagination": VPagination
    }
  }
</script>

<style lang="scss">

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

  #discussionsPanel {
    #discussionsTab {
      pointer-events: none;
      opacity: 0;
      overflow: hidden;
      flex-wrap: wrap;
      transition: 0.4s;
    }
    &.expanded {
      #discussionsTab {
        pointer-events: unset;
        opacity: 1;
      }
      .discussion {
        cursor: pointer;
      }
    }
  }

@media (max-width: 767px) {
  #discussionsPanel {
    #discussionsTab {
        pointer-events: unset;
        opacity: 1;
      }
      .discussion {
        cursor: pointer;
      }
  }
}

</style>