<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加管理员' : '编辑管理员'" :visible.sync="info.isshow" @close="close">
      <el-form :model="form" :rules="rules" ref="valiForm">
        <el-form-item label="所属角色" prop="roleid">
          <el-select v-model="form.roleid" placeholder="请选择上级菜单">
            <el-option label="请选择" disabled value></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addManage()" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserAdd, reqUserInfo, reqUserEdit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      },
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" }
        ],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList"
    })
  },
  methods: {
    ...mapActions({
      reqManageListAction: "manage/reqManageListAction",
      reqRoleListAction: "role/reqRoleListAction",
      reqManageCountAction: "manage/reqManageCountAction"
    }),
    close() {
      if (!this.info.isAdd) {
        this.reset();
      }
    },
    // 重置清空数据
    reset() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1
      };
    },
    // 取消
    cancel() {
      this.info.isshow = false;
    },
    // 添加
    addManage() {
      this.$refs.valiForm.validate(valid => {
        if (!valid) return;
        reqUserAdd(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.reset();
            this.cancel();
            // 重新刷新列表
            this.reqManageListAction();
            // 重新获取总数
            this.reqManageCountAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    },
    // 编辑,获取发送一条详情请求
    look(uid) {
      console.log(uid);
      reqUserInfo(uid).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 确定编辑，修改
    update() {
      console.log(this.form);
      this.$refs.valiForm.validate(valid => {
        if (!valid) return;
        reqUserEdit(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.cancel();
            this.reqManageListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    }
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.reqRoleListAction();
    }
  }
};
</script>
<style scoped>
</style>