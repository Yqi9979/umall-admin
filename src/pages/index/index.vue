<template>
  <div class="index">
    <el-container class="box">
      <el-aside class="left" width="200px">
        <!-- 左侧导航 -->
        <!-- 1.background-color 背景颜色 
          2.router 开启路由模式,index 是你想要跳转的路径
          3.unique-opened 保持只有一个子菜单展开
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#da9999"
          router
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
        >
          <el-menu-item index="/">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </template>
          </el-menu-item>
          <!-- 左侧动态栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 是目录 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 是菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>

          <!-- 固定侧边栏 -->
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/sku">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->

        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header" >
          <div class="header-con">
            <span>{{userInfo.username}}</span>
            <el-button type="danger" @click="logOut()">退出登录</el-button>
          </div>
        </el-header>
        <el-main class="main">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({
      changUserInfoAction: "changUserInfoAction"
    }),
    logOut(){
      this.changUserInfoAction({});
      this.$router.push("/login")
    }
  },
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
}
.left {
  background: #da9999;
}
.header {
  background: rgb(228, 164, 194);
  position: relative;
}
.header-con{
  float: right;
  cursor: pointer;
}
.header-con span{
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  margin-right: 10px;
}
.header-con .el-button{
  float: right;
  margin-top: 10px;
}
.main {
  background: rgb(239, 243, 242);
}
.con {
  padding-top: 20px;
}
</style>