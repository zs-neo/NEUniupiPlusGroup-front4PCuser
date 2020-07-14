<template>
  <div>
    <div class="horizontal-banner">
      <div style="position: relative;flex: 12; display: flex;">
        <div style="position: relative; flex: 3;">
          <img src="/imgs/title1.png" style="width: 150px;height: 150px;left: 335px;top: 2px;position: relative;">
        </div>
        <div style="position: relative;left: 100px;">
          <img src="/imgs/name.png" />
        </div>
        <div style="position: relative; flex: 7;width: 400px;">
          <h1 style="color: #000000; font-size: 40px;left: 110px;position: relative;font-family: simsun;width:600px;top: 15px;">全网唯一老八指定商铺</h1>
        </div>
      </div>
    </div>
    <div class="horizontal-banner1">
    </div>
    <div class="product-intro">
      <div class="preview">
        <img :src="`${imgPath}${this.food.fpic}`" width="333" style="position:relative; top:42px;"/>
        <div style="height: 32.8px; line-height: 32.8px; position: relative; top: 70px;">
          <div class="mt">
            <h2>店内搜索</h2>
          </div>
          <br>
         <Form :label-width="55">
          <FormItem label="食品名:" >
              <Input v-model="fname" placeholder="请输入食品名" style="width: 150px;"></Input>
          </FormItem>
          <FormItem>
              <Button type="primary" style="width: 75px;">搜索</Button>
          </FormItem>

         </Form>
        </div>
      </div>

      <div class="detail">
        <div class="food-name">
          <Icon type="md-thumbs-up"/>
          <b style="font-size: 20px;">{{this.food.fname}}</b>
          <div style="font-size: 14px;">
            {{this.food.fdesc}}
          </div>
        </div>
        <div class="summary-price" style="font-size: 14px;">
          <div class="dtd">
            <div style="width: 70px; height: 44.4px; line-height: 44.4px;">
               <div class="dt"><span>价格</span></div>
            </div>
             <div class="dd">
              <span style="color: #ED4014;">￥</span>
              <span class="price" style="font-size: 30px;">{{this.food.fprice*this.food.fdiscount}}<del style="font-size: 20px; color: #999999;">￥{{this.food.fprice}}</del></span>
             </div>
