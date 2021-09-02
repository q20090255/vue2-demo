<template>
  <div class="viewClass my-view">
    <h3 class="title">验证用的模块</h3>
    <div class="line"></div>
    <el-button plain>表单验证</el-button>
    <el-button plain>手打验证</el-button>
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
    .title {
      text-align: center;
    }

    .line {
      border: 1px solid $deep-rock;
      margin: 5px 0;
    }
  }
</style>
