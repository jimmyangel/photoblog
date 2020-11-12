<template>
  <Layout>
    <br>
    <g-image class="banner" :src="$page.about.banner"></g-image>
    <div class="section">
      <div class="container">
        <h1>{{$page.about.title}}</h1>
        <div v-html="$page.about.content"></div>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
  ::v-deep .banner {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 600px) {
    ::v-deep .banner {
      height: 150px;
    }
  }

</style>

<page-query>
  query About {
    about: about (id: "about") {
      title
      banner
      content
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'About'
  }
}
</script>
