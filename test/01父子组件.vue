<template>
  <dir>
      <h3>father</h3>
      <son @current-change='chan'></son>
  </dir>
</template>

<script>
import son from './子组件';
import { all } from 'q';
export default {
    components:{
        son
    },methods : {
        chan(val){
            alert(val)
        }
    }
}
</script>

<style>

</style>