import axios from 'axios'
import { getToken } from '@utils/commonFun'
import router from '@/router'

const HOST_TYPE = process.env.NODE_ENV
let BASE_URL = ''
let serverErr = {
  400: '错误请求',
  401: '未登录，请重新登陆',
  403: '拒绝访问',
  404: '请求唔错，未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  500: '服务器出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
  '': '连接错误'
} // 服务器错误响应
let cancelToken = axios.cancelToken // 取消接口请求工厂
let pending = [] // 存储每个请求的axios标记以及取消函数

// 截断重复发送的请求
let removePending = (config, doCancel = 'true') => {
  for (let p in pending) {
    let axiosMark = createAxiosMark(config)
    if (pending[p].u === axiosMark) {
      if (doCancel) pending[p].c()
      pending.splice(p, 1)
    }
  }
}
// 请求标识生成
let createAxiosMark = config => {
  let markStr = config.method
  if (config.method === 'get') {
    markStr += config.url + JSON.stringify(config.params)
  } else if (config.method === 'post') {
    markStr += config.url + JSON.stringify(config.data)
  }
  return markStr
}
// 错误处理
let errorHandle = message => {
  // TODO: 错误处理
  console.log('---请求出错---', message, '---请求出错---')
}

// MARK: BASE_URL 生成
switch (HOST_TYPE) {
  case 'development':
    BASE_URL = 'http://localhost:9000'
    break
  case 'production':
    BASE_URL = 'http://localhost:9000/'
    break
  default:
    // 一级域名axios自动补全 | location.origin
    BASE_URL = '/'
}

axios.create({
  // crossDomain:true, // 设置跨域
  // withCredentials: true, // 跨域是否允许携带token
  baseUrl: BASE_URL, //
  time: 1000 * 60 // 超时
})

// 请求拦截
axios.interceptors.request.use(
  config => {
    // 请求头携带token
    // let token = getToken()
    // config.headers.Authorization = 'MyToken ' + token

    // 截断重复发送的请求
    removePending(config)

    // 添加axios标记以及取消函数
    config.cancelToken = new cancelToken(c => {
      // 添加标记
      let axiosMark = createAxiosMark(config)
      pending.push({ u: axiosMark, c: c })
    })

    return config
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    // 响应之后从pending中移除
    removePending(response.config, false)

    //根据项目情况自行判断
    // if(response.data.errCode ==2){
    //   router.push({
    //     path:"/login",
    //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    //   })
    // }

    return response
  },
  error => {
    let { response } = error
    if (response) {
      // 服务器有响应
      let errMsg = serverErr[response.status || '']
      errorHandle(errMsg)
      return false
    } else {
      // 服务器冇响应 可能断网或者服务器炸了
      if (!window.navigator.onLine) {
        // 断网了
        errorHandle('网络中断')
      } else {
        // 服务器炸了
        errorHandle('服务器崩溃啦o(≧口≦)o')
        return Promise.reject(error)
      }
    }
  }
)

/**
 * @params {String} url 接口地址
 * @params {Object} data 接口参数
 * @params {Object} option axios参数
 */
export function get(url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: data }, option)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url, data = {}, option = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, option)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default { BASE_URL }
