// muen页面的数据请求
import {reqMenuList} from '../../utils/request';
const state = {
    // 自定义一个菜单list
    menuList:[]
}
const mutations = {
    // 创建changeList方法修改list
    changeMenuList(state, arr) {
        state.menuList = arr;
    }
}
const actions = {
    // 页面请求
    reqMenuListAction(context) {
        // 发送请求
        reqMenuList().then(res => {
            context.commit("changeMenuList",res.data.list)
        })
    }
}
const getters = {
    menuList(state) {
        return state.menuList
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
