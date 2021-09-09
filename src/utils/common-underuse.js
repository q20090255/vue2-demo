import Vue from 'vue'

/**
 * @Description 数组对象去重
 * @param {array} arr 数组
 * @param {string} keyname 键名
 */
export const uniqueArr1 = (arr, keyname) => {
  const res = new Map()
  return arr.filter(item => {
    return !res.has(item[keyname]) && res.set(item[keyname], 1)
  })
}

/**
 * @Description 单一数组去重
 * @param {array} arr 数组
 */
export const uniqueArr = arr => {
  let result = []
  let obj = {}
  for (let i of arr) {
    // 去重，非空
    if (!obj[i] && i) {
      result.push(i)
      obj[i] = 1
    }
  }
  return result
}

/**
 * @Description 将时间戳转换为剩余天数(倒数)
 * @param {string|number} timestamp
 */
export const getCountdown = timestamp => {
  // 天数（转换成字符串类型，以防网不好的情况下，出现now）
  let day = timestamp / (60 * 60 * 24)
  let days = null
  days = day.toString().split('.')[0]
  // 取模（余数）
  let modulo = timestamp % (60 * 60 * 24)
  // 小时数
  let hours = Math.floor(modulo / (60 * 60))
  modulo = modulo % (60 * 60)
  // 分钟
  let minutes = Math.floor(modulo / 60)
  // 秒
  let seconds = Math.floor(modulo % 60)
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
 * @Description 将英文月份转换成中文数字
 * @param {string} str
 */
export const engMonthToChiMonth = str => {
  let mm = str.toUpperCase()
  let em = new Array(
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

/**
 * @Description 使用可选链操作符 ?.
 * @param {array} target 数组
 */
// export const useOptionChain = target => {
//   return new Proxy(target, {
//     get: (target, propKey) => {
//       const propKeyArr = propKey.split('?.')
//       console.log(target, propKey)
//       return false
//       return propKeyArr.reduce((a, b) => a?.[b], target)
//     }
//   })
// }

/**
 * @Description 防抖，一定时间间隔内，多次调用，只跑一次
 * @param {func} func 要跑的方法
 * @param {number} wait 间隔时间，默认500ms
 * @param {boolean} immediate 是否立即执行，默认否
 */
export const debounce = (func, wait = 500, immediate = false) => {
  let timeout
  return function () {
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @Description 节流，多次调用，按一定时间间隔执行
 * @param {func} func 要跑的方法
 * @param {number} wait 间隔时间，默认500ms
 * @param {Object} options
 */
export const throttle = (func, wait = 500, options) => {
  //container.onmousemove = throttle(getUserAction, 1000);
  let timeout, context, args
  let previous = 0
  /**
   * * options的参数
   * leading，函数在每个等待时延的开始被调用，默认值为false
   * trailing，函数在每个等待时延的结束被调用，默认值是true
   * * 可以根据不同的值来设置不同的效果：
   * leading-false，trailing-true：默认情况，即在延时结束后才会调用函数
   * leading-true，trailing-true：在延时开始时就调用，延时结束后也会调用
   * leading-true, trailing-false：只在延时开始时调用
   */
  if (!options) options = { leading: false, trailing: true }

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  let throttled = function () {
    let now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }
  return throttled
}

/**
 * @Description 对象转化为formdata
 * @param {object} object
 */
export const getFormData = object => {
  const formData = new FormData()
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => formData.append(key + `[${i}]`, subValue))
    } else {
      formData.append(key, object[key])
    }
  })
  return formData
}

/**
 * @Description 对象转化为url参数
 * @param {object} obj
 */
export const getParams = obj => {
  return Object.keys(obj)
    .map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
    })
    .join('&')
}

/**
 * @Description 究级深拷贝
 */
const getType = data => {
  // 获取数据类型
  const baseType = Object.prototype.toString
    .call(data)
    .replace(/^\[object\s(.+)\]$/g, '$1')
    .toLowerCase()
  const type = data instanceof Element ? 'element' : baseType
  return type
}
const isPrimitive = data => {
  // 判断是否是基本数据类型
  const primitiveType =
    'undefined,null,boolean,string,symbol,number,bigint,map,set,weakmap,weakset'.split(',') // 其实还有很多类型
  return primitiveType.includes(getType(data))
}
const isObject = data => getType(data) === 'object'
const isArray = data => getType(data) === 'array'
export const deepClone = data => {
  let cache = {} // 缓存值，防止循环引用
  const baseClone = _data => {
    let res
    if (isPrimitive(_data)) {
      return data
    } else if (isObject(_data)) {
      res = { ..._data }
    } else if (isArray(_data)) {
      res = [..._data]
    }
    // 判断是否有复杂类型的数据，有就递归
    Reflect.ownKeys(res).forEach(key => {
      if (res[key] && getType(res[key]) === 'object') {
        // 用cache来记录已经被复制过的引用地址。用来解决循环引用的问题
        if (cache[res[key]]) {
          res[key] = cache[res[key]]
        } else {
          cache[res[key]] = res[key]
          res[key] = baseClone(res[key])
        }
      }
    })
    return res
  }
  return baseClone(data)
}
