<template>
  <el-container>
    <el-aside width="430px">
      <el-form
        :model="userInfo"
        ref="userInfo"
        label-width="80px"
        class="demo-ruleForm"
        label-position="top"
      >
        <el-form-item label="媒体名称">
          <el-input v-model="userInfo.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="媒体简介">
          <el-input v-model="userInfo.intro" size="small" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="头条号id">
          <el-input v-model="userInfo.id" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="绑定手机">
          <el-input v-model="userInfo.mobile" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" size="small"></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="doSave">保存更新</el-button>
    </el-aside>
    <el-main>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :http-request = 'uploadPic'
        :show-file-list="false"
      >
        <img v-if="$store.state.userInfo.photo" :src="$store.state.userInfo.photo" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "account",
  data() {
    return {
      headers:{
        Authorization:`Bearer ${JSON.parse(window.sessionStorage.getItem('user_info')).token}`
      },
      userInfo: {
        name: "",
        intro: "",
        id: "",
        mobile: "",
        email: "",
        photo:''
      }
    };
  },
  methods: {
    doSave() {
      // 保存更改
      // 发送请求
      this.$axios
        .patch("/mp/v1_0/user/profile", this.userInfo)
        .then(res => {
          console.log(res);
          if (res.data.message.toLowerCase() == "ok") {
            this.$message.success("修改成功");
          } else {
            this.$message.error("修改失败");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("修改失败");
        });
    },

    // http-request覆盖默认的上传行为，可以自定义上传的实现
    // 运用FormData
    uploadPic(data){
      let fm = new FormData()
      fm.append('photo',data.file)
      this.$axios.patch('/mp/v1_0/user/photo',fm)
      .then(res=>{
        console.log(res);
        this.userInfo.photo = res.data.data.photo
        
        this.$store.commit('changeUserInfo',this.userInfo.photo)

      })
    }
  },
  created() {
    // 显示账户信息
    this.$axios.get("/mp/v1_0/user/profile").then(res => {
      // console.log(res);
      this.userInfo = res.data.data;
      this.$store.commit('changeUserInfo',this.userInfo)
    });
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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