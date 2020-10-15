<template>
  <div>
    <el-table
      :data="roleList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180"></el-table-column>
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
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqRoleDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList"
    })
  },
  methods: {
    ...mapActions({
      reqRoleListAction: "role/reqRoleListAction"
    }),
    del(id) {
        this.$confirm("你确定要删除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            // 确定 请求删除api
            reqRoleDel(id).then(res => {
                // 删除成功
                if (res.data.code == 200) {
                // 弹框
                successAlert(res.data.msg);
                // 更新列表数据
                this.reqRoleListAction();
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
        edit(id){
            this.$emit("edit",id)
        }
    },

    mounted() {
        this.reqRoleListAction();
    }
};
</script>
<style scoped>
</style>