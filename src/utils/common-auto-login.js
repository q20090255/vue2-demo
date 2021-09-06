import Vue from 'vue'
import { Loading } from 'element-ui'

/**
 * @Description 再分一类自动注册的？
 */

let loadingInstance = null

let comm = {
  // 包一下ele的全局Loading服务
  // @param {string} fullscreen 是否插进body
  startLoading: option => {
    let options = {
      text: option?.text ?? '搏命加载梗....',
      background: 'rgba(255,255,255,0.8)',
      lock: true,
      fullscreen: option?.fullscreen ?? true
    }
    loadingInstance = Loading.service(options)
  },
  endLoading: (self, _time = 2000) => {
    self.$nextTick(() => {
      setTimeout(() => {
        if (loadingInstance) loadingInstance.close()
      }, Number(_time))
    })
  }
}

const install = () => {
  Object.keys(comm).forEach(key => {
    Vue.prototype[`$${key}`] = comm[key]
  })
}

export default install
