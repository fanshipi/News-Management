<template>
  <div>
    <h3>son</h3>
    <!-- <input type="text" v-model="txt" @input="$emit('write',txt)"> -->
    <input type="text" :value="txt" @input="toFather($event)">
  </div>
</template>

<script>
export default {
  props:['txt'],
  model:{
    prop:'txt',
    event:'write'
  },
  methods: {
    toFather(e) {
      // console.log(e.target.value);
      this.$emit('write',e.target.value)
    }
  }
  // data() {
  //   return {
  //     txt:''
  //   }
  // },

}
</script>

<style>

</style>