import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL
  routes
})

// 登录页面路由
const LOGIN_PAGE_NAME = 'login'
const INDEX_PAGE_NAME = 'index'

// 路有守卫 跳转前
router.beforeEach((to, from, next) => {
  next()

  const token = true
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 没登录，跳转的页面不是登陆页 -> 跳转到登陆页
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    //  没登录，跳转到登陆页
    next()
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录，还想去登陆页
    next({
      name: INDEX_PAGE_NAME
    })
  } else {
    if (token) {
      next()
    } else {
      next({ name: LOGIN_PAGE_NAME })
    }
  }
})

// 路由守卫 跳转后
router.afterEach((to, from) => {
  //
})

export default router
