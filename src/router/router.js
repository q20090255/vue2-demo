/**
 * meta 可配置参数
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 * @param {boolean} isTop 是否放在首页
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
  },
  // 验证模块
  {
    path: '/verify-tpl',
    name: 'verify-tpl',
    component: () => import('@/views/verify-tpl/index.vue'),
    meta: {
      title: '验证模块',
      isTop: true
    }
  },
  // 测试用的模块
  {
    path: '/test-modeule',
    name: 'test-module',
    component: () => import('@/views/test-module/index.vue'),
    meta: {
      title: '测试模块',
      isTop: true
    }
  }
]

export default router
