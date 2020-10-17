import { reqSeckList } from '../../utils/request';
const state = {
    scekList:[]
}
const mutations = {
    changeSeckList(state, arr) {
        state.seckList=arr
    }
}   
const actions = {
    reqSeckListAction(context) {
        reqSeckList().then(res => {
            context.commit("changeSeckList",res.data.list)
        })
    }    
}
const getters = {
    seckList(state) {
        return state.seckList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}










