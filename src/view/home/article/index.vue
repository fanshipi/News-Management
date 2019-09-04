<template>
  <el-card class="box-card">
    <div class="clearfix" slot="header">
      <el-form ref="form" :model="searchParams" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="searchParams.status">
            <el-radio label>全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <ttchannels></ttchannels>
        </el-form-item>

        <el-form-item label="时间">
          <el-date-picker
            v-model="searchParams.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="searching">筛选</el-button>
        </el-form-item>
      </el-form>
    </div>

    <p>
      共找到
      <b>{{total}}</b>条符合条件的内容
    </p>

    <el-table :data="tableData" style="width: 100%;padding-right:10px;" v-loading="loading">
      <el-table-column label="封面" width="213" prop="cover.images[0]">
        <template slot-scope="scope">
          <img width="60px" :src="scope.row.cover.images[0]" alt />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="213"></el-table-column>
      <el-table-column prop="status" label="状态" width="213">
        <template slot-scope="scope">
          <el-tag>{{scope.row.status | formatStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="pubdate" label="发布时间"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
    <el-pagination
      :disabled="loading"
      background
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */

import ttchannels from "../../../components/ttchannels/";
export default {
  components: {
    ttchannels
  },
  name: "articlesList",
  data() {
    return {
      // channelList:[],
      loading: false,
      total: 0,
      searchParams: {
        date: "",
        status: "",
        chanel_id: ""
      },
      tableData: []
    };
  },
  methods: {
    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除按钮
    handleDelete(row) {
      // console.log(row);

      this.$confirm("确认删除该内容吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消删除"
      })
        .then(() => {
          this.$axios.delete(`/mp/v1_0/articles/${row.id}`).then(res => {
            this.loadTableData(1);
          });
          this.$message({
            type: "delete",
            message: "确认删除"
          });
        })
        .catch(action => {
          this.$message({
            type: "delete",
            message:
              action === "cancel" ? "放弃删除并离开页面" : "停留在当前页面"
          });
        });

      // this.$axios.delete(`/mp/v1_0/articles/${row.id}`).then(res => {
      //   this.loadTableData(1);
      // });
    },

    searching() {
      this.loadTableData(1);
      // console.log(this.searchParams.date);
      // this.$axios.get('/mp/v1_0/articles',{
      //   params: {
      //     status:this.searchParams.status === ""?undefined:this.searchParams.status,
      //     chanel_id:this.searchParams.chanel_id === ""?undefined:this.searchParams.chanel_id,
      //     begin_pubdate:this.searchParams.date[0],
      //     end_pubdate:this.searchParams.date[1],
      //     page:1
      //   }
      // }).then(res=>{
      //   console.log(res);
      //   this.tableData = res.data.data.results;
      //   this.total = res.data.data.total_count
      // })
    },

    // 函数封装
    loadTableData(page) {
      this.loading = true;
      // 点击的是第几页
      // 点击该页码显示相应页码的数据
      // let res = JSON.parse(window.sessionStorage.getItem("user_info"));
      // let token = res.token;
      // console.log(token);

      const status =
        this.searchParams.status === "" ? undefined : this.searchParams.status;
      const chanel_id =
        this.searchParams.chanel_id === ""
          ? undefined
          : this.searchParams.chanel_id;
      this.$axios
        .get("/mp/v1_0/articles", {
          // headers: {
          //   Authorization: `Bearer ${token}`
          // },
          params: {
            status,
            chanel_id,
            begin_pubdate: this.searchParams.date[0],
            end_pubdate: this.searchParams.date[1],
            page: page
          }
        })
        .then(res => {
          // console.log(res);
          this.tableData = res.data.data.results;
          this.total = res.data.data.total_count;

          // 数据加载完
          this.loading = false;
        })
        .catch(err => {});
    },
    // 分页
    handleCurrentChange(page) {
      this.loadTableData(page);
    }
  },

  // 频道的分类
  created() {
    this.loadTableData(1);

    // this.$axios.get('/mp/v1_0/channels')
    // .then(res=>{
    //   // console.log(res);
    //   this.channelList = res.data.data.channels
    // })
  },
  // 状态的过滤
  filters: {
    formatStatus(status) {
      switch (status) {
        case 0:
          return "草稿";
        case 1:
          return "待审核";
        case 2:
          return "审核通过";
        case 3:
          return "审核失败";
        case 4:
          return "已删除";
      }
    }
  }
};
</script>

<style>
</style>