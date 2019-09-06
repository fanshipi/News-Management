<template>
  <div>
    <h3>son</h3>
    <input type="text" @input="write" v-model="txt" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      txt: ""
    };
  },
  methods: {
      write() {
          this.$emit('change',this.txt)
      }
  }
};
</script>

<style>
</style>