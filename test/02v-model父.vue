<template>
  <div>
      <h3>father</h3>
      <h3>显示信息：{{msg}}</h3>
      <son @change='inpu'></son>
  </div>
</template>

<script>
import son from './v-model子'
import { all } from 'q';
export default {
    components:{
        son
    },
    data() {
        return {
            msg:""
        }
    },methods:{
        inpu(val){
            this.msg = val
        }
    }
}
</script>

<style>

</style>