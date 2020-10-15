<template>
  <div class="add">
    <el-dialog
      :title="info.isAdd?'添加商品':'编辑商品'"
      :visible.sync="info.isshow"
      @closed="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
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
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <!-- 上传图片 start-->
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 上传图片 end -->

        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in skuList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value disabled></el-option>
            <el-option v-for="item in goodsAttrList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <!-- <textarea name id cols="30" rows="10"></textarea> -->
          <div v-if="info.isshow" id="editor"></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqGoodsAdd,
  reqGoodsInfo,
  reqGoodsEdit,
  reqCateList
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], // 转换格式
        isnew: 1,
        ishot: 1,
        status: 1
      },
      // 二级分类list
      secondCateList: [],
      // 商品属性 list
      goodsAttrList: []
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList",
      skuList: "sku/skuList",
      goodsList: "goods/goodsList"
    })
  },
  methods: {
    ...mapActions({
      reqCateListAction: "cate/reqCateListAction",
      reqSkuListAction: "sku/reqSkuListAction",
      reqGoodsListAction: "goods/reqGoodsListAction"
    }),
    // 一级分类
    changeFirst() {
      //一级分类变了，二级分类的值置空
      this.form.second_cateid = "";
      this.getSecondList();
    },
    // 获取二级分类数据
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then(res => {
        // console.log(res.data.list);
        this.secondCateList = res.data.list;
      });
    },

    // 商品规格
    changeSpecs() {
      this.form.specsattr=[];
      this.getAttrsArr();
    },
    // 商品属性
    getAttrsArr() {
      let obj = this.skuList.find(item => item.id == this.form.specsid);
      this.goodsAttrList = obj.attrs;
    },

    // 获取图片文件
    getFile(e) {
      console.log(e);
      let file = e.raw;
      // URL.createObjectURL() 可以通过文件生成一个地址
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
      console.log(this.form.img);
    },
    // 取消，弹框消失
    cancel() {
      this.info.isshow = false;
    },
    //打开弹框完成,获取富文本
    opened() {
      // 创建富文本
      this.editor = new E("#editor");
      this.editor.create();
      // 点击编辑赋值给富文本
      this.editor.txt.html(this.form.description);
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
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1
      },
      this.imageUrl = "";
    },

    // 点击添加完成
    add() {
      // 将富文本的值赋给form
      this.form.description = this.editor.txt.html();
      // 将规格属性转为字符串，富文本双向数据绑定，使用展开运算法
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr)
      };
      // 发送请求
      reqGoodsAdd(data).then(res => {
        if ((res.data.code = 200)) {
          // 添加成功打印
          successAlert(res.data.msg);
          // 清空输入框
          this.reset();
          // 弹框消失
          this.cancel();
          // 刷新list列表
          this.reqGoodsListAction();
        } else {
          // 添加失败打印
          warningAlert(res.data.msg);
        }
      });
    },
    // 点击编辑，获取一条商品数据
    look(id) {
      // 发送请求
      reqGoodsInfo(id).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.form = res.data.list;
          this.form.id=id
          // 请求二级分类的list
          this.getSecondList();
          // 商品属性转为[]数组
          this.form.specsattr = JSON.parse(this.form.specsattr);
          // 请求图片
          this.imageUrl = this.$imgPre + this.form.img;
          // 获取商品属性的数组
          this.getAttrsArr();

        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改数据
    edit() {
      // 将富文本的值赋给form
      this.form.description = this.editor.txt.html();
      // 将规格属性转为字符串，使用展开运算法
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr)
      };
      console.log(data)
      // 发送请求
      reqGoodsEdit(data).then(res => {
        console.log(res)

        // 修改成功
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 更新数据
          this.reset();
          // 关闭弹框
          this.cancel();
          // 更新列表数据
          this.reqGoodsListAction();
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
    // 请求 sku 商品规格页面
    this.reqSkuListAction(true);
  }
};
</script>
<style lang="stylus" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>