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
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>

      <el-row :gutter="20" v-loading="isLoading">
        <el-col :span="4" v-for="(item,index) in imgList" :key="index">
          <el-card :body-style="{ padding: '0px' }" style="margin-bottom:15px;">
            <div style="height:160px;display:flex;justify-content:center;align-items:center">
              <img :src="item.url" class="image" />
            </div>
            <div style="background-color:#f4f5f6;margin-top:8px;" class="mytooltip">
              <el-tooltip content="收藏" placement="top">
                <el-button style="border:none;background-color:#f4f5f6;" @click="collect(item)">
                  <i :class="item.is_collected?'el-icon-star-on':'el-icon-star-off'"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button style="border:none;background-color:#f4f5f6;" @click="canCollect(item)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
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
  name: "media",
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
    };
  },
  created() {
    this.loadData(1);
  },
  methods: {
    // 文件上传成功后显示到页面
    successUp() {
      this.loadData();
    },
    // canCollect
    canCollect(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/mp/v1_0/user/images/${item.id}`).then(res => {
            // console.log(res);
            this.loadData();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // collect
    collect(item) {
      item.is_collected = !item.is_collected;
      this.$axios
        .put(`/mp/v1_0/user/images/${item.id}`, {
          collect: item.is_collected
        })
        .then(res => {
          console.log(res);
          // this.loadData()
          // 改变谁就改谁
        });
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
</style>