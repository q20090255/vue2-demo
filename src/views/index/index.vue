<template>
  <div class="contentBox">
    <my-menu></my-menu>
    <!-- 路由 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
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
  .contentBox {
  }
</style>
