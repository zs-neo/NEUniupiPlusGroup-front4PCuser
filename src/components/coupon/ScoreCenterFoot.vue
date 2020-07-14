<template>
  <div class="scontainer">
    <el-card>
       <div class="ads-box">
         <div class="main-module module-help" id="beanHelp">
         					<div class="help-title">会员积分使用常见问题</div>
         					<dl class="bean-help-list">
         						<dt>1.积分和红包的有效期</dt>
         						<dd>积分的有效期最长2年，最短1年，即从获得积分开始至次年年底，逾期自动作废（如若交易在使用积分有效期之外发生退款，该部分积分不予退还；本页面红包自领取之日起一周内有效。</dd>
         						<dt>2. 积分的兑换比例</dt>
         						<dd>积分和人民币兑换比例是1:1，即1个积分相当于人民币1元。</dd>
         						<dt>3. 积分如何获取</dt>
         						<dd>用户在五凤楼进行点餐、点餐后评价、晒单、交易满意度、移动端下单、指定区域在线支付等活动都可以获得积分。</dd>
                     <dt>4. 兑换的红包怎么使用</dt>
                     <dd> 本页面兑换的全为无门槛红包,将会以优惠卷的形式发放到您的账户中,你可以到优惠卷中心查看，并在付款时可以抵扣相应金额。 </dd>
         					</dl>
         					<div class="view-more"><a href="javascript:;"  @click="goToMore()" class="ftc02">了解更多问题 &gt;</a></div>
         				</div>
      </div>
      </el-card>

         <el-dialog
           title="积分使用说明"
           :visible.sync="dialogVisible"
           width="50%"
           height="50%"
          >
          <el-collapse >
            <el-collapse-item title="1.如何成为会员" name="1">
              <div>普通用户通过进行身份证、真实姓名等信息认证成功之后便可成为会员，享有本店会员权益；</div>
            </el-collapse-item>
            <el-collapse-item title="2.会员的等级有哪些" name="2">
              <div>会员分为黄金、白金、钻石三个等级，不同等级的会员享有的不同的优惠力度，普通用户认个证会员成功后成为黄金会员，黄金会员晋升至白金会员需要500积分，白金会员晋升到钻石会员需要1000积分。；</div>

            </el-collapse-item>
            <el-collapse-item title="3.会员升级积分如何获取" name="3">
              <div>会员升级积分为在本店消费一定金额后反馈到用户的账户，具体兑换比例为消费金额：晋升积分=10：1；</div>

            </el-collapse-item>
            <el-collapse-item title="4.会员积分如何获得" name="4">
              <div>用户通过下单、使用优惠卷、评论可以获取相应的积分，具体规则为：
         <div> 1）用户每完成一笔订单将会获取一定的积分，反馈比例根据用户会员等级决定，普通用户订单金额：积分=10：0.5；黄金会员为10：1；白金会员为10：1.5；钻石会员为10：2；</div>
          <div>2）用户每使用一张优惠卷中心的满减优惠卷将会获取一定的积分，每张优惠卷产生的积分由优惠卷面额而定；</div>
           <div>3）用户每完成一次订单的评论将会获取一定的积分，普通文字评论获取0.5分，有图、视频评价1分；</div>
</div>
            </el-collapse-item>
            <el-collapse-item title="5.积分如何使用" name="5">
              <div>用户所获积分可以在积分中心页面兑换无门槛红包，红包的有效期为一周，同样每种红包的刷新频率也是两周，在一个周期内，每种面额的红包用户只能兑换一次，无法重复兑换，且积分兑换红包的比例为1：1，用户兑换的红包将以无门槛优惠卷的形式发放到用户优惠卷中心，有效期为领取时间至一周后</div>
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
 data() {
      return {

          dialogVisible: false,
      };
    },
    methods:{
      goToMore(){
        this.dialogVisible=true;

      },


    },

    }


</script>

<style>
  .scontainer {

      padding: 2px  ;

  }
  .ads-box{
    @include flex();
    margin-top:5px;
    margin-bottom:31px;
    a{
      width:296px;
      height:167px;

    }
  }

  .bean-help-list dt {
      font-weight: 700;
  }
  .bean-help-list dd {
      margin-bottom: 14px;
  }

  .help-title {
      height: 59px;
      line-height: 59px;
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 700;
      color: #1b1b1b;
  }
  .module-help {
      margin-left:70px ;
      font-family: "Helvetica Neue",sans-serif;
      font-size: 14px;
  }
</style>
