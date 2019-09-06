<template>
  <div>
    <h3>...{{msg}}</h3>
    <!-- <son :txt='msg' @write='msg = $event'></son> -->
    <son v-model="msg"></son>
  </div>
</template>

<script>
import son from './03双向绑定子'
export default {
  components:{
    son
  },
  data() {
    return {
      msg :''
    }
  },
  // methods :{
  //   cha(val) {
  //     this.msg = val 
  //   }
  // }
}
</script>

<style>

</style>