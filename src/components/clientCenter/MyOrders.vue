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
            <li><router-link to="/clientCenter/myOrders" :class="this.orderFilter.state==0? 'a-active' :'dclass'"><span>全部订单</span></router-link></li>
            <li><router-link :to="{name: 'MyOrders', query:{filterState: 1}}" :class="this.orderFilter.state==1? 'a-active' :'dclass'"><span>待付款</span></router-link></li>
            <li><router-link :to="{name: 'MyOrders', query:{filterState: 2}}" :class="this.orderFilter.state==2? 'a-active' :'dclass'"><span>待评价</span></router-link></li>
          </ul>
                <el-dropdown style="float: right;padding-right: 30px; ">
                  <span class="el-dropdown-link" style="text-align: right; font-size: 13px;">
                    {{filterDate.label}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="width: 120px; text-align: center;">
                    <div style="padding-bottom: 5px;"><a @click="filterDateFunc(0)">半年内订单</a></div>
                    <div style="padding-bottom: 5px;"><a @click="filterDateFunc(1)">今年内订单</a></div>
                    <div style="padding-bottom: 5px;"><a @click="filterDateFunc(2)">今年之前的订单</a></div>
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
          orderFilter:{
            state:'0',
            time:'0'
          }
        }
      },
      created() {
          /*
            过滤订单状态、时间
            this.$route.query.filterState   0 全部  1 待付款 2待评价
            this.$router.query.filterState 0 半年内 1 一年内 2一年前
          */
         let filterState = this.$route.query.filterState;
         let filterTime = this.$route.query.filterTime;
         if(filterState !== undefined){
           this.orderFilter.state = filterState;
         }
         if(filterTime !== undefined){
           this.orderFilter.time = filterTime;
         }
      },
      methods: {
        filterDateFunc(timeState){
          switch(timeState){
            case 0:
              this.$router.push({
                name: 'MyOrders',
                query:{
                  filterState: this.orderFilter.state,
                  filterTime: timeState
                }
              });
              this.filterDate.label = '半年内订单';
              break;
            case 1:
              this.$router.push({
                name: 'MyOrders',
                query:{
                  filterState: this.orderFilter.state,
                  filterTime: timeState
                }
              });
              this.filterDate.label = '今年内订单';
              break;
            case 2:
              this.$router.push({
                name: 'MyOrders',
                query:{
                  filterState: this.orderFilter.state,
                  filterTime: timeState
                }
              });
              this.filterDate.label = '今年之前的订单';
              break;
            default:
              alert("系统崩溃，请重新登录");
              sessionStorage.clear();
              this.$router.push('/login');
          }
        }
      },
    }
</script>

<style scoped>
  .dclass{

  }
  .myOrders{
    height: 95%;
    width: 100%;
    box-sizing: border-box;
  }

  .mytitle{
    padding: 10px 20px 20px;
    margin: 0px 0px 20px;
    background-color: #FFFFFF;
    /* border-radius: 10px; */
  }
  .titleArea{
    /* box-sizing: border-box; */
    padding:10px 0px 0px;
    /* background-color: #00B43C; */
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
    padding: 10px 0px 20px;
    margin: 0px 0px 20px;
  }
  .nav_order{
    padding: 10px 0px;
    padding: 10px;
    float: left;
    width: 100%;
    background-color: #FFFFFF;
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
    height: 89%;
    padding: 10px 0px 20px;
    /* background-color: #D7D7D7; */
  }
  .orderContent::-webkit-scrollbar {
      display: none;
  }

</style>
