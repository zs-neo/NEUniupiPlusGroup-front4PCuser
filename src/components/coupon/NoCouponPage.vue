<template>

<div class="coupon-empty-box">
          <img class="e-icon"src="../../../public/imgs/logo.jpg"></img>
          <div class="txt">哦噢~小主一张券都没有，快去抢几张~</div>
          <div class="op-btns mt20">
              <a  href="javascript:;"  @click="goToCouponCenter()"  class="btn-1" clstag="pageclick|keycount|mycoupon_new_201610184|34">去领券中心</a>
          </div>
      </div>
</template>

<script>
  export default {
    name: 'NoCouponPage',
    methods:{

      goToCouponCenter(){
         this.$router.push('/couponcenter')
      },
    },

    }
</script>

<style scoped>
  .coupon-empty-box {
      min-height: 360px;
      text-align: center;
  }
  .coupon-empty-box .e-icon {
      display: block;
      width: 190px;
      height: 190px;
      margin: 70px auto 20px;

      overflow: hidden;
  }
  .coupon-empty-box .txt {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      line-height: 20px;
  }
  .mt20 {
      margin-top: 20px;
  }
  .btn-1:link, .btn-1:visited, .btn-2:link, .btn-2:visited, .btn-3:link, .btn-3:visited, .btn-4:link, .btn-4:visited {
      color: #fff;
      text-decoration: none;
  }
  .coupon-empty-box .btn-1 {
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      width: 118px;
      padding: 0;
  }

  .btn-1, .btn-2, .btn-3, .btn-4 {
      background-color: #e74649;
      background-image: -moz-linear-gradient(top,#e74649,#df3134);
      background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#e74649),color-stop(1,#df3134));
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e74649', endColorstr='#df3134', GradientType='0');
      -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e74649', endColorstr='#df3134');
      background-image: linear-gradient(to bottom,#e74649 0,#df3134 100%);
      border-radius: 2px;
      display: inline-block;
      *display: inline;
      *zoom: 1;
      height: 18px;
      line-height: 18px;
      padding: 3px 15px 4px;
      color: #fff;
  }
</style>
