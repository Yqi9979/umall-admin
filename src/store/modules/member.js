// muen页面的数据请求
import {reqMemberList} from '../../utils/request';
const state = {
    // 自定义一个菜单list
    memberList:[]
}
const mutations = {
    // 创建changeList方法修改list
    changeMemberList(state, arr) {
        state.memberList = arr;
    }
}
const actions = {
    // 页面请求
    reqMemberListAction(context) {
        // 发送请求
        reqMemberList().then(res => {
            console.log(res, '111')
            let list=res.data.list?res.data.list:[]
            context.commit("changeMemberList",list)
        })
    }
}
const getters = {
    memberList(state) {
        return state.memberList
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
