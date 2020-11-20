<template>
  <div class="modal-card search-card">
    <div class="modal-card-body">
      <header class="search-card-header">
        <div class="search-input control has-icons-left">
          <input class="input" v-model="searchString" placeholder="Search" ref="search">
          <span class="icon is-left">
            <font-awesome :icon="['fas', 'search']"/>
          </span>
        </div>
        <button style="margin-left: 10px;" type="button" class="delete" @click="$emit('close')" />
      </header>
      <section>
        <br>
        <div class="panel" @click="$emit('close')">
          <g-link
            v-for="item in $static.allPost.edges" v-bind:key="item.path"
            :to="item.node.path"
            v-bind:class="matchClass(item.node.title)"
            class="panel-block">
              {{new Date(item.node.date).toDateString()}} - {{item.node.title}}
          </g-link>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .modal-card-body {
    color: black;
  }

  .panel-block:hover {
    color: black;
  }

  .search-card {
    max-height: 75vh;
  }

  .search-card-header {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }

  .search-input {
    width: 100%
  }

</style>

<static-query>
  query {
    allPost: allPost (sortBy: "date", order: DESC) {
      edges {
        node {
          title
          date
          path
        }
      }
    }
  }
</static-query>

<script>
  import {getPureText} from '~/utils/misc'

  export default {
    name: 'SearchModal',
    data() {
      return {
        searchString: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    methods: {
      matchClass(value) {
        if (getPureText(value).includes(getPureText(this.searchString))) return ''
        return 'is-hidden'
      }
    }
  }
</script>
