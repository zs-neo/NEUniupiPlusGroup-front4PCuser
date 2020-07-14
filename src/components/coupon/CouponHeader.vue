<template>
  <div class="coupon-rule">
<ul>

                <li class="fore1">
                    <a href="javascript:;"  @click="dialogVisible = true" >
                        <b class="rule-icon"></b><span><el-link :underline="false"type="info">优惠卷使用规则</el-link></span>
                    </a>
                </li>
                <li class="fore1">
                    <a  href="javascript:;"  @click="goToCouponCenter()" >
                        <b class="rule-icon1"></b><el-link :underline="false">领劵中心</el-link></span>
                    </a>
                </li>
                <li class="fore1">
                    <a href="javascript:;"  @click="goToExchangeScore()">
                        <b class="rule-icon2"></b><span><el-link type="danger":underline="false">积分兑换红包</el-link></span>

                    </a>
                </li>
            </ul>

         <el-dialog
           title="优惠卷使用说明"
           :visible.sync="dialogVisible"
           width="40%"
           height="50%"
          >
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="1.什么是优惠卷" name="1">

              <div>优惠卷是系统发放给用户的，用于减免购买支付的惠民措施，每张优惠卷有不同的使用条件和减免金额；</div>
            </el-collapse-item>
            <el-collapse-item title="2.优惠卷的类型有哪些" name="2">
              <div>优惠卷按照面额大小分为三档，其中优惠金额低于10元的为黄卷；低于50元的为绿卷；高于50元的为蓝卷每张优惠卷的对应一个反馈积分，该积分由商家通过后台管理系统设计；</div>

            </el-collapse-item>
            <el-collapse-item title="3.谁可以领取优惠卷" name="3">
              <div>一般情况下所有注册过五凤楼订餐系统的用户均可以领取优惠卷，但后台有权限指定某类优惠卷只有vip可以领取；</div>

            </el-collapse-item>
            <el-collapse-item title="4.优惠卷与一般满减可以叠加么" name="4">
              <div>优惠卷的满减信息与一般满减是可以叠加的，两者并不冲突。</div>
            </el-collapse-item>
            <el-collapse-item title="4.使用优惠卷支付相关问题" name="4">
              <div>使用优惠卷券提交的订单，若订单取消后，系统自动返还相应的券；若订单提交且支付成功后申请售后处理，优惠卷不予返还。</div>
            </el-collapse-item>
          </el-collapse>
           <span slot="footer" class="dialog-footer">

             <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
           </span>
         </el-dialog>




</div>
</template>

<script>

  export default {
    name: 'CouponHeader',
    data(){
      return{
          dialogVisible: false,
           activeNames: ['1']
      };

    },
    methods:{

      goToCouponCenter(){
         this.$router.push('/couponcenter')
      },
      goToExchangeScore(){
         this.$router.push('/scoreCenter')
      },
      handleChange(val) {
        console.log(val);
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
    height: 50px;
    margin: 20px auto 1px;
    background: url(../../../public/imgs/coupon/couponscore.png) no-repeat;
    background-size:45px 45px;
    overflow: hidden;
}
  .coupon-rule .rule-icon1{
    display: block;
    width: 55px;
    height: 50px;
    margin: 20px auto 1px;
    background: url(../../../public/imgs/coupon/couponcenter.png) no-repeat center;;
     background-size:40px 45px;
    overflow: hidden;
}
  .coupon-rule .rule-icon{
    display: block;
    width: 55px;
    height: 50px;
    margin: 20px auto 1px;
    background: url(../../../public/imgs/coupon/couponhelp.png) no-repeat center;
     background-size:45px 45px;
    overflow: hidden;
}
</style>
