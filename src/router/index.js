import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
Vue.use(Router)

export let indexRouters = [
  {
    path: "menu",
    name: "菜单管理",
    component: () => import("../pages/menu/menu.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/menu")) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: "role",
    name: "角色管理",
    component: () => import("../pages/role/role.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/role")) {
        next()
      } else {
        next("/")
      }
    }
  },
 
  {
    path: "manage",
    name: "管理员管理",
    component: () => import("../pages/manage/manage.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/manage")) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: "cate",
    name: "商品分类",
    component: () => import("../pages/cate/cate.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/cate")) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: "sku",
    name: "商品规格",
    component: () => import("../pages/sku/sku.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/sku")) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: "goods",
    name: "商品管理",
    component: () => import("../pages/goods/goods.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/goods")) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: "member",
    name: "会员管理",
    component: () => import("../pages/member/member.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/member")) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: "banner",
    name: "轮播图管理",
    component: () => import("../pages/banner/banner.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/banner")) {
        next()
      } else {
        next("/")
      }
    }
  },
  {
    path: "seckill",
    name: "秒杀活动",
    component: () => import("../pages/seckill/seckill.vue"),
    beforeEnter(to, form, next) {
      let menus_url = store.state.userInfo.menus_url;
      console.log(menus_url)
      if (menus_url.includes("/seckill")) {
        next()
      } else {
        next("/")
      }
    }
  },
]
let router = new Router({
  routes: [{
      path: '/login',
      name: '登录',
      component: () => import("../pages/login/login.vue")
    },
    {
      path: '/',
      component: () => import("../pages/index/index.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/home/home.vue")
        },
        ...indexRouters
      ]
    }
  ]
})


// 登录拦截
router.beforeEach((to, form, next) => {
  // 如果前往登录就next
  if (to.path == '/login') {
    next()
    return;
  }
  // 前往不是登录
  // 查看是否登录，登录过就next，没有登录过，next('/login')
  console.log(store)
  if (store.state.userInfo.token) {
    next();
    return;
  }
  next("/login")

})

export default router
