<template>
  <div class="fullReductCard">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tag type='warning' class="title">店铺优惠</el-tag>

    </div>
    <div v-for="item of nums" class="ttext titem">
      <span class="reduct">&yen;{{ReductMoney[item-1]}}</span><el-tag type="warning" effect="plain">满{{FullMoney[item-1]}}减</el-tag>
    </div>
  </el-card>

  </div>
</template>

<script>
  let server="http://localhost:8082/";
   let getfullreductInfo="fullreduct/getAll";

  export default {
    data () {
      return {
        FullMoney:[],
        ReductMoney:[],
        nums:"",

      }
    },
    computed: {
    },
    created () {
      this.init();
    },
    methods: {
      //拿到活动信息
      init(){
          this.axios.get(`${server}${getfullreductInfo}`).then((res) => {
                          console.log(res.data);
                          var str = res.data.frname;
                          var numArr = str.match(/\d+/g);
                          console.log(numArr);
                          for(let i=0;i<numArr.length;i=i+2){
                           this.FullMoney.push(numArr[i]);
                          }
                          for(let i=1;i<numArr.length;i=i+2){
                           this.ReductMoney.push(numArr[i]);
                          }
                          this.nums=numArr.length/2;

                   })

      },

    }
  }
</script>

<style >
  .fullReductCard{
    width: inherit;
    height: inherit;
  }
   .ttext {
      font-size: 16px;
    }

    .titem {
      margin-bottom: 10px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card {
      width: inherit;
      text-align: center;
      /* border:1px solid red */
    }
    .title{
      font-size: 16px;
      font-weight: bold;

    }
    .reduct{
      color: red;
      font-size: 19px;
      margin-right: 15px;
      font-family: "Verdana"
    }
</style>
