<template>
  <div class="index">

   <div>
        <h1 >领劵中心</h1>
    <div class="search bar6">
      <div style="display: inline;">

        <form>

            <input type="text" placeholder="请输入您要搜索的内容...">
            <button type="submit"></button>

        </form>
</div>
    </div>
    </div>
  <div class="container">

    <div class="img">
    <img class="imgclass"  src="../../../public/imgs/slider/slide-5.jpg"><img>

   <img class="imgclass1"  src="../../../public/imgs/slider/slide-2.jpg"><img>

    </div>

<div style="margin-left: 90px;">
  <div class="font">
<center>为你推荐好卷</center>
</div>
<div class="coupon coupon-wave-left coupon-yellow">
	<div class="coupon-info coupon-hole coupon-info-right-dashed">
		<div class="coupon-price">&yen;5.00</div>
		<div class="coupon-desc">5元优惠券满50.00元使用</div>
		<div class="coupon-expiry-date">有效期：2018.12.01-2018.12.12</div>
	</div>
	<div class="coupon-get coupon-get-already">立即领取</div>
</div>

<div class="coupon coupon-yellow">
	<div class="coupon-info coupon-wave-right">
		<div class="coupon-price">&yen;5.00</div>
		<div class="coupon-desc">5元优惠券满50.00元使用</div>
		<div class="coupon-expiry-date">有效期：2018.12.01-2018.12.12</div>
	</div>
	<div class="coupon-get">立即领取</div>
</div>

<div class="coupon coupon-wave-left coupon-wave-right coupon-yellow-gradient">
	<div class="coupon-info coupon-info-right-dashed">
		<div class="coupon-store">XXXXXX旗舰店</div>
		<div class="coupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="coupon-description">订单满50.00元</div>
	</div>
	<div class="coupon-get">
		<div class="coupon-desc">副券</div>
		<div class="coupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>

<div class="coupon coupon-wave-left coupon-wave-right coupon-red-gradient">
	<div class="coupon-info coupon-info-right-dashed">
		<div class="coupon-store">XXXXXX旗舰店</div>
		<div class="coupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="coupon-description">订单满50.00元</div>
	</div>
	<div class="coupon-get">
		<div class="coupon-desc">副券</div>
		<div class="coupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>

<div class="coupon coupon-wave-left coupon-wave-right coupon-green-gradient">
	<div class="coupon-info coupon-info-right-dashed">
		<div class="coupon-store">XXXXXX旗舰店</div>
		<div class="coupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="coupon-description">订单满50.00元</div>
	</div>
	<div class="coupon-get">
		<div class="coupon-desc">副券</div>
		<div class="coupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>

<div class="coupon coupon-wave-left coupon-wave-right coupon-blue-gradient">
	<div class="coupon-info coupon-info-right-dashed">
		<div class="coupon-store">XXXXXX旗舰店</div>
		<div class="coupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="coupon-description">订单满50.00元</div>
	</div>
	<div class="coupon-get">
		<div class="coupon-desc">副券</div>
		<div class="coupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>
</div>

    </div>



    <ServiceBar></ServiceBar>


  </div>
</template>
<script>
import ServiceBar from '..//ServiceBar'



export default {
  name: 'index',
  components: {

    ServiceBar,

  },
  data () {
    return {

    }
  },

  methods: {}
}
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/config.scss';
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/css/couponcenter';

</style>
