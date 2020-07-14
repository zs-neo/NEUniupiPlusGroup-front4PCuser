<template>
  <div v-if="flashPage" class="orderDetails">
    <div class="orderDetailsContent">
      <el-card class="box-card" shadow="always">
        <div slot="header" class="chead">
            <span>订单信息</span>
        </div>
        <div style="display: flex;">
          <div style="flex: 1;">
              <div class="cbcol"><span class="cbcol-title">订单编号</span><span>{{orderInfo.serialnum}}</span></div>
              <div class="cbcol"><span class="cbcol-title">下单日期</span><span>{{orderInfo.createdate}}</span></div>
              <div class="cbcol"><span class="cbcol-title">折扣优惠</span><span style="color: #E4393C;font-size: 14px;">-<span style="font-size: 8px;">￥</span>{{this.total_discount}}</span></div>
              <div class="cbcol"><span class="cbcol-title">合计</span><span style="font-size: 16px; color: #E4393C;"><span style="font-size: 8px;">￥</span>{{orderInfo.cost}}</span></div>
              <div class="cbcol"><span class="cbcol-title">订单备注</span><span>{{orderInfo.remake}}</span></div>
          </div>
          <div v-if="orderInfo.state===3 || orderInfo.state===7 || orderInfo.state===8" style="flex: 1;">
            <div class="cbcol" style="color: red;"><span class="cbcol-title" style="color: royalblue;">退款状态</span><span>{{caclState()}}</span></div>
            <div v-if='orderInfo.state===7' class="cbcol" style="color: red;padding-top: 30px; "><span class="cbcol-title" style="font-size: 16px;" >还剩</span><span>{{day}}天 {{hour}}时 {{minute}}分 {{second}}秒</span><span style="padding: 0px 20px; font-size: 16px;" class="cbcol-title">后，订单将自动取消</span></div>
          </div>
        </div>

      </el-card>

      <el-card class="box-card" shadow="always">
        <div slot="header" class="chead">
            <span>订单明细</span>
        </div>
        <div class="cbody">
          <template v-for="item of orderItem" >
            <div class="aItem">
              <OrderItem :itemInfo='item'></OrderItem>
            </div>

          </template>

        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
  import OrderItem from './OrderItem.vue';
  export default{
    components:{
      OrderItem,
    },
    data(){
      return{
        orderInfo:{},
        orderItem:[

        ],
        total_discount: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        flashPage: true,
      }
    },
    methods:{
      caclDiscount(){
        let result = 0;
        for( let i = 0;i<this.orderItem.length;i++){
          let item = this.orderItem[i].food;
          result+= item.fprice*(1-item.fdiscount)*(this.orderItem[i].amount);
        }
        this.total_discount = result.toFixed(2);
      },
      caclState(){
        let state = this.orderInfo.state;
        if(state===3){
          return '退款成功';
        }else if(state===7){
          if(this.orderInfo.createdate< (new Date() - 7 * 60 * 60 * 1000)){
            return '超时已自动退款';
          }else{
            return '等待退款中...';
          }

        }else{
          return '拒绝退款，请联系商家';
          }
      }
    },
    created() {
      this.orderInfo = JSON.parse(sessionStorage.getItem('entryDetailsOrderInfo'));
      console.log(JSON.parse(sessionStorage.getItem('entryDetailsOrderInfo')));
      this.orderItem = this.orderInfo.orderDetailsList;
      this.caclDiscount();
    },
    mounted(){
      if(this.orderInfo.state===7){
        let interval = setInterval(() => {
              let timedate = new Date(this.orderInfo.createdate);
              let now = new Date();//*24*60
              let date = timedate.getTime() - now.getTime() +7*24*60*60*1000 ;
              let time = Math.ceil((date) / (1000));
              this.day = Math.floor((date) / (1000 * 60 * 60 * 24));
              let leavetime = date%(1000*60*60*24);
              this.hour = Math.floor(leavetime/1000/60/60);
              leavetime %= 1000*60*60;
               this.minute = Math.floor(leavetime/1000/60);
               leavetime %= 1000*60;
               this.second = Math.floor(leavetime/1000);
               if(date<=0){
                 this.axios.get(`http://localhost:8082/order/refund`, {params:{
                   serialnum: this.orderInfo.serialnum
                 }}).then(rs=>{
                   this.$message.success("超时已自动退款......");
                   this.axios.get(`http://localhost:8082/order/getOrderBySerialNum`,{params:{
                     serialnum: this.orderInfo.serialnum
                   }}).then(rs=>{
                     if(rs.data.status){
                       this.orderInfo = rs.data.order;
                       sessionStorage.setItem("entryDetailsOrderInfo", JSON.stringify(rs.data.order));
                     }else{
                       this.$message.error(rs.data.msg);
                     }
                     // this.flashPage = false;
                     // this.flashPage = true;
                   });
                   clearInterval(interval);

                 });
               }
            }, 1000);
      }

    }
  }
</script>

<style >
  .orderDetails{
    width: 100%;
    height: calc(100vh - 40px);
     font-family: '\5b8b\4f53';
    /* margin: 20px 0px; */
    /* box-sizing: border-box; */
    padding: 20px;
  }
  .orderDetailsContent{
    background-color: #FFFFFF;
    margin: auto;
    width: 85%;
    height: 85%;
  }
  .box-card{
    width: 80%;
    margin:20px auto;
  }
  .el-card__header{
    padding: 10px 20px !important;
  }
  .chead{
    font-size: 16px;
    color: #666;
  }
  .cbcol{
    padding-bottom: 6px;
    font-family: simsun;
    font-weight: 900;
  }
  .cbcol-title{
    color: #666;
    padding-right: 20px;


    font-size: 13px;
  }
  .aItem{
    height: 150px;
    box-sizing: border-box;
    padding: 15px;
  }
  .cbody{
    height: 350px;
    overflow: auto;
  }
  .cbody::-webkit-scrollbar {
        display: none;
    }
</style>
