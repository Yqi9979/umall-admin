export const state = {
  // 用户信息
  // 刷新如果登过就在本地存储取，如果没登过就是空对象 vuex配合本地存储
  userInfo: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
}
export const mutations = {
  changUserInfo(state, info) {
    state.userInfo = info;
    sessionStorage.getItem("userInfo")
    //由于状态层刷新，数据就没有了，但是我们希望数据还在，所以在本地存储中也存一份

    ///如果info是一个{} ，那么代表要退出，删；如果不是一个空{},代表是登录，存
    // if (info.id) {
      sessionStorage.setItem("userInfo", JSON.stringify(info))
    // } else {
      // sessionStorage.removeItem("userInfo")
    // }
  }

}
export const getters = {
  userInfo(state) {
    return state.userInfo
  }
}
