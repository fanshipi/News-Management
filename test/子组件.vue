<template>
  <div>
    <h3> son</h3>
    <button @click="change">click</button>
  </div>
</template>

<script>
export default {
    methods:{
        change(){
            this.$emit('current-change',2)
        }
    }
};
</script>

<style>
</style>