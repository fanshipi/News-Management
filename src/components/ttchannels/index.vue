<template>
  <el-select v-model="chanel_id" placeholder="请选择频道">
    <el-option label="所有频道" value></el-option>
    <el-option v-for="item in channelList" :label="item.name" :value="item.id" :key="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
    name:'ttchannels',
    data(){
        return {
            channelList:[],
            chanel_id:''
        }
    },
  created() {
    this.$axios.get("/mp/v1_0/channels").then(res => {
      // console.log(res);
      this.channelList = res.data.data.channels;
    });
  }
};
</script>

<style>
</style>