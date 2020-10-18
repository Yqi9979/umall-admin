<template>
  <div>
    <el-dialog :title="info.isAdd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" @closed="close">
      <el-form :rules="rules" ref="valiForm" :model="form" label-width="80px">
        <el-form-item label="菜单名称" prop='title'>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop='pid'>
          <el-select v-model="form.pid"  @change="changePid" placeholder="请选择上级菜单">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type==1" prop='icon'>
          <el-select v-model="form.icon" placeholder="请选择图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else prop='url'>
          <el-select v-model="form.url" placeholder="请选择地址">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRouters } from "../../../router/index";
import { reqMenuAdd, reqMenuInfo, reqMenuDeit } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      // 图标
      icons: [
        "el-icon-s-custom",
        "el-icon-setting",
        "el-icon-sugar",
        "el-icon-dessert",
        "el-icon-grape",
        "el-icon-lollipop",
        "el-icon-present",
        "el-icon-alarm-clock",
        "el-icon-service",
        "el-icon-basketball",
        "el-icon-football",
        "el-icon-soccer",
      ],
      //   路由
      indexRouters: indexRouters,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      },
      rules: {
        title: [{ required: true, message: "请输菜单名称", trigger: "blur" }],
        pid:[{required:true,message:'请输入上级菜单',trigger:'blur'}],
        icon:[{required:true,message:'请输入图标',trigger:'change'}],
        url:[{required:true,message:'请输入地址',trigger:'change'}]
      }
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList"
    })
  },
  methods: {
    ...mapActions({
      reqMenuListAction: "menu/reqMenuListAction"
    }),
    // 取消，弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 关闭弹框，下次打开之前，是不是添加
    close() {
      // 如果不是添加，清除form数据
      if(!this.info.isAdd){
        this.reset()
      }
    },
    // 重置
    reset() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      };
    },
    // 修改了pid上级分类编号，并修改type类型
    changePid() {
      // 上级编号为0，type为1目录,否则为2菜单
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 添加
    add() {
      this.$refs.valiForm.validate(valid => {
        if (!valid) return;
        // console.log(this.form)
        reqMenuAdd(this.form).then(res => {
          if ((res.data.code = 200)) {
            // 添加成功打印
            successAlert(res.data.msg);

            // 清空输入框
            this.reset();
            // 弹框消失
            this.cancel();
            this.reqMenuListAction();
          } else {
            // 添加失败打印
            warningAlert(res.data.msg);
          }
        });
      });
    },
    
    // 获取一条菜单数据
    look(id) {
      // 发送请求
      reqMenuInfo(id).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
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
        reqMenuDeit(this.form).then(res => {
          // 修改成功
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            // 更新数据
            this.reset();
            // 关闭弹框
            this.cancel();
            // 更新列表数据
            this.reqMenuListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    }
  },
  mounted() {
    this.reqMenuListAction()
  }
};
</script>
<style scoped>
</style>