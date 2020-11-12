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
      <g-link class="icon-link" to="/">
        <font-awesome :icon="['fas', 'rss']"/>
      </g-link>
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
    components: {
      Logo
    }
  }

</script>
