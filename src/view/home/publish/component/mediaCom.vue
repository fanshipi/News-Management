<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-radio-group v-model="radio1" size="medium" @change="statusChange">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
        <el-upload
          class="upload-demo"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :headers="headers"
          :on-success="successUp"
          name="image"
          :file-list="fileList"
          style="float:right"
        >
          <!-- <el-button size="small" type="primary">点击上传</el-button> -->
        </el-upload>
      </div>

      <el-row :gutter="20" v-loading="isLoading">
        <el-col :span="8" v-for="(item,index) in imgList" :key="index">
          <el-card :body-style="{ padding: '0px' }" style="margin-bottom:15px;">
            <div style="height:100px;display:flex;justify-content:center;align-items:center" class="mask" @click='selectTo(item)' :class="{checked:item.id==currentId}">
              <img :src="item.url" class="image " />
            </div>
          
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="12"
      @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script>
import { all } from "q";
import { userInfo } from "os";
export default {
  name: "mediaCom",
  data() {
    return {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(window.sessionStorage.getItem("user_info")).token
        }`
      },
      radio1: "全部",
      fileList: [],
      imgList: [],
      total: 0,
      isLoading: false,
      is_collected: false
      ,currentId:''
    };
  },
  created() {
    this.loadData(1);
  },
  methods: {
      selectTo(item) {
          this.currentId = item.id 
        //   传值到封面
        this.$emit('checked',item.url)
      },
     // 文件上传成功后显示到页面
    successUp() {
      this.loadData();
    },
  
  
   
    // 收藏与全部切换
    statusChange() {
      // 
      this.loadData()
    },
    // 点击页码
    handlePageChange(page) {
      // alert(page);
      this.loadData(page);
    },
    loadData(page) {
      this.isLoading = true;
      this.$axios
        .get("/mp/v1_0/user/images", {
          params: {
            collect: this.radio1 == "收藏",
            // 若为收藏则true
            page: page,
            per_page: 12
          }
        })
        .then(res => {
          // console.log(res);
          this.imgList = res.data.data.results;
          this.total = res.data.data.total_count;
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.image {
  max-width: 100%;
  max-height: 100%;
}
.mytooltip {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mask{
    position: relative;
}
.mask.checked::before {
    content:'';
    position: absolute;
    left: 0;
    right:0;
    top:0;
    bottom:0;
    background: rgba(0,0,0,0.5);
    background-image: url(data:image/png;base64,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);
    background-position: right top;
    background-repeat: no-repeat;
    background-size: 40px;
}
</style>