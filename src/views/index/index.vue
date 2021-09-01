<template>
  <div class="viewClass">
    <div class="menuBox clearfix">
      <div
        v-for="(item, index) in routerList"
        :key="index"
        class="menuItem"
        @click="goPage(item)"
        :title="item.meta.title"
      >
        {{ item.meta.title }}
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router/router'

  export default {
    name: 'index',
    data() {
      return {}
    },
    computed: {
      // 路由列表
      routerList() {
        let targetList = router.filter(i => i?.meta?.isTop ?? false)
        return targetList
      }
    },
    watch: {},
    methods: {
      // 路由跳转
      goPage(item) {
        console.log('路由信息', item)
      }
    },
    mounted() {}
  }
</script>

<style scoped lang="scss">
  .menuBox {
    text-align: center;
    padding: 0 10%;

    .menuItem {
      cursor: pointer;
      padding: 5px;
      border-radius: 5px;
      width: 200px;
      line-height: 30px;
      margin: 0 5px 10px;
      float: left;
      border: 1px solid $light-gray;
      background-color: $deep-gray;
      @include ellipsis_multiLine(1);

      &:hover {
        transition: all 0.2s;
        border: 1px solid $deep-gray;
        background-color: $light-gray;
      }
    }
  }
</style>
