<template>
  <div class="bigBox">
    <div class="menuOutBox">
      <div class="menuInBox">
        <my-menu></my-menu>
      </div>
    </div>
    <div class="contentOutBox">
      <div class="contentInBox">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>

<script>
  import myMenu from './menu'

  export default {
    name: 'index',
    components: {
      myMenu
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    methods: {},
    mounted() {}
  }
</script>

<style scoped lang="scss">
  .bigBox {
    display: flex;
  }

  .menuOutBox {
    @include beauty_scroll;
    overflow-x: hidden;
    overflow-y: auto;
    border-right: 1px solid $deep-gray;
    box-shadow: rgba(0, 0, 0, 0.15) 2px 0 2.5px;
    min-width: 220px;

    .menuInBox {
      height: 100vh;
    }
  }

  .contentOutBox {
    overflow: auto;
    flex: 1;

    .contentInBox {
      width: 100%;
      height: 100%;
      min-width: 800px;
    }
  }
</style>
