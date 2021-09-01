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
  {
    path: '/test1',
    name: 'test1',
    // component: () => import('@/views/verify-tpl/index.vue'),
    meta: {
      title: '测试1',
      isTop: true
    }
  },
  {
    path: '/test2',
    name: 'test2',
    // component: () => import('@/views/verify-tpl/index.vue'),
    meta: {
      title: '测试2',
      isTop: true
    }
  },
  {
    path: '/test3',
    name: 'test3',
    // component: () => import('@/views/verify-tpl/index.vue'),
    meta: {
      title:
        '测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3测试3',
      isTop: true
    }
  },
  {
    path: '/test4',
    name: 'test4',
    // component: () => import('@/views/verify-tpl/index.vue'),
    meta: {
      title: '测试4测试4测试4测试4测试4测试4测试4测试4测试4',
      isTop: true
    }
  },
  {
    path: '/test5',
    name: 'test5',
    // component: () => import('@/views/verify-tpl/index.vue'),
    meta: {
      title: '测试5',
      isTop: true
    }
  }
]

export default router
