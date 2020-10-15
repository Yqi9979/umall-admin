export const state = {
  // 用户信息
  userInfo:[]
}
export const mutations = {
  changUserInfo(state, info) {
    state.userInfo = info;
    sessionStorage.getItem("userInfo")
  }

}
export const getters = {
  userInfo(state) {
    return state.userInfo
  }
}
