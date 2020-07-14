<template>
  <div class="orderItem">
    <div class="content" @click="routeFoodInfo(itemInfo.foodid)">
      <div class="imgArea" align="center">
        <img :src="calcPic(this.itemInfo.food.fpic)" />
      </div>
      <div class="infoArea">
        <div class="infoContent">
          <div><span style="font-size: 18px;font-weight: 800;font-family:'Courier New', Courier, monospace;">{{this.itemInfo.food.fname}}</span></div>
          <div style="color: #666666; font-weight: 900;"><span style="padding-right: 20px; font-size: 13px;">数量</span><span style="padding-right: 15px; color: red;">{{this.itemInfo.amount}} </span><span style="font-size: 13px;">例</span></div>
          <div><span style="padding-right: 20px;color: #666666;">
             <Tag v-show='this.itemInfo.food.fdiscount==1' color="volcano">未参与活动</Tag>
             <Tag v-show='this.itemInfo.food.fdiscount<1' color="volcano">限时活动</Tag></span>
           </div>
         </div>
         <div class="priceContent">
             <div style="color: #ED4014;"><span>￥</span><span style="font-size: 18px;">{{this.itemInfo.food.fprice*this.itemInfo.food.fdiscount}}</span></div>
             <div v-if="this.itemInfo.food.fdiscount<1"><span class="price"><del>￥{{this.itemInfo.food.fprice}}</del></span></div>
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
    },
    methods:{
      calcPic(pic){
        if(typeof pic !=undefined && pic!=''){
          return "/imgs/food/"+pic;
        }else{
          return "/imgs/logo.jpg";
        }
      },
      routeFoodInfo(fid){
        this.$router.push({path: "/detail", query: {fid: fid}});
      },
    }
  }
</script>
<style scope>
  .orderItem{
    width: fit-content;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding:0px 10px;
    margin: auto;
  }
  .content{
    margin: 0px 0px;
    height: inherit;
    display: block;
    width: fit-content;
    box-sizing: border-box;
    padding: 0px 40px;
    cursor: pointer;
  }
  .imgArea{
    display: inline-block;
    background-color: #ffffff;
    border-radius: 4px;
    height: 120px;
    width: 120px;
    box-sizing: border-box;
    padding: 5px;
    overflow: hidden;

  }
  .imgArea img{
    width: 110px;
    height: 110px;
    transition: all ease-in-out 0.3s;
  }
  .imgArea img:hover{
    transform: scale(1.1);
  }
  .infoArea{
    width: 500px;
    height: inherit;
    display: inline-block;
    background-color: bisque;
    vertical-align: top;
    padding:0px 10px;
    /* display: flex; */
  }
  .infoContent{
    display: inline-block;
  }
  .infoContent >div{
    padding: 8px 20px;
  }
  .priceContent{
    display: inline-block;
    vertical-align: top;
    font-weight: 900;
    height: inherit;
    width: 60%;
    box-sizing: border-box;
    text-align: center;
    padding: 40px;
  }
  .priceContent >div{
      padding-bottom: 15px;
  }
  .price{
    color: #ffaa00;
  }
</style>
