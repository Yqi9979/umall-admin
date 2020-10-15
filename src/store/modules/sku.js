// 商品规格列表
import { reqSkuList,reqSkuCount } from '../../utils/request';

const state = {
    // list列表数据
    skuList: [],
    // 一页数量
    skuSize: 2,
    //总数
    skuTotal: 0,
    //页码
    skuPage:1,
    
}
const mutations = {
    // 修改skuList
    changeSkuList(state, arr) {
        state.skuList = arr
    },
    //修改total
    changeSkuTotal(state, num) {
        state.skuTotal=num
    },
    //修改page
    changeSkuPage(state, page) {
        state.skuPage=page
    }

}
const actions = {
    // 发送商品规格列表请求
    reqSkuListAction(context) {
        reqSkuList({
            size: context.state.skuSize,
            page: context.state.skuPage
        }).then(res => {
            //如果去list的时候，取到null,那么有可能是最后一页没数据了，需要减一页，再次请求list
            let list = res.data.list ? res.data.list : []
            //如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
            if(context.state.skuPage>1&&list.length==0){
                context.commit("changeSkuPage",context.state.skuPage-1)
                context.dispatch("reqSkuListAction")
                return;
            }

            list.forEach(item=>{
                item.attrs=JSON.parse(item.attrs)
            })
            context.commit("changeSkuList", res.data.list)
        })
    },
    //获取总数的请求
    reqSkuCountAction(context){
        reqSkuCount().then(res=>{
            context.commit("changeSkuTotal",res.data.list[0].total)
        })
    },
    //组件修改了页码
    changePageAction(context,page){
        //修改页码
        context.commit("changeSkuPage",page)
        //发起list请求
        context.dispatch('reqSkuListAction')
    }
}
const getters = {   
    skuList(state) {
        return state.skuList
    },
    skuSize(state) {
        return state.skuSize
    },
    skuTotal(state){
        return state.skuTotal;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}



