<template>
  <div class="orderDetails">
    <div class="orderDetailsContent">
      <el-card class="box-card" shadow="always">
        <div slot="header" class="chead">
            <span>订单信息</span>
        </div>
        <div>
            <div class="cbcol"><span class="cbcol-title">订单编号</span><span>{{orderInfo.serialnum}}</span></div>
            <div class="cbcol"><span class="cbcol-title">下单日期</span><span>{{orderInfo.createdate}}</span></div>
            <div class="cbcol"><span class="cbcol-title">折扣优惠</span><span style="color: #E4393C;font-size: 14px;">-<span style="font-size: 8px;">￥</span>{{this.total_discount}}</span></div>
            <div class="cbcol"><span class="cbcol-title">合计</span><span style="font-size: 16px; color: #E4393C;"><span style="font-size: 8px;">￥</span>{{orderInfo.cost}}</span></div>
            <div class="cbcol"><span class="cbcol-title">订单备注</span><span>{{orderInfo.remake}}</span></div>
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
      }
    },
    created() {
      this.orderInfo = JSON.parse(sessionStorage.getItem('entryDetailsOrderInfo'));
      console.log(JSON.parse(sessionStorage.getItem('entryDetailsOrderInfo')));
      this.orderItem = this.orderInfo.orderDetailsList;
      this.caclDiscount();
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
