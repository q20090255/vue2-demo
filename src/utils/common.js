import Cookies from 'js-cookie'
import Vue from 'vue'

/**
 * @Description 存取token
 * @param {string} token
 */
const TOKEN_KEY = 'token'
const COOKIE_EXPIRES = 1 // cookie有效期
const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: COOKIE_EXPIRES })
}
const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}

/**
 * @Description 从url解析参数
 * @param {string} url
 */
const getParamsByUrl = url => {
  const paramsArr = url.split('?')[1].split('&')
  const paramsObj = {}
  paramsArr.forEach(key => {
    const keyArr = key.split('=')
    paramsObj[keyArr[0]] = keyArr[1]
  })
  return paramsObj
}

/**
 * @Description 时间格式化
 * @param {string} date 时间
 * @param {string} fmt 时间格式 YYYY-mm-DD HH:MM:SS | ...
 */
const formatDate = (date = '', fmt = 'YYYY-mm-DD') => {
  try {
    if (!date) return '/'
    let time = ''
    const o = {
      'Y+': date.getFullYear().toString(), // 年
      'm+': (date.getMonth() + 1).toString(), // 月
      'D+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'M+': date.getMinutes().toString(), // 分
      'S+': date.getSeconds().toString() // 秒
    }
    if (/(y+)/.test(fmt)) {
      time = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        time = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return time
  } catch (err) {
    console.log(`时间格式化错误,\n ${err}`)
  }
}

/**
 * @Description 点击复制到剪贴板
 * @param {string} text 文字
 */
const copyText = text => {
  let _input = document.createElement('input')
  _input.setAttribute('id', 'copyInput')
  _input.setAttribute('value', text)
  document.getElementsByTagName('body')[0].appendChild(_input)
  document.getElementById('copyInput').select()
  if (document.execCommand('copy')) {
    alert('复制成功')
    // Vue.prototype.$message({
    //   message: '复制成功',
    //   type: 'success',
    //   duration: 1000,
    //   showClose: true,
    //   offset: 62
    // });
  }
  document.getElementById('copyInput').remove()
}

// export default，在引入的时候不能直接解构；要多加一行解构
export default {
  setToken,
  getToken,
  getParamsByUrl,
  formatDate,
  copyText
}
