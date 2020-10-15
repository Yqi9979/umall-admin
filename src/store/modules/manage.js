import { reqUserList,reqUserCount } from '../../utils/request';

const state = {
    // 列表 list
    manageList:[],
    //一页的数量
    manageSize: 3,
    //总数
    manageTotal:0,
    //页码
    managePage:1,
    
}
const mutations = {
    // 修改列表
    changeManageList(state, arr) {
        state.manageList=arr
    },
    //修改总数total 
    changeManageTotal(state,num){
        state.manageTotal=num;
    },
    //修改页码
    changeManagePage(state,page){
        state.managePage=page
    }
}
const actions = {
    // 获取manage列表请求
    reqManageListAction(context) {
        reqUserList({
            page: context.state.managePage,
            size: context.state.manageSize
        }).then(res => {
            let list = res.data.list ? res.data.list : []

            //如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
            if(context.state.managePage>1&&list.length==0){
                context.commit("changeManagePage",context.state.managePage-1)
                context.dispatch("reqManageListAction")
                return;
            }
            context.commit("changeManageList", list)
        })
    },
    // 获取分页总数请求
    reqManageCountAction(context) {
        reqUserCount().then(res => {
            context.commit("changeManageTotal", res.data.list[0].total)
        })
    },
    //组件修改了页码
    changePageAction(context,managePage){
        //修改页码
        context.commit("changeManagePage",managePage)
        //发起list请求
        context.dispatch('reqManageListAction')
    }

}
const getters = {
    manageList(state) {
        return state.manageList
    },
    manageSize(state) {
        return state.manageSize
    },
    manageTotal(state) {
        return state.manageTotal
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}