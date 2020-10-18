<template>
  <div>
    <el-dialog :title="info.isAdd?'角色添加':'角色编辑'" :visible.sync="info.isshow" @close="close">
      <el-form :model="form" ref="valiForm" :rules="rules">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{children: 'children', label: 'title'}"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addRole()" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="updsate()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleAdd, reqRoleInfo, reqRoleEdit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1
      },
      rules:{
        rolename:[{required:true,message:'请输入角色名称',trigger:'blur'}]
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
      roleList: "role/roleList"
    })
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqMenuListAction",
      reqRoleListAction: "role/reqRoleListAction"
    }),
    // 取消，弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 关闭
    close() {
      if (!this.info.isAdd) {
        this.reset();
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    // 重置清空数据
    reset() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1
      };
    },
    // 确认添加角色
    addRole() {
       this.$refs.valiForm.validate(valid => {
        if (!valid) return;
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleAdd(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            // 清空输入框
            this.reset();
            //关闭弹框
            this.cancel();
            // 刷新角色列表数据
            this.reqRoleListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
       });
    },
    // 获取一条菜单数据请求
    loog(id) {
      // 发送请求
      reqRoleInfo(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 点击修改，发送请求
    updsate() {
       this.$refs.valiForm.validate(valid => {
        if (!valid) return;
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        console.log(this.form);
        reqRoleEdit(this.form).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            // 清空输入框
            this.reset();
            //关闭弹框
            this.cancel();
            // 刷新角色列表数据
            this.reqRoleListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    }
  },
  mounted() {
    this.reqMenuListAction();
  }
};
</script>
<style scoped>
</style>