// 这里记得别耦合起来了

export const valSpecail = val => {
  let status = true,
    msg = ''
  let exp = /[\!\@\#\$\%\^\&\*~<>',\.]/
  if (exp.test(val)) {
    status = false
    msg = '不能包含特殊字符'
  }
  return { status, msg }
}

export const valDou = val => {
  let status = true,
    msg = '',
    digit = 2 // 这里可以研究下怎么加变量，没搞懂
  let exp = /^[0-9]+([.][0-9]{1,2})?$/
  if (!exp.test(val)) {
    status = false
    msg = '两位小数'
  }
  return { status, msg }
}

export const valEmail = val => {
  let status = true,
    msg = ''
  let exp = /^([a-zA-Z0-9]+[_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  if (!exp.test(val)) {
    status = false
    msg = '输邮箱'
  }
  return { status, msg }
}

export const valPhone = val => {
  let status = true,
    msg = ''
  let exp = /^(((13[0-9])|(15[0-9])|(18[0-9]))+\d{8})$/
  if (!exp.test(val)) {
    status = false
    msg = '输手机'
  }
  return { status, msg }
}

export class IdCardClass {
  #valid = false
  #ID15 = ''
  #ID18 = ''
  local = '' //老巢

  constructor(cardNo) {
    if (cardNo != null) this.setcardNo(cardNo)
  }

  // 初始化，15位或者18位
  setcardNo(cardNo) {
    this.#ID15 = ''
    this.#ID18 = ''
    this.local = ''
    cardNo = cardNo.replace(' ', '')

    let strcardNo
    if (cardNo.length == 18) {
      let pattern = /^\d{17}(\d|x|X)$/
      if (pattern.exec(cardNo) == null) return
      strcardNo = cardNo.toUpperCase()
    } else {
      let pattern = /^\d{15}$/
      if (pattern.exec(cardNo) == null) return
      strcardNo = cardNo.substr(0, 6) + '19' + cardNo.substr(6, 9)
      strcardNo += this.getVCode(strcardNo)
    }
    this.#valid = this.checkValid(strcardNo)
  }

  // 校验1 尾数
  getVCode(cardNo17) {
    let wi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1)
    let ai = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    let cardNoSum = 0
    for (let i = 0; i < cardNo17.length; i++) cardNoSum += cardNo17.charAt(i) * wi[i]
    let seq = cardNoSum % 11
    return ai[seq]
  }

  // 校验2 生日
  isDate(strDate) {
    let r = strDate.match(/^(\d{1,4})(\d{1,2})(\d{1,2})$/)
    if (r == null) return false
    let d = new Date(r[1], r[2] - 1, r[3])
    return d.getFullYear() == r[1] && d.getMonth() + 1 == r[2] && d.getDate() == r[3]
  }

  // 校验
  checkValid(cardNo18) {
    if (this.getVCode(cardNo18.substr(0, 17)) != cardNo18.charAt(17)) return false
    if (!this.isDate(cardNo18.substr(6, 8))) return false

    // 校验3 城市
    let aCity = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    if (aCity[parseInt(cardNo18.substr(0, 2))] == null) return false
    this.#ID18 = cardNo18
    this.#ID15 = cardNo18.substr(0, 6) + cardNo18.substr(8, 9)
    this.local = aCity[parseInt(cardNo18.substr(0, 2))]
    return true
  }

  // 身份证有没填错
  isValid() {
    return this.#valid
  }

  // 生日字符串 1949-10-01
  getBirthDate() {
    let birthDate = ''
    if (this.#valid)
      birthDate = this.getBirthYear() + '-' + this.getBirthMonth() + '-' + this.getBirthDay()
    return birthDate
  }

  // 年
  getBirthYear() {
    let birthYear = ''
    if (this.#valid) birthYear = this.#ID18.substr(6, 4)
    return birthYear
  }

  // 月
  getBirthMonth() {
    let birthMonth = ''
    if (this.#valid) birthMonth = this.#ID18.substr(10, 2)
    if (birthMonth.charAt(0) == '0') birthMonth = birthMonth.charAt(1)
    return birthMonth
  }

  // 日
  getBirthDay() {
    let birthDay = ''
    if (this.#valid) birthDay = this.#ID18.substr(12, 2)
    return birthDay
  }

  // 性别，1：男，0：女
  getSex() {
    let sex = ''
    if (this.#valid) sex = this.#ID18.charAt(16) % 2
    return sex
  }

  // 15位×××号码
  get15() {
    let ID15 = ''
    if (this.#valid) ID15 = this.#ID15
    return ID15
  }

  // 18位×××号码
  get18() {
    let ID18 = ''
    if (this.#valid) ID18 = this.#ID18
    return ID18
  }

  // 所在省，例如：上海市、浙江省
  getLocal() {
    let local = ''
    if (this.#valid) local = this.local
    return local
  }
}
