<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow" >
      <el-form ref="valiForm" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="form.password"></el-input>
          <p></p>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="update()" >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, successAlert } from "../../../utils/alert";
import {reqMemberEdit,reqMemberInfo} from '../../../utils/request';
export default {
  props: ["info"],
  components: {},
  data() {
    // 验证手机号
    var checkMobile=(rules,value,cb)=>{
      const regMoblie=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if(regMoblie.test(value)){
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }
    return {
      form:{
        uid: 0,
        nickname: "",
        phone: "",
        password: "",
        status: 1
      },
      rules:{
        phone:[
          {required:true,validator: checkMobile,trigger:'blur'},
          ],
        nickname:[{required:true,message:"请输入昵称",trigger:'blur'}],
       
      }
    };
  },
  computed: {
    ...mapGetters({
      memberList: "member/memberList"
    })
  },
  methods: {
    ...mapActions({
      reqMemberListAction: "member/reqMemberListAction"
    }),
    // 取消，弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 获取一条用户信息
    look(uid) {
      // 发送请求
      reqMemberInfo(uid).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.uid = uid;
          this.form.password=""
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改数据
    update() {
       this.$refs.valiForm.validate(valid => {
        if (!valid) return;
        // 发送请求
        reqMemberEdit(this.form).then(res => {
          // 修改成功
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            // 关闭弹框
            this.cancel();
            // 更新列表数据
            this.reqMemberListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    }
  },
  mounted() {
    this.reqMemberListAction()
  }
};
</script>
<style scoped>
</style>