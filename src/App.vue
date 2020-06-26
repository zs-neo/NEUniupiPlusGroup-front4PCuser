<template>
  <div id="app">
    <Header></Header>
      <router-view :seller="seller"></router-view>
  </div>
</template>

<script>

  import Header from 'components/header/TopHeader.vue';
  import {urlParse} from 'common/js/util';
  const response = require('./common/data/seller.json');

  const ERR_OK = 0;
  export default {
    components: {
      'Header': Header
    },
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {

      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
      }
    },
  };

</script>

<style>
</style>
