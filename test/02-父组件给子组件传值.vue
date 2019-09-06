<template>
  <div>
      <h3>son</h3>
      <input type="text" v-model="txt" @input="$emit('change',txt)">
  </div>
</template>

<script>
export default {
    //
    props:['txt']
}
</script>

<style>

</style>