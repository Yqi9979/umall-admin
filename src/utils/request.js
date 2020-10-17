import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import store from '../store';
import { successAlter, warningAlert } from '../utils/alert';
import router from '../router';
// 开发环境下使用
Vue.prototype.$imgPre="http://localhost:3000"
let baseUrl = "/api";

// 上线打包使用
// Vue.prototype.$imgPre = ""
// let baseUrl=""

// 请求拦截
axios.interceptors.request.use(req => {
  console.log("---请求拦截---")
  console.log(req);
  if (req.url != baseUrl + '/api/userlogin') {
    req.headers.authorization = store.state.userInfo.token;
  }
  return req;
})
// 响应拦截
axios.interceptors.response.use(res => {
  console.group("======本次请求路径是：" + res.config.url)
  console.log(res)
  console.groupEnd()

  // 当用户掉线
  if (res.data.msg == '登录已过期或访问权限受限') {
    warningAlert(res.data.msg)
    router.push("/login")
  }
  
  return res
})
// ============================= menu 菜单管理==================
// menuadd 菜单添加
export const reqMenuAdd = (data) => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(data)
  })
}
// menulist 菜单列表
export const reqMenuList = () => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: {
      istree: true
    }
  })
}
// menudelete 菜单删除
export const reqMenuDel = (id) => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify({
      id
    })
  })
}
// menuinfo 获取一条菜单数据
export const reqMenuInfo = (id) => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// menuedit 修改菜单数据
export const reqMenuDeit = (data) => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(data)
  })
}
// =============================== role 角色管理=============
// roleadd 角色添加
export const reqRoleAdd = (data) => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(data)

  })
}
// rolelist 角色列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: 'get'
  })
}
// roleinfo 获取一条角色信息
export const reqRoleInfo = (id) => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {
      id
    }
  })
}
// roleedit 角色修改
export const reqRoleEdit = (data) => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: 'post',
    data: qs.stringify(data)
  })
}
// roledel 角色删除
export const reqRoleDel = (id) => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify({
      id
    })
  })
}
// ============================== manage 管理员管理=============
// useradd 管理员添加
export const reqUserAdd = (data) => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: 'post',
    data: qs.stringify(data)
  })
}
// usercount 管理员总数(用于计算分页)
export const reqUserCount = () => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: 'get'
  })
}
// userlist 管理员列表（分页）
export const reqUserList = ({page,size}) => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: 'get',
      params: {
          page,
          size
    }
  })
}
// userinfo 管理员获取（一条）
export const reqUserInfo = (uid) => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: 'get',
    params: {
      uid
    }
  })
}
// useredit 管理员修改
export const reqUserEdit = (data) => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: 'post',
    data: qs.stringify(data)
  })
}
// userdelete 管理员删除
export const reqUserDelete = (uid) => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: 'post',
    data: qs.stringify({uid})
  })
}
// userlogin 管理员登录
export const reqUserLogin = (data) => {
  return axios({
    url: baseUrl + "/api/userlogin",
    method: 'post',
    data: qs.stringify(data)
  })
}
// ============================= cate 商品分类==================
// cateadd 商品分类添加
export const reqCateAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i,params[i])
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: data
  })
}
// catelist 商品分类列表
export const reqCateList = (params) => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: params
  })
}
// catedelete 商品分类删除
export const reqCateDel = (id) => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify({
      id
    })
  })
}
// cateinfo 获取一条菜单数据
export const reqCateInfo = (id) => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  })
}
// cateedit 修改菜单数据
export const reqCateDeit = (data) => {
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: qs.stringify(data)
  })
}
// ============================== specs 商品规格管理=============
// specsadd 商品规格添加
export const reqSkuAdd = (data) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: 'post',
    data: qs.stringify(data)
  })
}
// specscount 商品规格总数(用于计算分页)
export const reqSkuCount = () => {
  return axios({
    url: baseUrl + "/api/specscount",
    method: 'get'
  })
}
// specslist 商品规格列表（分页）
export const reqSkuList = ({page,size}) => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: 'get',
      params: {
          page,
          size
    }
  })
}
// specsinfo 商品规格获取（一条）
export const reqSkuInfo = (id) => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: 'get',
    params: {
      id
    }
  })
}
// specsedit 商品规格修改
export const reqSkuEdit = (data) => {
  return axios({
    url: baseUrl + "/api/specsedit",
    method: 'post',
    data: qs.stringify(data)
  })
}
// specsdelete 商品规格删除
export const reqSkuDelete = (id) => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: 'post',
    data: qs.stringify({id})
  })
}
// ============================== goods 商品管理=============
// goodsadd 商品管理添加
export const reqGoodsAdd = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i,params[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data
  })
}
// goodscount 商品管理总数(用于计算分页)
export const reqGoodsCount = () => {
  return axios({
    url: baseUrl + "/api/goodscount",
    method:"get"
  })
}
// goodslist 商品管理列表(分页)
export const reqGoodsList = (params) => {
  return axios({
    url: baseUrl + "/api/goodslist",
    method: "get",
    params:params
  })
}
// goodsinfo 商品管理获取一条信息
export const reqGoodsInfo = (id) => {
  return axios({
    url: baseUrl + "/api/goodsinfo",
    method: "get",
    params: {
      id:id
    }
  })
}
// goodsedit 商品管理修改
export const reqGoodsEdit = (form) => {
  let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
    }
  return axios({
    url: baseUrl + "/api/goodsedit",
    method:"post",
    data:data
  })
}
// goodsdeletd 商品管理删除
export const reqGoodsDelete = (id) => {
  return axios({
    url: baseUrl + "/api/goodsdelete",
    method: "post",
    data:qs.stringify({id})
  })
}
// ============================== member 会员管理=============
// memberlist 会员列表
export const reqMemberList = () => {
  return axios({
    url: baseUrl + "/api/memberlist",
    method:"get"    
  })
}
// memberinfo 会员信息(一条)
export const reqMemberInfo = (uid) => {
  return axios({
    url: baseUrl + "/api/memberinfo",
    method: "get",
    params: {
      uid:uid
    }
  })
}
// memberedit 会员修改
export const reqMemberEdit = (data) => {
  return axios({
    url: baseUrl + "/api/memberedit",
    method: "post",
    data:qs.stringify(data)
  })
}
// ============================== banner 轮播图管理=============
//  bannerlist 轮播图列表
export const reqBannerList = () => {
  return axios({
    url: baseUrl + "/api/bannerlist",
    method:"get"
  })
}
// banneradd 轮播图添加
export const reqBannerAdd = (form) => {
  let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/banneradd",
    method: 'post',
    data:data
  })
}
// bannerinfo 轮播图获取(一条)
export const reqBannerInfo = (id) => {
  return axios({
    url: baseUrl + '/api/bannerinfo',
    method: 'get',
    params: {
      id:id
    }
  })
}
// banneredit 轮播图修改
export const reqBannerEdit = (form) => {
  let data = new FormData()
    for (let i in form) {
        data.append(i, form[i])
  }
  return axios({
    url: baseUrl + '/api/banneredit',
    method: "post",
    data:data
  })
}
// bannerdelete 轮播图删除
export const reqBannerDelete = (id) => {
  return axios({
    url: baseUrl + '/api/bannerdelete',
    method: 'post',
    data: qs.stringify({
      id:id
    })
  })
}
// ============================== seckill 限时秒杀管理=============
// seckadd 限时秒杀添加
export const reqSeckAdd = (data) => {
  return axios({
    url: baseUrl + '/api/seckadd',
    method: 'post',
    data:qs.stringify(data)
  })
}
// secklist 限时秒杀列表
export const reqSeckList = () => {
  return axios({
    url: baseUrl + '/api/secklist',
    method:'get'
  })
}
//  seckinfo 限时秒杀获取信息（一条）
export const reqSeckInfo = (id) => {
  return axios({
    url: baseUrl + '/api/seckinfo',
    method: 'get',
    params: {
      id:id
    }
  })
}
// seckedit 限时秒杀修改
export const reqSeckEdit = (data) => {
  return axios({
    url: baseUrl + '/api/seckedit',
    method: 'post',
    data:qs.stringify(data)
  })
}
// seckdelete 限时秒杀删除
export const reqSeckDelete = (id) => {
  return axios({
    url: bserUrl + '/api/seckdelete',
    method: 'post',
    data: qs.stringify({
      id:id
    })
  })
}


