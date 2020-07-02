<template>
  <div class="coupon-rule">
<ul>

                <li class="fore1">
                    <a href="javascript:;"  @click="goToUseRule()" >
                        <b class="rule-icon"></b><span>优惠券使用规则</span>
                    </a>
                </li>
                <li class="fore1">
                    <a  href="javascript:;"  @click="goToCouponCenter()" >
                        <b class="rule-icon1"></b><span>领券中心</span>
                    </a>
                </li>
                <li class="fore1">
                    <a  href="javascript:;"  @click="goToExchangeScore()">
                        <b class="rule-icon2"></b><span>积分兑换红包</span>
                    </a>
                </li>
            </ul>
</div>
</template>

<script>

  export default {
    name: 'CouponHeader',
    methods:{
      goToUseRule(){
         this.$router.push('/login')
      },
      goToCouponCenter(){
         this.$router.push('/couponcenter')
      },
      goToExchangeScore(){
         this.$router.push('/scoreCenter')
      },

    },

    }
</script>

<style>
  .coupon-rule {
      line-height: 20px;
      font-family: "Microsoft YaHei";
      font-size: 16px;
      color: #333;
  }
  .coupon-rule ul {

      display: block;
  }

  .fore1{
    float: left;
     width: 33%;
     text-align: center;
     border-right: 1px solid #f5f5f5
  }

  .coupon-rule .rule-icon2 {
    display: block;
    width: 55px;
    height: 60px;
    margin: 20px auto 10px;
    background: url(../../../public/imgs/coupon/couponscore.png) no-repeat;
    overflow: hidden;
}
  .coupon-rule .rule-icon1{
    display: block;
    width: 55px;
    height: 60px;
    margin: 20px auto 10px;
    background: url(../../../public/imgs/coupon/couponcenter.png) no-repeat center;;
    overflow: hidden;
}
  .coupon-rule .rule-icon{
    display: block;
    width: 55px;
    height: 60px;
    margin: 20px auto 10px;
    background: url(../../../public/imgs/coupon/couponhelp.png) no-repeat center;
    overflow: hidden;
}
</style>