<!--             <div class="ddd" style="text-align: center;">
                <p style="color: #999;">累积评价</p>
                <a><b>{{commentNum}}</b></a>
             </div> -->
          </div>
          <div class="dtd">
            <div style="width: 70px; height: 26px; line-height: 26px;">
               <div class="dt"><span>活动</span></div>
            </div>
            <div class="dd">
              <Tag color="volcano">限时活动</Tag>
              <span>促销打折</span>
            </div>
          </div>
          <div class="dtd" style="position: relative;top:5px;">
            <div style="width: 70px; height: 26px; line-height: 26px;">
               <div class="dt"><span>优惠券</span></div>
            </div>
            <div class="dd">
              <Tag color="error">满50减20</Tag>
              <Tag color="error">满100减30</Tag>
              <a style="color: #999999;">更多>></a>
            </div>
          </div>
        </div>

        <div class="blank">

        </div>

        <div class="summary" style="font-size: 14px;">
          <Divider />
          <div class="dtd">
            <div style="width: 70px; height: 31.6px; line-height: 31.6px;">
               <div class="dt"><span>重量</span></div>
            </div>
            <div class="dd" style="width: 70px; height: 31.6px; line-height: 31.6px;">
              <span>不计重量</span>
            </div>
          </div>
            <div class="dtd">
              <div style="width: 70px; height: 31.6px; line-height: 31.6px;">
                 <div class="dt"><span>份数</span></div>
              </div>
              <div class="dd">
                  <InputNumber  v-model="num" :min="1" style="width: 50px;position: relative;" />
              </div>
            </div>
             <br>

            <div class="dtd">
              <div style="width: 70px;">
                <div class="dt"></div>
              </div>
              <div class="dd">
                <Badge :count="typeCount">
                  <Button type="error" style="width: 100px;position: relative;" @click="addToOrder">加入购物车</Button>
                    <a href="#" class="demo-badge"></a>
                </Badge>
              </div>
            </div>
           <Divider />
            <div class="dtd">
              <div style="width: 70px; font-size: 14px;">
                <div class="dt"><span style="font-size: 14px;">温馨提示</span></div>
              </div>
              <div class="dd" style="font-size: 14px;">
                <span>·一切以实物为准</span>
              </div>
            </div>
            <br>
            <div class="dtd">
              <div style="width: 70px; font-size: 14px;">
                <div class="dt"><span>服务</span></div>
              </div>
              <div class="dd" style="font-size: 14px;">
                <Icon type="ios-happy-outline" />卫生干净
                <Icon type="ios-information-circle-outline" />绝无非法添加剂
                <Icon type="ios-no-smoking-outline" />环境整洁
                <Icon type="ios-thumbs-up-outline" />美味可口
              </div>
            </div>

          </div>

        </div>

        <div class="recommend" v-if="dataList.length>0">
            <div class="extra">
              <div class="track-tit">
                <img src="../../public/imgs/title1.png" style="width: 300px;height: 300px;position: relative; top: 20px;" />
                <el-divider><h2>店长推荐</h2></el-divider>
                <div class="banner">
                  <div class="item">
                    <a @click="route(dataList[currentIndex])">
                      <img :src="`${imgPath}${dataList[currentIndex].fpic}`" style="width: 300px;height: 200px;">
                      <div style="position: relative;top: -49px;background-color: #999999; opacity: 0.8;">
                        <h2 style="color: #FFFFFF;">{{dataList[currentIndex].fname}}</h2>
                      </div>
                    </a>
                  </div>
                  <div style="position: relative; top: -40px;font-size: 15px;color: #E4393C;">
                    <h3>￥{{dataList[currentIndex].fprice*dataList[currentIndex].fdiscount}}</h3>
                  </div>
                  <div class="page" v-if="this.dataList.length > 1">
                    <ul>
                      <li @click="gotoPage(prevIndex)" class="ul-li">&lt;</li>
                      <li v-for="(item,index) in dataList" class="ul-li" @click="gotoPage(index)" :class="{'current':currentIndex == index}">  {{index+1}}</li>
                      <li @click="gotoPage(nextIndex)" class="ul-li">&gt;</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

        </div>

      </div>
    <Divider dashed  />


    </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data(){
      return{
        dataList:[],
        currentIndex: 0,   //默认显示图片
        timer: null    ,//定时器

        num:1,//份数
        size:'',//份量大小
        value2:0,
        commentNum:2500,
        imgPath:'http://localhost:8082/res/',
        fname:'',//搜索的食品名
        dark:'dark',
        typeCount:0,//购物车已选种类
        menu:'售后保障',//菜单
        count:0,
        food:'',
        recommendFood:[],

      }
    },
    computed:{
        //上一张
        prevIndex() {
          if(this.currentIndex == 0) {
            return this.dataList.length - 1;
          }else{
            return this.currentIndex - 1;
          }
        },
        //下一张
        nextIndex() {
          if(this.currentIndex == this.dataList.length - 1) {
            return 0;
          }else {
            return this.currentIndex + 1;
          }
        }

    },
    created(){
       let id = this.$route.query.fid
       console.log(id);
       this.axios.get('http://localhost:8082/food/getFoodByFid',{params:{
         fid:id,
       }}).then(r=>{
         this.food = r.data;
         console.log(r.data);
       });
       this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(r=>{
         this.typeCount=r.data;
       });
       this.axios.get("http://localhost:8082/food/getdiscountFood").then(r=>{
         console.log(r.data);
         this.dataList=r.data;
       })
    },
    watch:{
      runInv:function(){
        this.timer = setInterval(() => {
          this.gotoPage(this.nextIndex)
        }, 100)
      }

    },
    methods:{
      gotoPage(index) {
        this.currentIndex = index;
      },

      add(){
        this.num++;
      },
      minus(){
        if(this.num==1){
          this.$Modal.error({
            title:'警告',
            content:'已达到最小值',
          })
        }else{
          this.num--;
        }

      },
      changeMenu(name){
        if(name==1){
          this.menu="售后报账"
        }else if(name==2){
          this.menu="商品评价"
        }
      },
      addToOrder(){
         var cartFood = JSON.parse(JSON.stringify(this.food));
         cartFood.fnum = this.num;
        this.axios.post("http://localhost:8082/cart/insertCart",cartFood).then(r=>{
          this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(r=>{
            console.log(r.data);
            this.typeCount=r.data;
            this.$store.dispatch("saveCartCount",r.data);
          });
        });
      },
      route(food){
        this.food=food;
      }
    }
  }

