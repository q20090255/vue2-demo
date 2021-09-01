import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 重置基础样式
import '@/assets/css/base.css'

// 引入功能模块
// import "@/utils/element-module"
// import "@/utils/iview-module"

// 引入公用方法
import common from '@/utils/common'

Vue.prototype.$com = common

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
