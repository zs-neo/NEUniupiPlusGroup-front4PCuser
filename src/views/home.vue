<template>
  <div class="home">
    <NavHeader></NavHeader>
    <router-view></router-view>
  </div>
</template>
<script>

import NavHeader from '../components/NavHeader.vue'
export default {
  components:{
    NavHeader,
  }
}
</script>
<style scoped>
  .home{
    width: inherit;
    /* height: calc(100vh); */
  }
</style>
