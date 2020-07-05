<template>
  <div>
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
