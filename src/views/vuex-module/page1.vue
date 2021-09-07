<template>
  <div class="viewClass myViewClass">
    <p>传统方法引入；{{ moduleName }}</p>
    <div>
      <p>getters; {{ getSum }}</p>
      <p>getters传参; {{ getOutParams2 }}</p>
    </div>
    <el-button class="btnClass" @click="handleClick">加一下年龄</el-button>
    <el-button class="btnClass" @click="handleClick2">改一手数据</el-button>
    <div class="line"></div>
    <p>到Action啦</p>
    <el-button class="btnClass" @click="handleClick3(1)">changeModuleA1</el-button>
    <el-button class="btnClass" @click="handleClick3(2)">changeModuleA2</el-button>
  </div>
</template>

<script>
  export default {
    name: 'vuex-module-page1',
    data() {
      return {}
    },
    computed: {
      // state
      moduleName() {
        return this.$store.state.testModule.moduleName
      },
      // getter
      getSum() {
        return this.$store.getters.getSum
      },
      getOutParams2() {
        return this.$store.getters.getOutParams('外面传了个参数进来')
      }
    },
    methods: {
      handleClick() {
        this.$store.commit('addAge')
      },
      handleClick2() {
        let params = {
          nowTime: new Date(),
          ceshi: '哈哈哈哈哈'
        }
        this.$store.commit('setUserInfo', params)
      },
      handleClick3(key) {
        if (key == 1) {
          this.$store.dispatch('asyncSetpartA', 999)
        } else if (key == 2) {
          this.$store.dispatch('asyncSetPartB', {
            info: '1000',
            time: 2000
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .myViewClass {
    border-radius: 10px;
    min-height: 200px;
    border: 1px solid $deep-blue;
  }
</style>
