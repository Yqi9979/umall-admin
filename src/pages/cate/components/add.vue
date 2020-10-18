<template>
  <div class="add">
    <el-dialog 
    :title="info.isAdd?'添加商品分类':'编辑商品分类'" 
    :visible.sync="info.isshow" 
    @closed="close"
    >
      <el-form :rules="rules" ref="valiForm" :model="form" label-width="80px">
        <el-form-item label="上级分类" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option 
              v-for="item in cateList" 
              :key="item.id" 
              :label="item.catename" 
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

         <el-form-item label="分类名称" prop="catename">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>

        <!-- 上传图片 start-->
        <el-form-item label="图片" v-if="form.pid!=0" >
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
import { reqCateAdd, reqCateInfo, reqCateDeit } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl:"",
      form: {
        pid: 0,
        catename: "",
        img:null,
        status: 1
      },
      rules:{
        pid:[{required:true,messsage:'请选择上级分类',trigger:'blur'}],
        catename:[{required:true,message:'请输入分类名称',trigger:'blur'}],
       
      }
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/cateList"
    })
  },
  methods: {
    ...mapActions({
      reqCateListAction: "cate/reqCateListAction"
    }),
    // 获取图片文件
    getFile(e){
        console.log(e)
        let file = e.raw
        // 1.大小不超过2M 1M=1024KB 1KB=1024B
        if (file.size > 2 * 1024 * 1024) {
          this.$message.error("文件不能超过2M");
          return;
        }

        // 2.是图片
        let imgExtArr = [".jpg", ".png", ".jpeg", ".gif"];
        let extname = file.name.slice(file.name.lastIndexOf(".")); // '.jpg'
        if (!imgExtArr.some(item => item === extname)) {
          this.$message.error("文件格式不正确");
          return;
        }
        // URL.createObjectURL() 可以通过文件生成一个地址
        this.imageUrl = URL.createObjectURL(file)
        this.form.img = file
        console.log(this.form.img)
    },
    // 取消，弹框消失
    cancel() {
      this.info.isshow = false;
    },
    // 关闭弹框，下次打开之前，是不是添加
    close() {
      // 如果不是添加，清除form数据
      if (!this.info.isAdd) {
        this.reset();
      }
    },
    // 重置
    reset() {
      this.form={
        pid: 0,
        catename: "",
        img:null,
        status: 1
      },
      this.imgUrl=""

    },
    // 添加
    add() {
      console.log(this.form)
      this.$refs.valiForm.validate(valid => {
        if (!valid) return;
        reqCateAdd(this.form).then(res => {
          if ((res.data.code = 200)) {
            // 添加成功打印
            successAlert(res.data.msg);
            // 清空输入框
            this.reset();
            // 弹框消失
            this.cancel();
            // 刷新list列表
            this.reqCateListAction();
          } else {
            // 添加失败打印
            warningAlert(res.data.msg);
          }
        });
      });
    },

    // 获取一条菜单数据
    look(id) {
      // 发送请求
      reqCateInfo(id).then(res => {
        if (res.data.code == 200) {
          console.log(res)
          successAlert(res.data.msg)
          this.form = res.data.list;
          this.form.id = id;
          this.imageUrl=this.$imgPre + this.form.img
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改数据
    update() {
      this.$refs.valiForm.validate(valid => {
        if (!valid) return;
        // 发送请求
        reqCateDeit(this.form).then(res => {
          // 修改成功
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            // 更新数据
            this.reset();
            // 关闭弹框
            this.cancel();
            // 更新列表数据
            this.reqCateListAction();
          } else {
            warningAlert(res.data.msg);
          }
        });
      });
    }
  },
  mounted() {
    this.reqCateListAction();
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