<template>
  <div class="orderList">
    <el-table :data="tableData.filter(data => !search || data.serialnum.toLowerCase().includes(search.toLowerCase()))"
      max-heignt="550px" ref="orderListTable" empty-text="你还没有订单，快点去订餐吧!" style="width: 100%;
      font-size: 14px;
      color: #666;
      font-family: '\5b8b\4f53';">
      <el-table-column label="订单号" align="center" prop="serialnum">
      </el-table-column>
      <el-table-column label="日期" prop="createdate" align="center" width="100px">
      </el-table-column>
      <el-table-column label="金额" align="center" width="100px" prop="cost">
        <template slot-scope="scope">
          <span style="color: #ff5500;">{{scope.row.cost}}</span>
        </template>

      </el-table-column>
      <el-table-column label="积分" align="center" width="90px" prop="memberpoints">
        <template slot-scope="scope">
          <span style="color: #ff5500;">{{caclPoints(scope.row.cost)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110px" align="center" prop="state">
        <template slot-scope="scope">
          <span style="color: lightslategray; font-size: 13px;" :style="caclState(scope.row)!=='已失效'?validStyle:invalidStyle">{{caclState(scope.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px" align="center">
        <template slot-scope="scope">
           <div v-if="scope.row.valid===1 && (scope.row.state===0 || scope.row.state===1)" class="remakeEntry" @click="refund(scope.$index, scope.row)" style="padding-right: 10px; color: red"><span>退款</span></div>
          <div v-if="caclState(scope.row)==='未支付'" class="remakeEntry" @click="pay(scope.$index, scope.row)" style="padding-right: 10px; color: red"><span>去支付</span></div>
          <div v-if="scope.row.state===2&&scoped.row.state!==4" class="remakeEntry" @click="remake(scope.$index, scope.row)"><span>评价</span></div>
          <el-divider></el-divider>
          <el-button size="mini" @click="againOrder(scope.$index, scope.row)">再来一单</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入订单号搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="checkDetails(scope.$index, scope.row)" icon="el-icon-edit-outline"
            circle></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"
            circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script scoped>
  import Vue from 'vue'
  export default {
    data() {
      return {
        tableData: [],
        search: '',
        validStyle: "color: green",
        invalidStyle: '',
      }
    },
    created() {
      this.getOrder();
    },
    computed: {

    },
    methods: {
      getOrder() {
        Vue.axios.post(`http://localhost:8082/order/getById`).then(rs => {
          if (rs.data.status) {
            this.tableData = rs.data.list;
            this.filterOrder();
          } else {
            this.$message.error(rs.data.msg);
          }
        });
      },

      caclPoints(cost) {
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (user.type === 0) {
          return (cost / 20).toFixed(2);
        } else {
          if (user.member.accumulatescores && user.member.accumulatescores != '') {
            if (user.member.accumulatescores < 500) {
              return (cost / 10).toFixed(2);
            } else if (user.member.accumulatescores >= 500) {
              return (cost * 10 / 1.5).toFixed(2);
            } else if (user.member.accumulatescores >= 1000) {
              return (cost / 5).toFixed(2)
            }
          }
        }

      },
      /*
      再来一单
      */
      againOrder(index, row) {
        console.log(index, row);
        this.axios.get(`http://localhost:8082/cart/clearCart`).then(rs=>{
          for (let i = 0; i < row.orderDetailsList.length; i++) {
            let food = row.orderDetailsList[i].food;
            food.fnum = row.orderDetailsList[i].amount;
            console.log(food);
            this.axios.post("http://localhost:8082/cart/insertCart", food).then(r => {
              this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(d => {
                this.$store.dispatch("saveCartCount", d.data);
              })

            })
          }
        })
        this.$Message.success('已添加至购物车');
        this.$router.push("/cart");
      },
      refund(index, row){
        console.log("----------This is the top line of refund----------")
        console.log(row.serialnum);
        this.$confirm('确认退货？','提示',{type:'warning'}).then(()=>{
          this.axios.get(`http://localhost:8082/order/applyRefund`, {params:{
            serialnum: row.serialnum
          }}).then(rs=>{
            if(rs.data.status){
              this.$message.success("申请退款成功，请等待商家同意...");
              this.getOrder();
            }else{
                this.$message.error(rs.data.msg);
            }
          })
        }).catch(()=>{
          this.$message.info("已取消");
        })

        console.log("----------This is the bottom line of refund----------")
      },
      /*
        订单详情
      */
      checkDetails(index, row) {
        console.log(index, row);
        sessionStorage.setItem("entryDetailsOrderInfo", JSON.stringify(this.tableData[index]));
        this.$router.push({
          path: '/orderDetails',
          query: {
            orderNo: row.serialnum
          }
        });
      },

      /*
        订单删除
      */
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm("此次操作将不可撤销，是否继续？", "警告", {type:'warning'}).then(()=>{
          this.axios.get(`http://localhost:8082/order/delete`, {params:{
            serialnum: row.serialnum
          }}).then(rs=>{
            if(rs.data.status){
              this.$Message.success("删除成功");
              this.getOrder();
            }else{
              this.$message.error(rs.data.msg);
            }
          })
        }).catch(()=>{
          this.$message.info("已取消");
        });

      },
      /*
      订单过滤
       */
      filterOrder() {
        let filterState = this.$route.query.filterState;
        let filterTime = this.$route.query.filterTime;
        let tableData = this.tableData;
        console.log(tableData);
        if (filterState !== undefined) {
          /*
            0 全部
            1 未支付 且有效
            2 未评价
          */
          if (filterState != 0) {
            if (filterState == 1) {
              let currdate = new Date();
              tableData = tableData.filter((item, index, arr) => {
                return item.valid == 0 && new Date(item.createdate) >= (currdate - 15 * 60 * 1000);
              });
            } else {
              tableData = tableData.filter((item, index, arr) => {
                return item.state == 2;
              });
            }

          }

          console.log('filterState ' + filterState);
        }
        if (filterTime !== undefined) {
          /*
            0 半年内
            1 一年内
            2 一年前
          */
          let currdate = new Date();

          if (filterTime == 0) {
            tableData = tableData.filter((item, index, arr) => {
              return new Date(item.createdate) >= (currdate - 180 * 24 * 60 * 60 * 1000);
            });
          } else if (filterTime == 1) {
            tableData = tableData.filter((item, index, arr) => {
              return new Date(item.createdate) >= (currdate - 365 * 24 * 60 * 60 * 1000);
            });

          } else {
            tableData = tableData.filter((item, index, arr) => {
              return new Date(item.createdate) <= (currdate - 180 * 24 * 60 * 60 * 1000);
            });

          }
          console.log('filterTime ' + filterTime);
        }
        tableData.sort((a, b) => {
          return b.serialnum.substr(0, 8) - a.serialnum.substr(0, 8);
        });
        this.tableData = tableData;
      },
      /*
        未支付订单去支付

      */
      pay(index, row) {
        console.log(row);
        this.$router.push({
          path: '/order/pay',
          query: {
            orderNo: row.serialnum
          }
        });
      },
      caclState(row) {
        if (row.valid == 0) {
          let currdate = new Date();
          if (new Date(row.createdate) < (currdate - 15 * 60 * 1000)) {
            return '已失效';
          }
          return '未支付';
        } else {
          switch (row.state) {
            case 0:
              return '未接单'
              break;
            case 1:
              return '已接单';
              break;
            case 2:
              return '已完成';
              break;
            case 3:
              return '已退款';
              break;
             case 7:
               return '退款中';
               break;
            default:
              return '数据异常';
          }
        }
      },

    }
  }
</script>

<style scoped>
  * {
    font-weight: 900;
  }

  .remakeEntry {
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    font-size: 12px;
    color: #666;
    font-family: '\5b8b\4f53';
  }

  .remakeEntry:hover {
    color: #e4393c;
    text-decoration: underline;
  }

  .el-divider--horizontal {
    margin: 10px 0px !important;
  }
</style>
