<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加商品规格' : '编辑商品规格'" :visible.sync="info.isshow" @close="close">
      <el-form ref="form" :model="form"  label-width="80px">
        <el-form-item label="规格名称">
            <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="con">
            <div class="input-wrap">
              <el-input v-model="item.value"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="del(index)">删除</el-button>
          </div>
        </el-form-item>
        
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addSku()" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSkuAdd, reqSkuInfo, reqSkuEdit } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr:[{value:""},{value:""}],
      form: {
        specsname: "",
        attrs: "",
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      reqSkuListAction: "sku/reqSkuListAction",
      reqSkuCountAction:"sku/reqSkuCountAction"
    }),
    //新增规格属性
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    //删除规格属性
    del(index) {
      this.attrArr.splice(index, 1);
    },
    // 关闭之后判断
    close() {
      if (!this.info.isAdd) {
        this.reset();
      }
    },
    // 重置清空数据
    reset() {
      this.form = {
       specsname: "",
        attrs: "",
        status: 1
      };
      this.attrArr=[{value:""},{value:""}]

    },
    // 取消
    cancel() {
      this.info.isshow = false;
    },
    // 添加
    addSku() {
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      reqSkuAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 重置
          this.reset();
          // 弹框取消
          this.cancel();
          // 重新刷新列表
          this.reqSkuListAction();
          // 重新获取总数
          this.reqSkuCountAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 编辑
    look(id) {
      reqSkuInfo(id).then(res => {
        if (res.data.code == 200) {
           //这个时候form是没有id的
           console.log(this.form)
          this.form = res.data.list[0];
          //'['s','l','m']'--->[{value:'s'},{value:'l'},{value:'m'}]
          this.attrArr = JSON.parse(this.form.attrs).map((item) => ({value: item,}));
           console.log(this.form)

        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改
    update() {
      this.form.attrs=JSON.stringify(this.attrArr.map((item)=>item.value))
      reqSkuEdit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reset();
          this.cancel();
          this.reqSkuListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.con {
  display: flex;
}
.input-wrap {
  flex: 1;
}
</style>