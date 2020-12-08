<template>
  <div>
    <div class="top">
      <g-link to="/">
        <Logo />
        <div class="has-text-centered" style="font-family: 'Syncopate'; font-weight: 600;">PHOTOBLOG</div>
      </g-link>
      <div class="icon-container">
        <g-link class="icon-link" aria-label="About" to="/about">
          <font-awesome :icon="['fas', 'info']"/>
        </g-link>
        <a class="icon-link" aria-label="RSS" href="/rss.xml">
          <font-awesome :icon="['fas', 'rss']"/>
        </a>
      </div>
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

<style lang="scss" scoped>
  .top {
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }

  .icon-container {
    position: absolute;
    top: 20px;
    right: 0px;
  }

  .icon-link {
    padding: 5px;
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
