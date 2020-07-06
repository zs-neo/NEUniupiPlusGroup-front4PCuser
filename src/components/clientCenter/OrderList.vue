<template>
  <div class="orderList">
    <el-table
      :data="tableData.filter(data => !search || data.serialnum.toLowerCase().includes(search.toLowerCase()))"
      max-heignt="550px"
      style="width: 100%;
      font-size: 14px;
      color: #666;
      font-family: '\5b8b\4f53';">
      <el-table-column
        label="订单号"
        align="center"
        prop="serialnum">
      </el-table-column>
      <el-table-column
        label="日期"
        prop="createdate"
         align="center"
        width="150px">
      </el-table-column>
      <el-table-column
        label="金额"
         align="center"
        width="100px"
        prop="cost">
      </el-table-column>
      <el-table-column
        label="积分"
         align="center"
        width="90px"
        prop="memberpoints">
      </el-table-column>
      <el-table-column
        label="状态"
        width="110px"
        align="center"
        prop="state">
        <template slot-scope="scope">
        	<span>{{scope.row.state==1?'已完成':'已取消'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120px"
        align="center">
        <template slot-scope="scope">
          <div class="remakeEntry" @click="remake(scope.$index, scope.row)"><span>评价</span></div>
          <el-divider></el-divider>
          <el-button
            size="mini"
            @click="againOrder(scope.$index, scope.row)">再来一单</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入订单号搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="checkDetails(scope.$index, scope.row)" icon="el-icon-edit-outline" circle></el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script scoped>
  import Vue from 'vue'
  export default{
    data(){
      return{
        tableData: [{
          createdate: '2016-05-02 11:20:15',
          name: '王小虎',
          cost: 263.5,
          serialnum: '1593521600750561',
          state: 1,
          memberpoints: 50,
        },{
          createdate: '2016-05-02 11:20:15',
          name: '王小虎',
          cost: 263.5,
          serialnum: '1593521600750561',
          state: 1,
          memberpoints: 50,
        },{
          createdate: '2016-05-02 11:20:15',
          name: '王小虎',
          cost: 263.5,
          serialnum: '1593521600750561',
          state: 1,
          memberpoints: 50,
        },{
          createdate: '2016-05-02 11:20:15',
          name: '王小虎',
          cost: 263.5,
          serialnum: '1593521600750561',
          state: 1,
          memberpoints: 50,
        },{
          createdate: '2016-05-02 11:20:15',
          name: '王小虎',
          cost: 263.5,
          serialnum: '1593521600750561',
          state: 1,
          memberpoints: 50,
        },{
          createdate: '2016-05-02 11:20:15',
          name: '王小虎',
          cost: 263.5,
          serialnum: '1593521600750561',
          state: 1,
          memberpoints: 50,
        },],
        search: ''
      }
    },
    created() {
      this.getOrder();
    },
    methods:{
      getOrder(){
        Vue.axios.post(`http://localhost:8082/order/getById`).then(rs=>{
          if(rs.data.status){
            this.tableData = rs.data.list;
          }else{
            this.$message.error(rs.data.msg);
          }
        });
      },
      againOrder(index, row) {
        console.log(index, row);
      },
      checkDetails(index, row){
        console.log(index, row);
        sessionStorage.setItem("entryDetailsOrderInfo",JSON.stringify(this.tableData[index]));
        this.$router.push("/orderDetails");
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>

  .remakeEntry{
    cursor: pointer;
    font-size: 12px;
    color: #666;
    font-family: '\5b8b\4f53';
  }
  .remakeEntry:hover{
    color: #e4393c;
    text-decoration: underline;
  }
  .el-divider--horizontal{
    margin: 10px 0px !important;
  }
</style>
