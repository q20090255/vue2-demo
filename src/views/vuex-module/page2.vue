<template>
  <div class="viewClass myViewClass">
    <p>辅助函数引入；{{ moduleName3 }}</p>
    <div>
      <p>getters; {{ getSum1 }}</p>
      <p>getters传参; {{ getOutParams2('我穿个参数入来') }}</p>
    </div>
    <el-button class="btnClass" @click="addAge1">加一下年龄</el-button>
    <el-button class="btnClass" @click="handleClick2">改一手数据</el-button>
    <div class="line"></div>
    <p>到Action啦</p>
    <el-button class="btnClass" @click="handleClick3(1)">changeModuleA1</el-button>
    <el-button class="btnClass" @click="handleClick3(2)">changeModuleA2</el-button>
    <el-button class="btnClass" @click="handleClick3(3)">changeModuleB1</el-button>
    <el-button class="btnClass" @click="handleClick3(4)">changeModuleA3</el-button>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'vuex-module-page2',
    data() {
      return {
        pageName: 'vuex-module-page2'
      }
    },
    computed: {
      ...mapState({
        // 箭头函数可使代码更简练
        moduleName1: state => state.userModule.moduleName,

        // 传字符串参数 'count' 等同于 `state => state.count` || 分了模块的话这个东西引用起来就不好操作了
        // moduleName2: 'userModule',

        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
        moduleName3(state) {
          return state.userModule.moduleName + '---' + this.pageName
        }
      }),
      ...mapGetters({
        // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
        getSum1: 'getSum',
        getOutParams2: 'getOutParams'
      })
    },
    methods: {
      ...mapMutations({
        addAge1: 'addAge',
        setUserInfo1: 'setUserInfo'
      }),
      ...mapActions({
        asyncSetpartA1: 'asyncSetpartA',
        asyncSetPartB1: 'asyncSetPartB',
        changeData1: 'changeData',
        asyncSetChange2A: 'asyncSetChange2'
      }),
      handleClick2() {
        let params = {
          nowTime: new Date(),
          ceshi: '哈哈哈哈哈'
        }
        this.setUserInfo1(params)
      },
      handleClick3(key) {
        if (key == 1) {
          this.asyncSetpartA1(999)
        } else if (key == 2) {
          this.asyncSetPartB1({
            info: '1000',
            time: 2000
          })
        } else if (key == 3) {
          this.changeData1()
        } else if (key == 4) {
          this.asyncSetChange2A()
            .then(res => {
              console.log('外 成功了', res)
            })
            .catch(err => {
              console.log('外 失败了', err)
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
    border: 1px solid $deep-green;
  }
</style>