</script>

<style>
  .horizontal-banner{
    top: 20px;
    background: url(/imgs/banner1.jpg);
    position: relative;
    width: 100%;


  }
  .horizontal-banner1{
    background: url(/imgs/banner2.jpg);
    position: relative;
    width: 100%;

  }
  .product-intro {
      position: relative;
      top: 20px;
      *z-index: 1;
      margin: auto;
      width: 1410px;
      height: 700pxpx;
      background-color: #FFFFFF;
      display: flex;
      flex: 12;

  }
  .preview-info{
    position: relative;
    top: 50px;
    height: 30px;
  }
  .preview {
    position: relative;
    flex: 3;
    background-color: #FFFFFF;
  }
  .detail{
    position: relative;
    flex: 7;
    background-color: #FFFFFF;
  }
  .food-name{
   color: #666;
   font-size: 15px;
   position: relative;
   margin: auto;
   width: 700px;
   height: 100px;
   background-color: #f3f3f3;
   top: 43.6px;
  }
  .summary-price{
    position: relative;
    top: 66px;
    margin: auto;
    width: 700px;
    height: 200.5px;
    padding: 10px 0 0;
    background: #f3f3f3;
  }
  .recommend{
    position: relative;
    flex: 2;
    color: #000000;
  }
  .dtd{
    display: flex;
    flex:10;
  }
  .dt {
    flex:2;
    text-align: center;
  }
  .dd {
    flex:7;
  }
  .ddd{
    flex:1;
  }
  .price {
    color: #ED4014;
    font-size: 22px;
  }
  .blank{
    position: relative;
    top: 70px;
    margin: auto;
    width: 700px;
    height: 30px;
    padding: 10px 0 0;
    background: #f3f3f3;
  }
  .summary{
    position: relative;
    top: 80px;
    margin: auto;
    width: 700px;
    height: 310px;
    padding: 10px 0 0;
    background: #f3f3f3;
  }
  .track-tit {
    position: relative;
    line-height: 50px;
    font-size: 12px;
    color: #666;
    font-weight: 400;
    text-align: center;
}
.extra {
    display: block;
    right: auto;
    left: auto;
    box-shadow: none;

}
.mt {
  position: relative;
  height: 40.8px;
  background-color: #f7f7f7;
  border: 1px solid #eee;
}
.other{
  position: relative;
  display: flex;
  flex:10;
  *z-index: 1;
  margin: auto;

  width: 1210px;
  background-color: #FFFFFF;
}
.preview1{
  position: relative;
  flex: 2;
  background-color: #FFFFFF;
}
.detail1{
  position: relative;
  flex: 8;
  background-color: #19BE6B;
}
.mc{
  height: 150px;
  text-align: center;
  background-color: #FFFFFF;
  border: 1px solid #eee;
  border-top: none;
  overflow: visible;
}
.demo-badge-alone{
    background: #5cb85c !important;
}



.ul-li {
    list-style: none;
    float: left;
    width: 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    color: rgba(255,255,255,.8);
    font-size: 14px;
}
.banner {
    max-width: 300px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    margin-top: 60px;
}
.banner img {
    width: 100%;
    display: block;
}
.banner .page {
    background: rgba(0,0,0,.5);
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
}
.banner .page ul {
    float: right;
}
.current {
    color: #ff6700;
}

</style>
