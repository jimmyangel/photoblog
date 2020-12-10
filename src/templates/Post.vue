<template>
  <Layout>
    <div class="section">
      <div class="has-text-centered container">
        {{$page.post.title}}<br>
        <small>{{new Date($page.post.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}}</small>
      </div>
      <br>
      <b-carousel
          v-model="photoIndex"
          :arrow="$page.post.photos.length > 1"
          :indicator="$page.post.photos.length > 1"
          :autoplay="false" :indicator-inside="false"
          indicator-style="is-lines"
          icon-size="is-large">
        <b-carousel-item v-for="(photo, i) in $page.post.photos" :key="i">
          <figure>
            <div class="image is-16by9">
              <g-image :src="photo.photourl" :alt="photo.photocaption" />
            </div>
            <br>
            <figcaption class="has-text-centered is-size-5">{{photo.photocaption}}</figcaption>
          </figure>
        </b-carousel-item>
      </b-carousel>
      <br>
      <div class="content" v-html="$page.post.content"></div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped>
  .image img {
    object-fit: contain;
  }

  @media only screen and (min-width: 1200px) {
    .section {
      padding: 3rem 5rem
    }
  }

  @media only screen and (max-width: 768px) {
    .section {
      padding: 3rem 0rem
    }
  }

  .content {
    padding-left: 2rem;
    padding-right: 2rem;
  }

</style>

<page-query>
  query Post ($path: String!) {
    post: post (path: $path) {
      title
      date
      thumbnail
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
  },
  computed: {
    pageTitle() {
      return this.$page.post.title
    },
    pageImage() {
      return this.$page.post.thumbnail.src
    }
  }
}
</script>
