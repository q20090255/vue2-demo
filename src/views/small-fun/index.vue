<template>
  <div class="viewClass myViewClass">
    <p class="title">Loading</p>
    <div class="line" style="width: 200px"></div>
    <el-input class="inputClass" v-model="loadingTime" placeholder="请输入时间/不输也行"></el-input>
    <el-button class="btnClass" plain @click="handleLoading">点一下触发Loading</el-button>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: 'small-fun-list',
    data() {
      return {
        loadingTime: '' // 决定Loading的时长
      }
    },
    methods: {
      // 点击loading按钮
      handleLoading() {
        // 开始啦
        this.$startLoading()
        // 结束啦
        let _time = this.loadingTime != 0 ? this.loadingTime : undefined
        this.$endLoading(this, _time)
      }
    }
  }
</script>

<style scoped lang="scss">
  .myViewClass {
    .title {
    }

    .inputClass,
    .btnClass {
      width: 200px;
      margin: 5px;
      vertical-align: middle;
    }

    .simulateBox {
      width: 200px;
      height: 40px;
      border: 1px solid $light-rock;
      border-radius: 5px;
      margin: 5px;
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      line-height: 40px;
      color: $deep-rock;
      font-size: 16px;
    }
  }
</style>
