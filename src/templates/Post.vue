<template>
  <Layout>
    <div class="has-text-centered container">
      {{$page.post.title}}
    </div>
    <b-carousel :autoplay="false" :indicator-inside="false" indicator-style="is-lines">
      <b-carousel-item v-for="(photo, i) in $page.post.photos" :key="i">
        <div class="image is-16by9">
          <g-image :src="photo.photourl" />
        </div>
        <div class="has-text-centered">{{photo.photocaption}}</div>
      </b-carousel-item>
    </b-carousel>
  </Layout>
</template>

<style lang="scss" scoped>
  .image img {
    object-fit: contain;
  }
</style>

<page-query>
  query Post ($path: String!) {
    post: post (path: $path) {
      title
      photos {
        photourl
        photocaption
      }
    }
  }
</page-query>
