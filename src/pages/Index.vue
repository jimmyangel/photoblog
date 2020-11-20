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
          <div class="column is-one-third" v-for="item in $page.allPost.edges">
            <g-link :to="item.node.path">
              <figure>
                <div class="image is-square">
                  <g-image :src="item.node.thumbnail" alt="" />
                </div>
                <figcaption class="has-text-centered">{{new Date(item.node.date).toDateString()}} - {{item.node.title}}</figcaption>
              </figure>
            </g-link>
          </div>
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
  query {
    allPost: allPost (sortBy: "date", order: DESC) {
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
    methods: {
      openSearchModal() {
        this.$buefy.modal.open({
          parent: this,
          hasModalCard: true,
          component: SearchModal
        })
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
