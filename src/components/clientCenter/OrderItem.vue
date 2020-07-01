<template>
  <div class="orderItem">
    <div class="content">
      <div class="imgArea" align="center">
        <img :src="this.itemInfo.fpic" />
      </div>
      <div class="infoArea">
        <div class="infoContent">
          <div><span style="font-size: 18px;font-weight: 800;font-family:'Courier New', Courier, monospace;">{{this.itemInfo.fname}}</span></div>
          <div style="color: #666666;"><span style="padding-right: 20px; font-size: 13px;">数量</span><span style="padding-right: 15px; color: green;">{{this.itemInfo.amount}} </span><span style="font-size: 13px;">例</span></div>
          <div><span style="padding-right: 20px;color: #666666;">
             <Tag v-show='this.itemInfo.fdiscount==1' color="volcano">未参与活动</Tag>
             <Tag v-show='this.itemInfo.fdiscount<1' color="volcano">限时活动</Tag></span>
           </div>
         </div>
         <div class="priceContent">
             <div style="color: #ED4014;"><span>￥</span><span style="font-size: 18px;">{{this.itemInfo.fcost*this.itemInfo.fdiscount}}</span></div>
             <div v-if="this.itemInfo.fdiscount<1"><span class="price"><del>￥{{this.itemInfo.fcost}}</del></span></div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:['itemInfo'],
    data(){
      return{

      }
    },
    created() {
      console.log(this.itemInfo);
    }
  }
</script>
<style scope>
  .orderItem{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .content{
    margin: 0px 0px;
    display: flex;
    flex-direction: row;
    height: inherit;
  }
  .imgArea{
    flex: 1;
    background-color: #2D8CF0;
  }
  .imgArea img{
    border-radius: 2%;
    width: 125px;
    height: 125px;
    margin: 2px auto;

  }
  .infoArea{
    height: inherit;
    flex: 4;
    background-color: bisque;
    display: flex;
  }
  .infoContent{
    flex: 1;
  }
  .infoContent >div{
    padding: 10px 20px;

  }
  .priceContent{
    flex: 1;
    padding-top: 35px;
  }
  .priceContent >div{
      padding-bottom: 15px;
  }

</style>
