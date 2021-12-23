const moduleB = {
  state: {
    userInfo: {
      userId: '001',
      userName: '老黎',
      userLevel: 'P99',
      userDepartment: 'English',
      userAge: 99
    },
    departmentInfo: {
      peopleNum: 11,
      depLevel: 'p8',
      depStatus: 'working',
      depWorkerList: ['老黎', '老李', '老栗']
    },
    moduleName: 'moduleB'
  },
  getters: {
    getUserAge: state => {
      return state.userInfo.userAge
    },
    is996Tool: state => {
      let { userLevel, userAge } = state.userInfo
      userLevel = userLevel.replace(/[^\d]/g, '')
      if (userLevel >= 50 && userAge > 18 && userAge <= 25) {
        return true
      } else {
        return false
      }
    },
    getToolInfo: (state, getters) => {
      let { userName, userId } = state.userInfo
      let { depStatus } = state.departmentInfo
      let is996Tool = getters.is996Tool
      let obj = { userName, userId, depStatus, is996Tool }
      return obj
    }
  },
  mutations: {
    addAge: state => {
      state.userInfo.userAge = state.userInfo.userAge + 1
    },
    changeUserName: (state, payload) => {
      state.userInfo.userName = payload
    },
    changeDepartmentInfo: (state, { peopleNum, depLevel }) => {
      state.departmentInfo.peopleNum = peopleNum
      state.departmentInfo.depLevel = depLevel
    }
  },
  actions: {
    changeData: async ({ commit, state }, payload) => {
      await new Promise(function (resolve, reject) {
        setTimeout(function () {
          commit('addAge')
          commit('changeUserName', '老黎α')
          commit('changeDepartmentInfo', {
            peopleNum: 20,
            depLevel: 'p9'
          })
        }, 3000)
      })
    }
  }
}

export default moduleB
