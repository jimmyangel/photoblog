<template>
  <div>
    <div class="top">
      <div class="top-item">
        <g-link to="/">
          <Logo />
          <div class="has-text-centered has-text-weight-medium">PHOTOBLOG</div>
        </g-link>
      </div>
      <g-link class="top-item icon-link"  to="/about">
        <font-awesome :icon="['fas', 'info']"/>
      </g-link>
      <a class="icon-link" href="/rss.xml">
        <font-awesome :icon="['fas', 'rss']"/>
      </a>
    </div>
    <transition name="fade" appear>
      <section>
        <slot />
      </section>
    </transition>
    <section>
      <footer class="footer">
        <div class="has-text-centered is-size-7">
          Copyright © 2020 <a href="https://hildemorin.com">Hilde Morin</a>
        </div>
      </footer>
    </section>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteUrl
    twitterId
    keywords
  }
}
</static-query>

<style>
  .top {
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }

  .top-item {
    margin-left: auto;
  }

  .icon-link {
    padding: 5px;
  }

  img svg {
    fill: red;
  }

</style>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    metaInfo() {
      return {
        meta: [
          {
            property: 'og:title',
            content: this.$parent.pageTitle
          },
          {
            property: 'keywords',
            content: this.$static.metadata.keywords
          },
          {
            property: 'og:image',
            content: this.$parent.pageImage
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            name: 'twitter:site',
            content: this.$static.metadata.twitterId
          },
          {
            name: 'twitter:creator',
            content: this.$static.metadata.twitterId
          },
          {
            name: 'twitter:title',
            content: this.$parent.pageTitle
          },
          {
            name: 'twitter:image',
            content: this.$parent.pageImage
          }
        ]
      }
    },
    components: {
      Logo
    }
  }

</script>
