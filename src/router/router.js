import module_router from './module-router'

const router = [
  {
    path: '/',
    redirect: '/vue-demo'
  },
  {
    // 首页
    path: '/vue-demo',
    name: 'vue-demo',
    component: () => import('@/views/index/index.vue'),
    meta: {
      keepAlive: false,
      title: '首页'
    },
    children: module_router
  },
  // 错误模块
  {
    path: '*',
    name: '404_1',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404',
      isShow: true
    }
  }
]

export default router
