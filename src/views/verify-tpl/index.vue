<template>
  <div class="viewClass my-view">
    <p class="title">本来想放个列表在这里，但是好像有点多余，不放了</p>
  </div>
</template>

<script>
  export default {
    name: 'verify-tpl',
    data() {
      return {
        radio: 1
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .my-view {
    position: relative;
    .title {
      color: $light-indigo;
      text-align: center;
      @include all_middle;
    }
  }
</style>
