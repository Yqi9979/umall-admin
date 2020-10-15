<template>
  <div>
    <el-table
      :data="goodsList"
      style="width: 100%;margin-bottom: 20px;text-aline:center"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="商品编号"  width="100px"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"  width="100px"></el-table-column>
      <el-table-column prop="price" label="商品价格"  width="100px"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="100px"></el-table-column>
      <el-table-column label="图片" >
        <template slot-scope="scope" v-if="scope.row.img!='null'">
          <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>

      <el-table-column label="是否新品" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew==1" type="primary" disabled>是</el-button>
          <el-button v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot==1" type="primary" disabled>是</el-button>
          <el-button v-else >否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status" type="primary" disabled>启用</el-button>
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
    <el-pagination background layout="prev, pager, next" :total="goodsTotal" :page-size="goodsSize" @current-change="changePage"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDelete } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/goodsList",
      goodsSize:"goods/goodsSize",
      goodsTotal:"goods/goodsTotal"
    })
  },
  methods: {
    ...mapActions({
      reqGoodsListAction: "goods/reqGoodsListAction",
      reqGoodsCountAction:"goods/reqGoodsCountAction",
      changePageAction:"goods/changePageAction",
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
          reqGoodsDelete(id).then(res => {
            // 删除成功
            if (res.data.code == 200) {
              // 弹框
              successAlert(res.data.msg);
              // 更新列表总数数据
              this.reqGoodsCountAction();
              // 更新list数据
              this.reqGoodsListAction();
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
      this.changePageAction(e)
    },
  },
  mounted() {
    // 获取goods的list
    this.reqGoodsListAction();
    //获取goods的list的总数
    this.reqGoodsCountAction();
  }
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>