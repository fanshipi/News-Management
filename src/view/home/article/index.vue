<template>
  <el-card class="box-card">
    <div class="clearfix" slot="header">
      <el-form ref="form" :model="searchParams" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="searchParams.status">
            <el-radio :label="3">全部</el-radio>
            <el-radio :label="6">草稿</el-radio>
            <el-radio :label="9">待审核</el-radio>
            <el-radio :label="12">审核通过</el-radio>
            <el-radio :label="15">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="searchParams.chanel_id" placeholder="请选择活动区域">
            <el-option label="所有频道" value></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间">
          <el-date-picker
            :model="searchParams.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>

    <p>
      共找到
      <b>{{total}}</b>条符合条件的内容
    </p>

    <el-table :data="tableData" style="width: 100%;padding-right:10px;" v-loading="loading">
      <el-table-column label="封面" width="213">
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
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
export default {
  name:'articles',
  data() {
    return {
      loading:false,
      total: "",
      searchParams: {
        date: "",
        status: 3,
        chanel_id: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 函数封装
    loadTableData(page) {
      this.loading = true
        // 点击的是第几页
      // 点击该页码显示相应页码的数据
      // let res = JSON.parse(window.sessionStorage.getItem("user_info"));
      // let token = res.token;
      // console.log(token);
      this.$axios
        .get("/mp/v1_0/articles", {
          // headers: {
          //   Authorization: `Bearer ${token}`
          // },
          params:{
            page:page
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
    handleCurrentChange(page) {
      this.loadTableData(page)
    }
  },

  created() {
   this.loadTableData(1);
  },
  filters: {
    formatStatus(status) {
      switch (status) {
        case 1:
          return "草稿";
        case 2:
          return "待审核";
        case 3:
          return "审核通过";
        case 4:
          return "已删除";
      }
    }
  }
};
</script>

<style>
</style>