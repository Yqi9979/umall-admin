<template>
  <div>
    <el-button type="primary" @click="willAdd()">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from './components/list.vue';
import vAdd from './components/add.vue';

export default {
  props: [],
  components: {
    vList,
    vAdd
  },
  data() {
    return {
      info:{
        isshow:false,
        isAdd:true
      }
    };
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions({
    }),
    willAdd(){
      this.info.isshow=true,
      this.info.isAdd=true
    },
    edit(uid){
      this.info.isshow=true;
      this.info.isAdd=false;
      console.log(uid)
      console.log(this.$refs.add);
      
      //让add组件发起获取详情的请求
      this.$refs.add.look(uid)
    }
  },
  mounted() {
  }
};
</script>
<style scoped>
</style>