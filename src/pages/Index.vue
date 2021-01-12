<template>
  <Layout>
    <div class="section">
      <div class="container">
        <div style="width: 220px;" class="columns is-mobile search-icon">
          <a class="column is-narrow" href="" aria-label="Search" @click="openSearchModal()">
            <font-awesome :icon="['fas', 'search']" />
          </a>
        </div>
        <div class="columns is-multiline is-centered">
          <div class="column is-one-third" v-for="item in loadedPosts" :key="item.id" :item="item">
            <g-link :to="item.node.path">
              <figure>
                <div class="image is-square">
                  <g-image :src="item.node.thumbnail" :alt="item.node.title" />
                </div>
                <figcaption class="has-text-centered">
                  {{item.node.title}}<br>
                  <small>{{new Date(item.node.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}}</small>
                </figcaption>
              </figure>
            </g-link>
          </div>
          <ClientOnly>
            <infinite-loading @infinite="infiniteHandler">
              <div slot="spinner"></div>
              <div slot="no-more"></div>
              <div slot="no-results"></div>
            </infinite-loading>
          </ClientOnly>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
  .image img {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
  }

  .image:hover img {
    -webkit-transform: scale(1.05);
  	transform: scale(1.05);
  }

  .image {
    overflow: hidden;
  }

</style>

<page-query>
  query ($page: Int) {
    allPost: allPost (sortBy: "date", order: DESC, perPage: 9, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          title
          date
          thumbnail (width: 800, height: 800, quality: 90)
          path
        }
      }
    }
  }
</page-query>

<script>
  import SearchModal from '~/components/SearchModal'

  export default {
    metaInfo: {
      title: 'Photoblog'
    },
    data() {
      return {
        loadedPosts: [],
        currentPage: 1
      }
    },
    created() {
      this.loadedPosts.push(...this.$page.allPost.edges)
    },
    methods: {
      openSearchModal() {
        this.$buefy.modal.open({
          parent: this,
          hasModalCard: true,
          component: SearchModal
        })
      },
      async infiniteHandler($state) {
        if (this.currentPage + 1 > this.$page.allPost.pageInfo.totalPages) {
          $state.complete()
        } else {
          const { data } = await this.$fetch(
            `/${this.currentPage + 1}`
          )
          if (data.allPost.edges.length) {
            this.currentPage = data.allPost.pageInfo.currentPage
            this.loadedPosts.push(...data.allPost.edges)
            $state.loaded()
          } else {
            $state.complete()
          }
        }
      }
    },
    computed: {
      pageTitle() {
        return "Hilde's Photoblog"
      },
      pageImage() {
        return this.$page.allPost.edges.length ? this.$page.allPost.edges[0].node.thumbnail.src : ''
      }
    }
  }
</script>
