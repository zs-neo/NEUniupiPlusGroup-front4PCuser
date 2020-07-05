<template>
  <div>
    <div class="product-intro">
      <div class="preview">
        <img :src="`${imgPath}${this.food.fpic}`" width="300" style="position:relative; top:50px;"/>
        <div class="preview-info">
           <Icon type="ios-heart"/>
          <a>
           收藏
          </a>
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
              <span class="price" style="font-size: 30px;">{{this.food.fprice*this.food.fdiscount}}<del>￥{{this.food.fprice}}</del></span>
             </div>
             <div class="ddd" style="text-align: center;">
                <p style="color: #999;">累积评价</p>
                <a><b>{{commentNum}}</b></a>
             </div>
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

        <div class="recommend">
            <div class="extra">
              <div class="track-tit">
                <img src="../../public/imgs/title.jpg" style="width: 300px;height: 300px;" />
                <h3>店长推荐</h3>
                <span></span>
              </div>

            </div>

        </div>

      </div>
    <Divider dashed  />
      <div class="other">
        <div class="preview1">
          <div style="height: 32.8px; line-height: 32.8px;">
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

        <div class="detail1">
               <Menu mode="horizontal" :theme="dark" active-name="1" @on-select="changeMenu">
                   <MenuItem name="1">
                       <Icon type="ios-paper"/>
                       售后保障
                   </MenuItem>
                   <MenuItem name="2">
                       <Icon type="ios-people" />
                       商品评价({{commentNum}})
                   </MenuItem>
              </Menu>
              <div class="mt" style="top: 20px; background-color: #eee;">
                  <h1>{{menu}}</h1>

              </div>
              <div>

              </div>
        </div>
      </div>


    </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data(){
      return{
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
        food:{
          fid:0,
          fcost:0,
          fdesc:"",
          fdiscount:0,
          fname:"",
          fpic:"",
          fprice:0,
          tid:0,
        },
        recommendFood:[],

      }
    },
    created(){
       let id = this.$route.query.fid
       console.log(id);
       this.axios.get('http://localhost:8082/food/getFoodByFid',{params:{
         fid:id,
       }}).then(r=>{
         console.log(r.data);
         this.food.fid=r.data.fid;
         this.food.fcost=r.data.fcost;
         this.food.fdesc=r.data.fdesc;
         this.food.fdiscount=r.data.fdiscount;
         this.food.fname=r.data.fname;
         this.food.fpic=r.data.fpic;
         this.food.fprice=r.data.fprice;
         this.food.tid=r.data.tid;
       })
       this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(r=>{
         this.typeCount=r.data;
       })


    },
    methods:{
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
         var cartFood={
          fid:this.food.fid,
          fcost:this.food.fcost,
          fdesc:this.food.fdesc,
          fdiscount:this.food.fdiscount,
          fname:this.food.fname,
          fpic:this.food.fpic,
          fprice:this.food.fprice,
          tid:this.food.tid,
          fnum:this.num,
        };
        this.axios.post("http://localhost:8082/cart/insertCart",cartFood).then(r=>{
          this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(r=>{
            console.log(r.data);
            this.typeCount=r.data;
            this.$store.dispatch("saveCartCount",r.data);
          });
        });
      }
    }
  }

</script>

<style>
  .product-intro {
      position: relative;
      *z-index: 1;
      margin: auto;
      width: 1210px;
      height: 663.4px;
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
   width: 590px;
   height: 80px;
   background-color: #f3f3f3;
   top: 43.6px;
  }
  .summary-price{
    position: relative;
    top: 66px;
    margin: auto;
    width: 590px;
    height: 137.5px;
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
    width: 590px;
    height: 30px;
    padding: 10px 0 0;
    background: #f3f3f3;
  }
  .summary{
    position: relative;
    top: 80px;
    margin: auto;
    width: 590px;
    height: 340px;
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
  height: 663.4px;
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


</style>
