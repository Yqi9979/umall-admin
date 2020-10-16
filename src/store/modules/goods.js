// 商品规格列表
import { reqGoodsList,reqGoodsCount } from '../../utils/request';

const state = {
    // list列表数据
    goodsList: [],
    // 一页数量
    goodsSize: 5,
    //总数
    goodsTotal: 0,
    //页码
    goodsPage:1,
    
}
const mutations = {
    // 修改goodsList
    changeGoodsList(state, arr) {
        state.goodsList = arr
    },
    //修改total
    changeGoodsTotal(state, num) {
        state.goodsTotal=num
    },
    //修改page
    changeGoodsPage(state, page) {
        state.goodsPage=page
    }

}
const actions = {
    // 发送商品规格列表请求
    reqGoodsListAction(context) {
        reqGoodsList({
            size: context.state.goodsSize,
            page: context.state.goodsPage
        }).then(res => {
            //如果去list的时候，取到null,那么有可能是最后一页没数据了，需要减一页，再次请求list
            let list = res.data.list ? res.data.list : []
            //如果取到的数据是null,并且不是第一页，那么就页码减1，重新请求list
            if(context.state.goodsPage>1&&list.length==0){
                context.commit("changeGoodsPage",context.state.goodsPage-1)
                context.dispatch("reqGoodsListAction")
                return;
            }
            context.commit("changeGoodsList", list)
        })
    },
    //获取总数的请求
    reqGoodsCountAction(context){
        reqGoodsCount().then(res=>{
            context.commit("changeGoodsTotal",res.data.list[0].total)
        })
    },
    //组件修改了页码
    changePageAction(context,page){
        //修改页码
        context.commit("changeGoodsPage",page)
        //发起list请求
        context.dispatch('reqGoodsListAction')
    }
}
const getters = {   
    goodsList(state) {
        return state.goodsList
    },
    goodsSize(state) {
        return state.goodsSize
    },
    goodsTotal(state){
        return state.goodsTotal;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}



