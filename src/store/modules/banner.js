import { reqBannerList } from '../../utils/request';
const state = {
    bannerList:[]
}
const mutations = {
    changeBannerList(state, arr) {
      state.bannerList = arr
    }
}
const actions = {
    reqBannerListAction(context) {
        reqBannerList().then(res => {
            let list = res.data.list ? res.data.list : [];
            console.log(res,11);
            context.commit("changeBannerList",list)
        })
    }
}
const getters = {
    bannerList(state) {
        return state.bannerList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}










