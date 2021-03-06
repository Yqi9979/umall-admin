import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
import {state,getters,mutations} from "./mutations"
import { actions } from "./actions"
import menu from './modules/menu';
import role from './modules/role';
import manage from './modules/manage';
import cate from './modules/cate';
import sku from './modules/sku';
import goods from './modules/goods';
import member from './modules/member';
import banner from './modules/banner';
import seck from './modules/seck';

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        menu,
        role,
        manage,
        cate,
        sku,
        goods,
        member,
        banner,
        seck
    }
})









