<template>
  <div>
    <el-button type="primary" @click="willAdd()">添加</el-button>
    <!-- 表格组件 -->
    <!-- list页面触发子传父事件  -->
    <v-list @edit="edit"></v-list>
    <!-- 添加弹框组件 -->
    <v-add :info="info" ref="add"></v-add>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from './components/add.vue';
import vList from './components/list.vue';
export default {
  props: [],
  components: {
    vAdd,
    vList
  },
  data() {
    return {
      // 传递给add的数据
      info:{
        // 添加弹框的状态
        isshow:false,
        // 添加、编辑的状态 true添加，false编辑
        isAdd:true
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // 点击添加按钮
    willAdd(){
      // 点击list的添加，出现添加弹框
      this.info.isshow=true
      this.info.isAdd=true
    },
    // 点击list的编辑按钮，触发子传父自定义事件，并带一个id
    edit(id){
      // 点击list编辑，弹出编辑弹框
      this.info.isshow=true;
      this.info.isAdd=false;
      // 给add组件传一个look(id)函数，并获取一条菜单数据请求
      this.$refs.add.look(id)
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>