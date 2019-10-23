<template>
  <div>
    <div class="myrow" @click="dialogVisible = true">
      <p v-if="!isShowImg">请选择上传图片</p>
      <i v-if="!isShowImg" class="el-icon-upload2"></i>
      <img v-if="isShowImg" :src="imageUrl" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="50%" >
      <template>
        <el-tabs type="card" v-model="activeName">
          <el-tab-pane label="素材库" name="first">
            <mediaCom @checked="imageUrl = $event"></mediaCom>
          </el-tab-pane>
          <el-tab-pane label="图片上传" name="second">
            <el-upload
              class="upload-demo"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :show-file-list="false"
              :headers="headers"
              :on-success="successUp"
              name="image"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="certainly">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mediaCom from "./mediaCom.vue";
import { all } from 'q';
export default {
  components: {
    mediaCom
  },
  data() {
    return {
      isShowImg:false,
       headers: {
        Authorization: `Bearer ${
          JSON.parse(window.sessionStorage.getItem("user_info")).token
        }`
      },
      imageUrl: "",
      activeName: "first",
      dialogVisible: false
    };
  },
  methods: {
    // 点击上传图片
    successUp(res){
      // console.log(res);
      this.imageUrl = res.data.url
    },
    certainly(){
      this.isShowImg=true;
      this.dialogVisible = false;
      // 传值
      this.$emit('changePic',this.imageUrl)
    },
   
  }
};
</script>

<style lang='less' scoped>
.myrow {
  width: 280px;
  height: 260px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  p {
    margin-top: 20px;
  }
  i {
    font-size: 60px;
    color: #ccc;
    margin-top: 40px;
  }
}
</style>