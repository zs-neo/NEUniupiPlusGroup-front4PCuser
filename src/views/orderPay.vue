<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>15分钟</span>内完成支付, 超时后订单将失效</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{orderInfo.cost}}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <el-card v-if="orderInfo.userAddressId !== undefined && orderInfo.userAddressId !==-1" class="addressArea">
              <div slot="header" class="addressAreaTitle">
                配送信息
              </div>
              <div class="addressAreaContent">
                <p>期望时间 <span>立即配送</span></p>
                <p><div style="display: inline-block; vertical-align: top;">配送地址</div>&nbsp;
                <div style="display: inline-block;">
                  <span>
                    {{deliverAddress.province+" "+deliverAddress.city+" "+deliverAddress.district+" "+deliverAddress.address}}
                  </span><br/>
                  <span>
                    <span>{{deliverAddress.username}}</span>&nbsp;
                    <span>{{deliverAddress.phone}}</span>
                  </span>

                 </div>
                </p>
                <p>配送服务 <span>商家配送</span></p>
              </div>
            </el-card>
            <el-card class="orderArea">
              <div slot="header" class="orderAreaHeader">
                订单详情
              </div>
              <div class="item">
                <div class="detail-title">订单号</div>
                <div class="detail-info theme-color">{{orderId}}</div>
              </div>

              <!-- 电话  备注 -->
              <div v-if="discountprice!==0" class="item good">
                <div class="detail-title">折扣减免</div>
                <div class="detail-info" style="color: red; font-weight: 900; ">
                  {{discountprice}}
                </div>
                元
              </div>
              <div class="item">
                <div class="detail-title">发票信息</div>
                <div class="detail-info">电子发票 个人</div>
              </div>
            </el-card>

          </div>
        </div>

        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':payType===1}" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" :class="{'checked':payType===2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>

    <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>

    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal=false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import QRCode from 'qrcode'
import OrderHeader from './../components/OrderHeader'
import ScanPayCode from './../components/ScanPayCode'
import Modal from './../components/Modal'
export default {
  name: 'order-pay',
  data () {
    return {
      orderId: this.$route.query.orderNo,
      orderInfo: {cost:100},
      deliverAddress: '',
      addressInfo: '', // 收货人地址
      orderDetail: [], // 订单详情，包含选中需支付的商品列表
      showDetail: false, // 是否显示订单详情
      payType: '', // 支付类型
      showPay: false, // 是否显示微信支付弹框
      payImg: '', // 微信支付的二维码地址
      showPayModal: false, // 是否显示二次支付确认弹框
      payment: 0, // 订单总金额
      discountprice: 0,
      T: ''// 定时器ID
    }
  },
  components: {
    OrderHeader,
    ScanPayCode,
    Modal
  },
  created() {
    if(sessionStorage.getItem("orderConfirmInfo")!== null){
      this.orderInfo = JSON.parse(sessionStorage.getItem("orderConfirmInfo"));
      console.log(this.orderInfo);
      this.deliverAddress = JSON.parse(sessionStorage.getItem("deliverAddress"));
      this.discountprice = sessionStorage.getItem("discountprice");
    }else{
      this.axios.get(`http://localhost:8082/order/getOrderBySerialNum`, {params:{
        serialnum: this.$route.query.orderNo,
      }}).then(rs=>{
        if(rs.data.status){
          this.orderInfo = rs.data.order;
          if(rs.data.order.userAddressId!==null){
            this.axios.get(`http://localhost:8082/userAddress/getAddressById`, {params:{
              addressid:rs.data.order.userAddressId
            }}).then(rs=>{
              if(rs.data.status){
                this.deliverAddress = rs.data.address;
              }else{
                this.$message.error(rs.data.msg);
              }
            })
          }
        }else{
          this.$message.error(rs.data.msg);
        }
      })
    }

    console.log(this.deliverAddress);
    console.log(this.orderInfo);
  },
  mounted () {

  },
  methods: {

    paySubmit (payType) {
      QRCode.toDataURL("weixin://wxpay/bizpayurl?pr=9ddfjRE")
        .then(url => {
          this.showPay = true
          this.payImg = url
          this.loopOrderState()
       setTimeout(() => {
         this.axios.get(`http://localhost:8082/order/pay`,{
           params:{
             serialnum: this.$route.query.orderNo
           }
         }).then(rs=>{
           if(rs.data.status){
             this.$message.success("支付成功, 请稍后");
             this.$router.push("/order/paySuccess");
           }else{
             this.$message.error(rs.data.msg);
           }
         });

       }, 1000)
        })
        .catch(() => {
          this.$message.error('二维码生成失败，请稍后重试')
        })
    },
    // 关闭微信弹框
    closePayModal () {
      this.showPay = false
      this.showPayModal = true
      clearInterval(this.T)
    },
    // 轮询当前订单支付状态
    loopOrderState () {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then((res) => {
          if (res.status === 20) {
            clearInterval(this.T)
            this.goOrderList()
          }
        })
      }, 1000)
    },
    goOrderList () {
      this.$router.push('/order/list')
    }
  }
}
</script>
<style lang="scss">
  .addressAreaContent{
    span{
      font-weight: 500;
    }
    p> span{
      padding-left: 30px;
    }
    >div >span{
      padding-left: 30px;
    }
  }
  .addressArea{
    font-family: simsun;
    font-weight: 900;
    color: #666666;
    width: 80%;
    margin-bottom: 25px;
    .addressAreaTitle{
      font-size: 15px;
    }
  }
  .orderArea{
    font-family: simsun;
    font-weight: 900;
    color: #666666;
    width: 80%;
    .orderAreaHeader{
      font-size: 15px;
    }
  }
  .order-pay{
    box-sizing: border-box;
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size:24px;
              color:#333333;
              margin-bottom:20px;
            }
            p{
              color:#666666;
              span{
                color:#FF6700;
              }
            }
          }
          .order-total{
            &>p:first-child{
              margin-bottom:30px;
            }
            span{
              font-size:28px;
              color:#FF6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:contain;
              margin-left:9px;
              transition:all 0.5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg);
              }
            }
          }
        }
        .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              font-weight: 500;
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .item-pay{
        padding:26px 50px 72px;
        background-color:#ffffff;
        color: #333333;
        h3{
          font-size: 20px;
          font-weight: 200;
          color: #333333;
          padding-bottom: 24px;
          border-bottom: 1px solid #D7D7D7;
          margin-bottom: 26px;
        }
        .pay-way{
          font-size:18px;
          .pay{
            display:inline-block;
            width:188px;
            height:64px;
            border:1px solid #D7D7D7;
            cursor:pointer;
            &:last-child{
              margin-left:20px;
            }
            &.checked{
              border:1px solid #FF6700;
            }
          }
          .pay-ali{
            background:url('/imgs/pay/icon-ali.png') no-repeat center;
            background-size:103px 38px;
            margin-top:19px;
          }
          .pay-wechat{
            background:url('/imgs/pay/icon-wechat.png') no-repeat center;
            background-size:103px 38px;
          }
        }
      }
    }
  }
</style>
