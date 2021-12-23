import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './module/moduleA'
import moduleB from './module/moduleB'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    testModule: moduleA,
    userModule: moduleB
  }
})

/**
 * MARK
 * 1. state分了模块没问题。剩下的几mutations,actions,getters;命名的时候最好还是加上模块名字，不容易混淆
 */

/**
 *  vuex 若非必要，不建议使用
 *  1. 状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
 *  2. store 中的状态改变的时候不能被vue中的data监听到
 *  3. Vuex中store数据改变的唯一方法就是mutation
 *  4. Action可以异步，Action 提交的是 mutation，而不是直接变更状态。
 *
 *  state 可以使用 mapState 在任意组件的computed中声明需要使用的数据
 *    ...mapState([  // 数组
 *      "userinfo",  // 如果使用同名引用，必须保证在state中此名字唯一
 *      "userList"
 *     ])
 *  或者
 *    ...mapStae({  // 对象
 *      depList: state => {   // 允许自定义名字，指向具体某个模块下的共享值
 *        return state.test.departmentList
 *      }
 *    })
 *    this.$store.state.userinfo // 单独引用
 *
 *  // mutations的调用方式唯一， 没有指定type的默认就是方法名
 *  // 第二个参数为方法所需参数, 如果需要多个参数，commit第二个参数就位一个对象，存放所有参数
 *  this.$store.commit("setCountPartB", info);
 *  作为对象提交
 *    this.$store.commit({
 *      type: "setCountPartB",
 *      info: info
 *    })
 *  // 使用 mapMutations 快速集成方法，一般在 methods 中声明使用
 *  ...mapMutations([
 *    "setUserInfo",
 *    "setDepartmentInfo"
 *  ])
 *  或者
 *  ...mapMutations({
 *    setA: "setCountPartA",
 *    setB: "setCountPartB"
 *  })
 *
 *  getters 可以使用 mapGetters 在任意组件的computed中声明使用
 *    ...mapGetters({
 *      getAdult: "getAdultUser"  // 这是对象
 *    })
 *  或者
 *    ...mapGetters([
 *      "getOlderUser" // 这是数组
 *    ])
 *    this.$store.getters.getBabyUser // 单独调用getter时不会创建缓存
 *    this.$store.getters.getAdultBySex("man") // 获取所有男性成年用户
 */
