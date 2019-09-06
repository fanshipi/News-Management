<template>
  <div>
      <h3>father</h3>
      <p>msg:{{msg}}</p>
      <!-- <son :txt="msg" @change="msg = $event"></son> -->
      <son v-model="msg"></son>
  </div>
</template>

<script>
import son from './04ModelS.vue'
export default {
    components:{
        son
    },
    data(){
        return {
            msg:''
        }
    }
}
</script>

<style>

</style>