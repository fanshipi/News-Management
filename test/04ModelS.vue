<template>
  <div>
      <h3>son</h3>
      <input type="text" :value="txt" @input="toFather($event)">
  </div>
</template>

<script>
export default {
    props:['txt'],
    model:{
        prop:'txt',
        event:'change'
    },
    methods:{
        toFather(e) {
            this.$emit('change',e.target.value)
        }
    }
}
</script>

<style>

</style>