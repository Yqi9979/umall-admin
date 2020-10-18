<template>
  <div>
    <el-table
      :data="manageList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary" disabled>启用</el-button>
          <el-button v-else type="info" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
      
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="manageTotal" :page-size="manageSize" @current-change="changePage"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqUserDelete } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      manageList: "manage/manageList",
      manageTotal: "manage/manageTotal",
      manageSize:"manage/manageSize",
    })
  },
  methods: {
    ...mapActions({
      reqManageListAction: "manage/reqManageListAction",
      reqManageCountAction:"manage/reqManageCountAction",
      changePageAction:"manage/changePageAction",
    }),
    
    //编辑
    edit(uid) {
      this.$emit("edit", uid);
    },
    // 删除
    del(uid) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 确定 请求删除api
          reqUserDelete(uid).then(res => {
            // 删除成功
            if (res.data.code == 200) {
              // 弹框
              successAlert(res.data.msg);
              // 更新列表数据
              this.reqManageListAction();
              // 重新获取总数
              this.reqManageCountAction();
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
    //修改了当前页码
    changePage(e){
      console.log(e)
      this.changePageAction(e)
    },

  },
  mounted() {
   
    //获取list
    this.reqManageListAction();
     //获取list总数
    this.reqManageCountAction();
  }
};
</script>
<style scoped>
</style>