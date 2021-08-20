import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 公共样式
import '@/assets/css/index.scss'
// 引入功能模块
// import "@/utils/elementModule"
// import "@/utils/iviewModule"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
