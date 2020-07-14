<template>
  <div class="eventCard">

    <el-card class="box-card1">
      <div slot="header" class="clearfix">
          <el-tag type='danger' class="thistitle">活动公告</el-tag>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text1 item1">
          <span style="color: red; font-family: simsun; font-weight: bolder;">{{event.ename}}</span>
      </div>
      <div class="text item">
          <span style="font-family: simsun; font-size: 13px; color: #E4393C;font-weight: 900;">截止时间</span><span style="padding: 0px 10px; color: lightcoral;font-weight: 900;font-size: 16px;">{{event.eventbegtime}}</span>
      </div>
      <div class="text item">
         <span style="font-family: simsun; font-weight: 900; font-size: 13px; color: lightslategrey;">{{event.edesc}}</span>
      </div>

    </el-card>

  </div>
</template>

<script>
   let server="http://localhost:8082/";
   let getEventInfo="event/getAll";

  export default {
    data () {
      return {
        event:"",

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
          this.axios.get(`${server}${getEventInfo}`).then((res) => {

                          console.log(res.data[0]);
                          this.event=res.data[0];
                          this.event.eventbegtime=this.handelTime(this.event.eventbegtime);
                   })
      },
    //截取时间到天
    handelTime(time){
      var timeArr = time.replace(" ", ":").replace(/\:/g, "-").split("-");
      var result = timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];
      return result;
    },

    }
  }
</script>

<style>
  .eventCard{
    width: inherit;
    height: inherit;
    box-sizing: border-box;
  }
   .text {
      font-family: "arial black";
      font-size: 14px;
      font-weight:300;
    }

    .item {
      padding: 5px 0px;
    }
    .text1 {
        font-family: "arial rounded mt bold";
       font-size: 15px;
       font-weight: bold;

     }

     .item1 {
       padding: 5px 0px;
     }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .box-card1 {
      width: inherit;
      text-align: center;

    }
    .thistitle{
      font-size: 16px;
      font-weight:bold;
    }
</style>
