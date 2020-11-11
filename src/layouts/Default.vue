<template>
  <div>
    <div class="top">
      <div class="top-item">
        <g-link to="/">
          <g-image style="max-height: 64px;" src="~/assets/svgs/logo.svg" alt="Logo" />
        </g-link>
        <div class="has-text-centered">PHOTOBLOG</div>
      </div>
      <g-link class="top-item"  to="/">
        I
      </g-link>
    </div>
    <transition name="fade" appear>
      <section class="section">
        <slot />
      </section>
    </transition>
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

  img svg {
    fill: red;
  }

</style>
