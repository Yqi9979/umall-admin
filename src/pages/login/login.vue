<template>
  <div class="login">
    <div class="box">
      <h3 class="center">登录</h3>

      <div class="line">
        <el-input placeholder="请输入账号" v-model="info.username" clearable></el-input>
      </div>
      <div class="line">
        <el-input placeholder="请输入密码" v-model="info.password" show-password></el-input>
      </div>
      <div class="line center">
        <el-button type="primary" plain @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserLogin } from "../../utils/request";
import { successAlert, warningAlert } from "../../utils/alert";
export default {
  data() {
    return {
      info: {
        username: "",
        password: ""
      }
    };
  },
  computed:{
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      changUserInfoAction:"changUserInfoAction"
    }),
    // 点击登录
    login() {
      // 发送请求后端验证账号密码
      reqUserLogin(this.info).then(res => {
        console.log(res)
        if (res.data.code==200) {
          successAlert(res.data.msg);
          // res.data.list  用户信息 存起来，供很多组件使用
          this.changUserInfoAction(res.data.list)
          this.$router.push("/");
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
.center {
  text-align: center;
}
.box {
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 20px;
}
.line {
  margin-top: 20px;
}
</style>