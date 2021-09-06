/**
 * meta 可配置参数
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 * @param {boolean} isShow 是否显示
 */

export default [
  // 验证模块
  {
    path: 'verify-tpl',
    name: 'verify-tpl',
    redirect: '/verify-tpl/verify-list',
    component: { render: c => c('router-view') },
    meta: {
      title: '验证模块',
      isShow: true
    },
    children: [
      {
        path: 'verify-list',
        name: 'verify-list',
        component: () => import('@/views/verify-tpl/index.vue'),
        meta: {
          title: '验证列表',
          isShow: true
        }
      },
      {
        path: 'verify-fun1',
        name: 'verify-fun1',
        component: () => import('@/views/verify-tpl/verify-fun1.vue'),
        meta: {
          title: '表单验证',
          isShow: true
        }
      },
      {
        path: 'verify-fun2',
        name: 'verify-fun2',
        component: () => import('@/views/verify-tpl/verify-fun2.vue'),
        meta: {
          title: '手工验证',
          isShow: true
        }
      }
    ]
  },
  // 小方法模块
  {
    path: 'small-fun',
    name: 'small-fun',
    component: () => import('@/views/small-fun/index.vue'),
    meta: {
      title: '小方法模块',
      isShow: true
    }
  },
  // 测试用的模块
  {
    path: 'test-modeule',
    name: 'test-module',
    component: () => import('@/views/test-module/index.vue'),
    meta: {
      title: '测试模块',
      isShow: true
    }
  },
  // 错误模块
  {
    path: '*',
    name: '404_2',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: '404',
      isShow: true
    }
  }
]
