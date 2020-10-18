<template>
  <div>
    <el-table
      :data="seckList"
      style="width: 100%;margin-bottom: 20px;text-aline:center"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="title" label="活动名称" width="100px"></el-table-column>
      <el-table-column label="状态" width="200px">
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
import { reqSeckDelete } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      seckList: "seck/seckList",
    })
  },
  methods: {
    ...mapActions({
      reqSeckListAction: "seck/reqSeckListAction",
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
          reqSeckDelete(id).then(res => {
            // 删除成功
            console.log(111)
            if (res.data.code == 200) {
              // 弹框
              successAlert(res.data.msg);
              // 更新list数据
              this.reqSeckListAction();
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
    },
  },
  mounted() {
    // 获取seck的list
    this.reqSeckListAction();
  }
};
</script>
<style scoped>
</style>