<template>
  <div class="add">
    <el-dialog :title="info.isAdd?'添加活动':'编辑活动'" :visible.sync="info.isshow" @closed="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="活动时间" >
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" @change="changeSecond">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in threeGoodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="this.info.isAdd">添 加</el-button>
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqSeckAdd,
  reqSeckInfo,
  reqSeckEdit,
  reqCateList,
  reqGoodsList
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
       pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      form: {
        title: "",
        beginitime: null,
        endtime:null,
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      // 二级分类list
      secondCateList: [],
      // 三级分类list
      threeGoodsList: [],
      // 日期设置初始化
      value1:''
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
      goodsList: "goods/goodsList",
      seckList: "seck/seckList"
    })
  },
  methods: {
    ...mapActions({
      reqCateListAction: "cate/reqCateListAction",
      reqGoodsListAction: "goods/reqGoodsListAction",
      reqSeckListAction: "seck/reqSeckListAction"
    }),
    // 一级分类
    changeFirst() {
      //一级分类变了，二级分类的值置空
      this.form.second_cateid = "";
      (this.form.goodsid = ""), this.getSecondList();
    },
    // 获取二级分类数据
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then(res => {
        this.secondCateList = res.data.list;
      });
    },
    // 二级分类变了，三级分类值置空
    changeSecond() {
      (this.form.goodsid = ""), this.getThreeLit();
    },
    // 获取三级分类数据
    getThreeLit() {
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      }).then(res => {
        this.threeGoodsList = res.data.list;
      });
    },
    // 取消，弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 关闭弹框，下次打开之前，判断是不是添加
    close() {
      // 如果不是添加，清除form数据
      if (!this.info.isAdd) {
        this.reset();
      }
    },
    // 重置数据
    reset() {
      (this.form = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      }),
        (this.secondCateList = "");
    },

    // 点击添加完成
    add() {
      this.form.begintime = new Date(this.value1[0]).getTime() + ''
      this.form.endtime = new Date(this.value1[1]).getTime() + ''
      // 发送请求
      reqSeckAdd(this.form).then(res => {
        if ((res.data.code = 200)) {
          // 添加成功打印
          successAlert(res.data.msg);
          // 清空输入框
          this.reset();
          // 弹框消失
          this.cancel();
          // 刷新list列表
          this.reqSeckListAction();
        } else {
          // 添加失败打印
          warningAlert(res.data.msg);
        }
      });
    },
    // 点击编辑，获取一条商品数据
    look(id) {
      // 发送请求
      reqSeckInfo(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 时间戳
          res.data.list.begintime = new Date(Number(res.data.list.begintime))
          res.data.list.endtime = new Date(Number(res.data.list.endtime))
          this.form = res.data.list;
          this.form.id = id
          // 请求二级分类的list
          this.getSecondList();
          // 获取三级级商品
          this.getThreeLit();
          this.value1 = [this.form.begintime + '', this.form.begintime + '']
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改数据
    edit() {
      console.log(this.form);
      this.form.begintime = new Date(this.value1[0]).getTime() + ''
      this.form.endtime = new Date(this.value1[1]).getTime() + ''
      // 发送请求
      reqSeckEdit( this.form).then(res => {
        console.log(res);
        // 修改成功
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 更新数据
          this.reset();
          // 关闭弹框
          this.cancel();
          // 更新列表数据
          this.reqSeckListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    // 请求cate 商品分类页面
    if (this.cateList.length == 0) {
      this.reqCateListAction();
    }
    // 请求seck 列表数据
    this.reqSeckListAction();
  }
};
</script>
<style lang="stylus" scoped>

</style>