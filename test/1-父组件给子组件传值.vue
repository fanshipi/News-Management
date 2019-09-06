<template>
  <div>
    <h3>father</h3>
    <input type="text" v-model="message">
    <son :txt='message' @change='message=$event'></son>
  </div>
</template>

<script>
import son from './02-父组件给子组件传值'
export default {
  components:{
    son
  },
  data() {
    return {
      message:''
    }
  }
}
</script>

<style>

</style>