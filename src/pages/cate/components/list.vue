<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column prop="img" label="图片" >
        <template slot-scope="scope" v-if="scope.row.img!='null'">
          <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary" disabled>启用</el-button>
          <el-button v-else type="info" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqCateDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList"
    })
  },
  methods: {
    ...mapActions({
      reqCateListAction: "cate/reqCateListAction"
    }),
    // 编辑，触发子传父自定义edit事件并传一个id给menu父组件
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确定 请求删除api
          reqCateDel(id).then(res => {
            // 删除成功
            if (res.data.code == 200) {
              // 弹框
              successAlert(res.data.msg);
              // 更新列表数据
              this.reqCateListAction();
            } else {
              warningAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          // 取消
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.reqCateListAction()
  }
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>