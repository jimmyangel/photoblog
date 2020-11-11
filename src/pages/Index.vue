<template>
  <Layout>
    <div class="container">
      <div class="columns is-multiline is-centered">
        <div class="column is-half" v-for="item in $page.allPost.edges">
          <g-link :to="item.node.path">
            <div class="image is-square">
              <g-image :src="item.node.thumbnail" />
            </div>
            <div class="has-text-centered">{{new Date(item.node.date).toDateString()}} - {{item.node.title}}</div>
          </g-link>
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
    -webkit-transform: scale(1.1);
  	transform: scale(1.1);
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
          thumbnail
          path
        }
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Photoblog'
  }
}
</script>

<style>
  .home-links a {
    margin-right: 1rem;
  }
</style>
