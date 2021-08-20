/**
 * meta 可配置参数
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

const router = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    // 首页
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index.vue'),
    meta: {
      keepAlive: false,
      title: '首页'
    }
  }
  // {
  //   // 登陆页
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/views/login/login.vue'),
  //   meta: {
  //     keepAlive: true,
  //     title: 'login'
  //   }
  // },
]

export default router
