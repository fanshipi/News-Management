<template>
  <div>
    <el-table v-loading='isLoading' :data="tableData" style="width: 100%;padding-right:10px;">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>

      <el-table-column
        prop="comment_status"
        label="评论状态"
        width="180"
      >
      <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
    
      </el-table-column>

      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="评论粉丝数"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
             @change="turn(scope.row)"
          ></el-switch>
          <!--   @click="turn(scope.row)" -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope"><el-button type="primary" plain size="small">修改</el-button></template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40,50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name:'comment',
  data() {
    return {
      tableData: [],
      total:0,
      page:1,
      sizePage:10,
      isLoading:false,
    };
  },
  created() {
   this.loadData()
  },
  methods:{
    loadData(){
      this.isLoading = true;
       this.$axios
      .get("/mp/v1_0/articles", {
        params: {
          page: this.page,
          per_page:this.sizePage,
          response_type: "comment"
        }
      })
      .then(res => {
        // console.log(res);
        this.tableData = res.data.data.results
        this.total = res.data.data.total_count

        this.isLoading = false
      });
    }
    ,
      turn(row) {
          this.$axios.put(`/mp/v1_0/comments/status?article_id=${row.id}`,{
              allow_comment: row.comment_status
          }).then (res=>{
              console.log(res);
          })
      },
      handleSizeChange(size){
        this.sizePage = size;
        // console.log(this.sizePage);
        this.loadData()
      },
      handleCurrentChange(page){
        this.page = page;
        this.loadData()
      },
  }
};
</script>

<style>
</style>