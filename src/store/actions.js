export const actions = {
    //组件触发修改userInfo
    changUserInfoAction(context, info) {
        context.commit("changUserInfo",info)
    }
}