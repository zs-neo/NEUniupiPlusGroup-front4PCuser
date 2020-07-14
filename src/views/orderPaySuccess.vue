<template>
  <div class="order-pay">
    <order-header title="支付成功">
      <template v-slot:tip>
      </template>
    </order-header>
    <div  class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ" ></div>
            <div class="order-info">
              <h2 style="display: inline-block; vertical-align: middle;">订单支付成功，正在跳转</h2><h2 class="infinite" style="padding-left:5px; display: inline-block;overflow: hidden;margin: 0px;">......</h2>

            </div>

          </div>
        </div>

      </div>
    </div>



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
      addressInfo: '', // 收货人地址
      orderDetail: [], // 订单详情，包含选中需支付的商品列表
      payment: 0, // 订单总金额
      T: '',// 定时器ID
      showDetail: false, // 是否显示订单详情
    }
  },
  components: {
    OrderHeader,
    ScanPayCode,
    Modal
  },
  mounted () {
    setTimeout(()=>{
      this.$router.push("/index");
    }, 1500);

  },
  methods: {

  },
}
</script>
<style lang="scss">
  @keyframes success{
    0%{
      height: 0px;
    }
    100%{
      height: 90px;
    }
  }
  @keyframes waiting{
    0%{
      width: 0px;
    }
    100%{
      width: 60px;
    }
  }
  .infinite{
    -webkit-animation: waiting 2s infinite linear;
  }
  .order-pay{
    .wrapper{
      transition: all ease-in-out 0.3s;
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #fff;
        font-size:14px;
        margin-bottom:30px;
        .item-order{
          height: 90px;
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
            -webkit-animation: success 1s;
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
