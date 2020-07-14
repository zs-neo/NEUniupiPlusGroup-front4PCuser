<template>

<div style=" display: inline">
  <div :key="fit">

    <img
      style="width: 120px; height: 120px ;margin-left: 12%;"
      src="../../../public/imgs/logo.jpg"
      :fit="fit"></img>
      <div class="title">
        <span >领劵中心</span>
      </div>

      <div class="search bar">

          <form>
<!--              <label style="font-size: 18px;">优惠卷</label> -->
              <input placeholder="" name="cname" type="text">

                <el-button type="primary" style="margin-left: 5px;">搜索</el-button>
                <el-button type="warning" plain >重置</el-button>

          </form>
      </div>
  </div>

<div id="settleup-2014-quan" class="dorpdown ">
        <div id="myquan">
            <div class="quan-dropdown">
                <div class="dt">
                    <s></s>

                    <el-link type="danger" :underline="false" @click="toMycoupon"><span class="txt">我的优惠券</span></el-link>
                    <b></b>
                </div>

            </div>
        </div>
    </div>


   <el-divider></el-divider>
</div>
</template>

<script>

   export default {
      data() {
        return {
          fit: 'fill',
          url: '../../../public/imgs/logo.jpg'
        }
      },
      methods:{
        //页面跳转到我的优惠卷
        toMycoupon(){
           this.$router.push(`/clientCenter/myCoupon`);
        },


      },

    }



</script>

<style scoped>

  div.search {

      padding:10px 0;
      margin-left:35%;
      margin-top: -80px;
      form {

          position:relative;
          width:500px;
          margin:0 auto;
      }
  }

  .bar input {
      border:2px solid #FF6600;
      height:42px;
      background:transparent;
      top:0;
      right:0;
      width:35%;
  }
    .title{
        font-size: 30px;
        font-weight: bold;
        margin-left: 20%;
        position: absolute;

        margin-top: -75px;
    }

    #myquan {
        width: 139px;
        height: 34px;
        border: 1px solid #DFDFDF;
        padding: 0;
        background: #F9F9F9;
        text-align: center;
        line-height: 34px;
        font-family: "Microsoft YaHei";
    }

    #myquan .dt {
        padding-left: 19px;
        text-align: left;
    }
    #myquan .dt s {
        width: 16px;
        height: 18px;
        margin-right: 8px;
        background-position: -52px -192px;
    }
    #myquan .dt b, #myquan .dt s, #quan-search .ci-right, #quan-search.hover .i-quan .select b {
        background-image: url(//misc.360buyimg.com/user/quan/3.0.0/css/i/quan-icons.png);
        background-repeat: no-repeat;
    }
    #myquan .dt b, #myquan .dt s {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: middle;
    }
    #myquan .dt b {
        width: 6px;
        height: 9px;
        margin-left: 13px;
        background-position: -141px 0;
    }
    #myquan .dt b, #myquan .dt s {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        vertical-align: middle;
    }
    #myquan .dt b, #myquan .dt s, #quan-search .ci-right, #quan-search.hover .i-quan .select b {
        background-image: url(//misc.360buyimg.com/user/quan/3.0.0/css/i/quan-icons.png);
        background-repeat: no-repeat;
    }
    .root61 #settleup-2014-quan {
        margin-right: 65px;
    }
    #settleup-2014-quan {
        float: right;
        z-index: 11;
        height: 36px;
        margin-top: -50px;
        margin-right: 18%;
    }
    .dorpdown {
        position: relative;
    }
</style>
