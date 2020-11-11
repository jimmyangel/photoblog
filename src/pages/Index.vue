<template>
  <Layout>
    <div class="container">
      <div class="columns is-multiline is-centered">
        <div class="column is-half" v-for="item in $page.allPost.edges">
          <g-link :to="item.node.path">
            <div class="image is-square">
              <g-image :src="item.node.thumbnail" />
            </div>
            {{item.node.title}}
          </g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

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
