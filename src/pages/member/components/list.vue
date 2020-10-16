<template>
  <div>
    <el-table
      :data="memberList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180"></el-table-column>
      
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary" disabled>启用</el-button>
          <el-button v-else type="info" disabled>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      memberList: "member/memberList"
    })
  },
  methods: {
    ...mapActions({
      reqMemberListAction: "member/reqMemberListAction"
    }),
    // 编辑，触发子传父自定义edit事件并传一个id给menu父组件
    edit(uid) {
      this.$emit("edit", uid);
    },
   
  },
  mounted() {
    this.reqMemberListAction()
  }
};
</script>
<style scoped>
</style>