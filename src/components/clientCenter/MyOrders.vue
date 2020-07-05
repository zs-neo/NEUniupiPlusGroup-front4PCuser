<template>
  <div class="myOrders">
    <div class="mytitle">
      <div class="titleArea">
        <h3>我的订单</h3>
      </div>

    </div>
    <div class="orderArea">
      <div class="nav_order">

          <ul>
            <li><router-link to="/clientCenter/myOrders"><span>全部订单</span></router-link></li>
            <li><router-link to="/clientCenter/myOrders"><span>待付款</span></router-link></li>
            <li><router-link to="/clientCenter/myOrders"><span>待评价</span></router-link></li>
          </ul>
                <el-dropdown style="float: right;padding-right: 30px; ">
                  <span class="el-dropdown-link" style="text-align: right; font-size: 13px;">
                    {{filterDate.label}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="width: 120px; text-align: center;">
                    <div style="padding-bottom: 5px;"><a>半年内订单</a></div>
                    <div style="padding-bottom: 5px;"><a>今年内订单</a></div>
                    <div style="padding-bottom: 5px;"><a>今年之前的订单</a></div>
                  </el-dropdown-menu>
                </el-dropdown>
      </div>
      <div class="orderContent">
        <OrderList></OrderList>
      </div>
    </div>
  </div>
</template>

<script>
  import OrderList from "./OrderList.vue"
  export default {
    components:{
      OrderList,
    },
      data() {
        return {
          filterDate:{
            label:'近半年订单',
            value:''
          },

        }
      },
      methods: {

      },
    }
</script>

<style scoped>
  .myOrders{
    height: 95%;
    width: 100%;
    box-sizing: border-box;
  }

  .mytitle{
    padding: 10px 20px 20px;
    margin: 0px 0px 20px;
    background-color: #999999;
  }
  .titleArea{
    /* box-sizing: border-box; */
    padding:10px 0px 0px;
    background-color: #00B43C;
  }

  .titleArea h3{
    font-size: 14px;
    color: #666;
    font-family: '\5b8b\4f53';
    line-height: 18px;
  }
  .orderArea{
    height: 100%;
    width: 100%;
    padding: 10px 20px 20px;
    margin: 0px 0px 20px;
  }
  .nav_order{
    padding: 10px 0px;
    padding: 10px;
    float: left;
    width: 100%;
    background-color: #999999;
  }

  ul{
    list-style: none;
  }
  li{
    list-style: none;
    padding-right: 20px;
     float: left;
  }
  .a-active{
    color: #E4393C;
    font-weight: 700;
  }
  a:hover {
      color: #e4393c;
      text-decoration: underline;
  }
  a {
      color: #666666;
      text-decoration: none;
  }


  .orderContent{
    overflow-y: auto;
    width: 100%;
    height: 85%;
    padding: 10px 20px 20px;
    background-color: #D7D7D7;
  }
  .orderContent::-webkit-scrollbar {
      display: none;
  }

</style>
