<template>
  <Layout>
    <div class="container">
      <div class="columns is-multiline is-centered">
        <div class="column is-half" v-for="item in $page.allPost.edges">
          <div class="image is-square">
            <g-image :src="item.node.thumbnail" />
          </div>
          {{item.node.title}}
        </div>
        <div class="column is-half" v-for="item in $page.allPost.edges">
          <div class="image is-square">
            <g-image :src="item.node.thumbnail" />
          </div>
          {{item.node.title}}
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
