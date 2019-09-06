<template>
  <el-select :value="chanel_id" placeholder="请选择频道" @change="toFather($event)">
    <el-option label="所有频道" value></el-option>
    <el-option v-for="item in channelList" :label="item.name" :value="item.id" :key="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: "ttchannels",
  props: ["chanel_id"],
  model: {
    prop: "chanel_id",
    event: "change"
  },
  data() {
    return {
      channelList: [],
    };
  },
  created() {
    this.$axios.get("/mp/v1_0/channels").then(res => {
      // console.log(res);
      this.channelList = res.data.data.channels;
    });
  },
  methods: {
    toFather(e) {
      // console.log(e);
      this.$emit('change',e);
    }
  }
};
</script>

<style>
</style>