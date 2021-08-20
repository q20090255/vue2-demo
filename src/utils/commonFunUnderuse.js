/**
 * @author lbq
 * @Date 2021/5/11 16:11
 * @Description 比较少用到的方法
 */

import Vue from 'vue'

/**
 * @Description 数组对象去重
 * @param {array} arr 数组
 * @param {string} keyname 键名
 */
const uniqueArr1 = (arr, keyname) => {
  const res = new Map()
  return arr.filter(item => {
    return !res.has(item[keyname]) && res.set(item[keyname], 1)
  })
}

/**
 * @Description 将时间戳转换为剩余天数(倒数)
 * @param {string|number} timestamp
 */
const getCountdown = timestamp => {
  // 天数（转换成字符串类型，以防网不好的情况下，出现now）
  var day = timestamp / (60 * 60 * 24)
  var days = null
  days = day.toString().split('.')[0]
  // 取模（余数）
  var modulo = timestamp % (60 * 60 * 24)
  // 小时数
  var hours = Math.floor(modulo / (60 * 60))
  modulo = modulo % (60 * 60)
  // 分钟
  var minutes = Math.floor(modulo / 60)
  // 秒
  var seconds = Math.floor(modulo % 60)
  // 输出到页面
  if (days != '0' && days > 0) {
    return days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
  } else if (days == 0 && hours != 0 && hours > 0) {
    return hours + '时' + minutes + '分' + seconds + '秒'
  } else if (hours == 0 && minutes != 0 && minutes > 0) {
    return minutes + '分' + seconds + '秒'
  } else if (minutes == 0 && seconds != 0 && seconds > 0) {
    return seconds + '秒'
  } else {
    return '已结束'
  }
}

/**
 * @Description 信息提示
 * @param {string} msg
 * @param {number} time
 * @param {sting} type 类型
 */
const popup = (msg = '', time = 2000, type = 'info') => {
  alert(msg)
  // Vue.prototype.$message({
  //   message: msg,
  //   duration: time ? time : 2000,
  //   type,
  //   showClose: true,
  //   offset: 62
  // });
}

export default {
  uniqueArr1,
  getCountdown,
  popup
}

/**
 * @Description 将英文月份转换成中文数字
 * @param {string} str
 */
let engMonthToChiMonth = str => {
  let mm = str.toUpperCase()
  var em = new Array(
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
  )
  switch (mm) {
    case em[0]:
      mm = 1
      break
    case em[1]:
      mm = 2
      break
    case em[2]:
      mm = 3
      break
    case em[3]:
      mm = 4
      break
    case em[4]:
      mm = 5
      break
    case em[5]:
      mm = 6
      break
    case em[6]:
      mm = 7
      break
    case em[7]:
      mm = 8
      break
    case em[8]:
      mm = 9
      break
    case em[9]:
      mm = 10
      break
    case em[10]:
      mm = 11
      break
    case em[11]:
      mm = 12
      break
  }
  return mm
}
