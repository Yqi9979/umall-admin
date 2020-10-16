<template>
  <div>
    <el-table
      :data="menuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180"></el-table-column>
      <el-table-column label="菜单图标">
        <!-- 
          table-solt 自定义列的显示内容，可组合其他组件使用。
          可以获取到 row, column, $index和store,
          table内部的状态管理的数据
        -->
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
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
import { reqMenuDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
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
          reqMenuDel(id).then(res => {
            // 删除成功
            if (res.data.code == 200) {
              // 弹框
              successAlert(res.data.msg);
              // 更新列表数据
              this.reqMenuListAction();
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
    this.reqMenuListAction()
  }
};
</script>
<style scoped>
</style>