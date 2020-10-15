import { reqCateList } from '../../utils/request';
const state = {
    // cateList商品分类列表数据
    cateList:[]
}
const mutations = {
    changeCateList(state, arr) {
        return state.cateList=arr
    }
}
const actions = {
    reqCateListAction(context) {
        reqCateList({istree:true}).then(res => {
            console.log(res)
            context.commit("changeCateList",res.data.list)
        })
    }
}
const getters = {
    cateList(state) {
        return state.cateList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}