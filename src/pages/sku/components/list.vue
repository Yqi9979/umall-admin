<template>
  <div>
    <el-table
      :data="skuList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180"></el-table-column>
      <el-table-column label="规格属性" sortable >
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
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
    <el-pagination background layout="prev, pager, next" :total="skuTotal" :page-size="skuSize" @current-change="changePage"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqSkuDelete } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      skuList: "sku/skuList",
      skuTotal: "sku/skuTotal",
      skuSize:"sku/skuSize",
    })
  },
  methods: {
    ...mapActions({
      reqSkuListAction: "sku/reqSkuListAction",
      reqSkuCountAction:"sku/reqSkuCountAction",
      changePageAction:"sku/changePageAction",
    }),
    
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 确定 请求删除api
          reqSkuDelete(id).then(res => {
            // 删除成功
            if (res.data.code == 200) {
              // 弹框
              successAlert(res.data.msg);
              // 重新获取总数
              this.reqSkuCountAction();
               // 更新列表数据
              this.reqSkuListAction();
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
    this.reqSkuListAction();
     //获取list总数
    this.reqSkuCountAction();
  }
};
</script>
<style scoped>
</style>