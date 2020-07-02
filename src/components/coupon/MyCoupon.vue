<template>
 <div>

 <Menu mode="horizontal" :theme="theme1" active-key="1">
        <Menu-item key="1">
            <Icon type="ios-paper"></Icon>
            可用优惠卷
        </Menu-item>
        <Menu-item key="2">
            <Icon type="ios-people"></Icon>
            已用优惠卷
        </Menu-item>
        <Menu-item key="3">
            <Icon type="settings"></Icon>
            已过期
        </Menu-item>
        <Submenu key="4">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                筛选
            </template>
            <Menu-group title="排序">
                <Menu-item key="3-1">最优惠</Menu-item>
                <Menu-item key="3-2">即将过期</Menu-item>
                <Menu-item key="3-3">新到账</Menu-item>
            </Menu-group>
        </Submenu>
    </Menu>



<div class="mycoupons">

<div class="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-blue-gradient">
	<div class="mycoupon-info mycoupon-info-right-dashed">
		<div class="mycoupon-store">秘制小厨房</div>
		<div class="mycoupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="mycoupon-description">订单满50.00元</div>
	</div>
	<div class="mycoupon-get">
		<a class="mycoupon-desc" @click="use">立即使用</a>
		<div class="mycoupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>

<div class="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-blue-gradient">
	<div class="mycoupon-info mycoupon-info-right-dashed">
		<div class="mycoupon-store">XXXXXX旗舰店</div>
		<div class="mycoupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="mycoupon-description">订单满50.00元</div>
	</div>
	<div class="mycoupon-get">
		<div class="mycoupon-desc">立即使用</div>
		<div class="mycoupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>


<div class="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-blue-gradient">
	<div class="mycoupon-info mycoupon-info-right-dashed">
		<div class="mycoupon-store">XXXXXX旗舰店</div>
		<div class="mycoupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="mycoupon-description">订单满50.00元</div>
	</div>
	<div class="mycoupon-get">
		<div class="mycoupon-desc">立即使用</div>
		<div class="mycoupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>

<div class="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-blue-gradient">
	<div class="mycoupon-info mycoupon-info-right-dashed">
		<div class="mycoupon-store">XXXXXX旗舰店</div>
		<div class="mycoupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="mycoupon-description">订单满50.00元</div>
	</div>
	<div class="mycoupon-get">
		<div class="mycoupon-desc">立即使用</div>
		<div class="mycoupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>

<div class="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-blue-gradient">
	<div class="mycoupon-info mycoupon-info-right-dashed">
		<div class="mycoupon-store">XXXXXX旗舰店</div>
		<div class="mycoupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="mycoupon-description">订单满50.00元</div>
	</div>
	<div class="mycoupon-get">
		<div class="mycoupon-desc">立即使用</div>
		<div class="mycoupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>

<div class="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-blue-gradient">
	<div class="mycoupon-info mycoupon-info-right-dashed">
		<div class="mycoupon-store">XXXXXX旗舰店</div>
		<div class="mycoupon-price">&yen;5.00<span>优惠券</span></div>
		<div class="mycoupon-description">订单满50.00元</div>
	</div>
	<div class="mycoupon-get">
		<div class="mycoupon-desc">立即使用</div>
		<div class="mycoupon-expiry-date">2018.12.01<br/>2018.12.12</div>
	</div>
</div>


 </div>
 <mycouponHeader></mycouponHeader>
</div>
</template>

<script>
  import mycouponHeader from './CouponHeader.vue'

  export default {
    name: 'Mycoupon',
     data () {
                return {
                    theme1: 'light'
                }
            },
    components: {
        mycouponHeader,
    },
    methods:{
      use(){
        alert("a");
      },

    },

    }

</script>

<style>
  	@import '../../assets/css/mycupon.css';



</style>
