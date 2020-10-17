// role 角色列表页面的数据请求
import { reqRoleList } from '../../utils/request';
const state = {
    // 自定义角色列表 roleList
    roleList:[],
}
const mutations = {
    // 创建changeRoleList方法，修改roleList
    changeRoleList(state, arr) {
        state.roleList=arr
    }
}
const actions = {
    // 页面请求
    reqRoleListAction(context) {
        // 发送请求
        reqRoleList().then(res => {
            let list = res.data.list ? res.data.list : []
            context.commit("changeRoleList",list)
        })
    }
}
const getters = {
    roleList(state) {
        return state.roleList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}