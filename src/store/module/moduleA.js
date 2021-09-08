const moduleA = {
  state: {
    userinfo: {
      test: 1
    },
    userList: [],
    departmentInfo: {},
    departmentList: [],
    sum: 0,
    substract: 0,
    multiply: 0,
    divide: 0,
    countPartA: 0,
    countPartB: 1,
    moduleName: 'moduleA'
  },
  mutations: {
    setUserInfo: (state, info) => {
      state.userinfo = Object.assign(info)
    },
    setDepartmentInfo: (state, info) => {
      state.departmentInfo = Object.assign(info)
    },
    setCountPartA: (state, info) => {
      state.countPartA = Number(info)
    },
    setCountPartB: (state, info) => {
      state.countPartB = Number(info)
    }
  },
  getters: {
    getSum: state => {
      return state.countPartA + state.countPartB
    },
    getSubtract: state => {
      return state.countPartA - state.countPartB
    },
    getMultiply: state => {
      return state.countPartA * state.countPartB
    },
    getDivide: state => {
      return state.countPartA / state.countPartB
    },
    // getter方法作为filter使用
    getAdultUser: state => {
      // 筛选年龄大于18岁的用户
      return state.userList.filter(userinfo => Number(userinfo.age) > 18)
    },
    // filter 实际是有三个参数的 => value, index, list
    getBabyUser: state => {
      return state.userList.filter((userinfo, index, list) => {
        Number(userinfo.age) < 2 && Number(userinfo.age) > 0 && index >= 0 && list.length !== 0
      })
    },
    // 接受getters作为第二参数，可以调用其他getter
    getOlderUser: (state, getters) => {
      return getters.getAdultUser.filter(userinfo => Number(userinfo.age) > 65)
    },
    // 接受外部传参
    getAdultBySex: (state, getters) => sex => {
      return getters.getAdultUser.filter(userinfo => userinfo.sex === sex)
    },
    getOutParams: state => params => {
      return params
    }
  },
  actions: {
    /**
     *  利用 context 本地资源对象
     *  context中包含的属性
     *  commit 调用mutation
     *  state
     *  dispatch 调用其他action
     */
    // 单个参数
    asyncSetpartA: (context, info) => {
      setTimeout(() => {
        context.commit('setCountPartA', info)
      }, 1000)
    },
    // 接受多个参数（解构）
    asyncSetPartB: (context, { info, time }) => {
      setTimeout(() => {
        context.commit('setCountPartB', info)
      }, time)
    },
    // 结构 context
    asyncSetChange: ({ dispatch }) => {
      dispatch('asyncSetpartA').then(() => {
        dispatch('asyncSetPartB')
      })
    },
    asyncSetChange2: ({ dispatch, state }) => {
      return new Promise((resolve, reject) => {
        // resolve('我是成功的返回值')
        reject({ aaa: '我是失败的返回值' })
      })
    }
  }
}

export default moduleA
