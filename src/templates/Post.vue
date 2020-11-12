<template>
  <Layout>
    <div class="section">
      <div class="has-text-centered container">
        {{new Date($page.post.date).toDateString()}} - {{$page.post.title}}
      </div>
      <br>
      <b-carousel v-model="photoIndex" :autoplay="false" :indicator-inside="false" indicator-style="is-lines" icon-size="is-large">
        <b-carousel-item v-for="(photo, i) in $page.post.photos" :key="i">
          <div class="image is-16by9">
            <g-image :src="photo.photourl" />
          </div>
          <div class="has-text-centered">{{photo.photocaption}}</div>
        </b-carousel-item>
      </b-carousel>
      <br>
      <div class="container is-max-desktop" v-html="$page.post.content"></div>
    </div>
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
      date
      photos {
        photourl
        photocaption
      }
      content
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Post'
  },
  data() {
    return {
      photoIndex: 0
    }
  },
  mounted() {
  	document.addEventListener('keydown', this.keyEvent);
  },
  destroyed() {
  	document.removeEventListener('keydown', this.keyEvent);
  },
  methods: {
    keyEvent(e) {
      let l = this.$page.post.photos.length
      if (e.key === 'ArrowRight') {
        this.photoIndex = (this.photoIndex + 1) % l
        return
      }
      if (e.key === 'ArrowLeft') {
        this.photoIndex = (this.photoIndex + (l - 1)) % l
        return
      }
    }
  }
}
</script>
