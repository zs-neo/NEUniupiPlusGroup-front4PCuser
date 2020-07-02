<template>
  <div class="myCenter">
    <div class="box-head">
      <div class="infoFrame">
        <InfoFrame></InfoFrame>
      </div>
      <div class="guideFrame">
        <el-card style="height: inherit; padding: 0px !important;">
          <div slot="header" >
            <span style="font-size: 18px; font-family:'Trebuchet MS';">活动中心</span>

          </div>
           <div class="activeArea">
             <div class="annotation">
               <span >今天有好券哦，快来</span><a href="/clientCenter/myOrders">领取</a><span>吧!</span>
             </div>
             <div class="backArea__coupon"></div>
           </div>
        </el-card>
      </div>
    </div>
    <div class="box-recom">
      <el-card>
        <div slot="header" >
          <span style="font-size: 18px; font-family:'Trebuchet MS';">专属活动</span>
        </div>
        <div class="recom-body">
          <div class="discount_annotation">
            <div class="activeArea">
              <div class="annotation">
                <span >7月份专属活动来了，你想要的都在</span><a href="/clientCenter/myOrders">这里</a><span>！</span>
              </div>
              <div class="backArea__activity"></div>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="food_annotation">
            <div class="activeArea">
              <div class="annotation">
                <span >元气满满的一天，一定要填饱肚子哦，</span><a href="/clientCenter/myOrders">快来点餐吧！</a>
              </div>
              <div class="backArea__foodRecom"></div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import InfoFrame from './InfoFrame.vue'
  export default{
    components:{
      InfoFrame,
    },
    data(){
      return{

      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .el-card /deep/ .el-card__body {
      padding: 10px;
    }
  .myCenter{
    width: 100%;
    height: 95%;
    background-color: #00B43C;
    display: block;
  }
  .box-head{
    height: 200px;

  }
  .infoFrame{
    background-color: red;
    /* padding: 10px; */
    height: 180px;
    width: 300px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px;
    display: inline-block;
  }

  .guideFrame{
    margin: 0 30px;
    width: 60%;
    height: 180px;
    background-color: #999999;
    display: inline-block;
  }
  .activeArea{
    position: relative;
    text-align: center;
  }
  a:hover {
      color: #e4393c;
      text-decoration: underline;
  }
  a {
      color: #E4393C;
      text-decoration: none;
      cursor: pointer;
  }
  .activeArea .backArea__coupon{
    position: absolute;
    top: 0px;
      height: 120px;
      width: 100%;
      background-image: url(../../../public/imgs/background/couponBack.png);
      background-repeat: no-repeat;
      background-size: 180px 140px;
      background-position: 150px -10px;
      opacity:0.10;
    }
    .activeArea .annotation{
      position: relative;
      font-size: 14px;
      color: #666666;
      font-weight: 700;
      line-height: 100px;
      z-index: 1;
    }
    .box-recom{
      padding: 15px;
    }
    .recom-body{
      height: 300px;
    }
    .activeArea .backArea__activity{
      position: absolute;
      top: 0px;
        height: 120px;
        width: 100%;
        background-image: url(../../../public/imgs/background/activityBack.jpg);
        background-repeat: no-repeat;
        background-size: 250px 120px;
        background-position:300px -10px;
        opacity:0.05;
    }
    .activeArea .backArea__foodRecom{
      margin-top: 10px;
      position: absolute;
      top: 10px;
      height: 150px;
      width: 100%;
      background-image: url(../../../public/imgs/background/foodRecom.jpg);
      background-repeat: no-repeat;
      background-size: 180px 120px;
      background-position:170px 0px;
      opacity:0.05;
    }

</style>
