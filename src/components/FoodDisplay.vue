<template>
  <div class="contain">
    <div class="contain-left">
      <div style="width: 240px; height: 57.3px; line-height: 57.3px;">
        <Tag color="orange" style="width: 240px;height: 57.3px; top: 8px; position: relative; left: 50px;font-size: 25px ;text-align: center;line-height:inherit;">菜品类别</Tag>
      </div>
      <Divider />
      <Menu class="menu-food" accordion :theme="dark" @on-select="getFood">
         <div v-for="first in typeList">
           <Submenu :name=first.ftid>
             <template slot="title">
             <Icon type="ios-people" />
               {{first.ftname}}
             </template>
             <div v-for="second in first.secondTypeList">
               <MenuItem :name="second.stid">{{second.stname}}</MenuItem>
             </div>
          </Submenu>
         </div>
      </Menu>
    </div>
    <div class="contain-right">
      <div class="panel"><h1>{{title}}<Poptip trigger="hover" content="返回推荐" style="float: right;"><Button style="opacity:0.5; background-color: #FFFFFF;" @click="returnRecommand" shape="circle" icon="md-arrow-back"></Button></Poptip></Poptip></h1></div>
      <div v-for="item in foodData">
        <ul class="grid" style="position: relative; display: flex; perspective-origin: 50% 860.2px; left: 20px;">
            <li style="height: 240px; position: relative; width: 25%;" v-for="food in item">
               <div style="height: 235px;width: 150px;">
                 <div style="height: 150px;width: 150px;">
                    <img :src="`${imgPath}${food.img}`" style="width: 150px;height: 150px;"/>
                 </div>
                 <div style="background-color: #f3f3f3;width: 150px; height: 85px;">
                   <div>
                     <span style="font-size: 15px;">{{food.fname}}</span>
                   </div>
                   <div>
                     <span style="color: #ED4014;">￥</span>
                     <span style="color: #ED4014; font-size: 20px;">{{food.fprice*food.fdiscount}}<del>￥{{food.fprice}}</del></span>
                   </div>
                   <div>
                     <Button type="error" style="position: relative; width: 115px; height: 33px; float: left;" @click="route(food.id)">查看详情</Button>
                     <Button type="error" shape="circle" icon="ios-add-circle-outline" style="float: right;" @click="addToOrder(food.id)"></Button>
                   </div>
                 </div>
               </div>
            </li>


        </ul>
      </div>


    </div>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        typeList:[],//第一分类和第二分类
        foodData:[],//排列好的食物数据
        title:"今日推荐",
        dark:"light",
        imgPath:'http://localhost:8082/res/',
      }
    },
    methods:{
      getFood(name){
        console.log(name);
        this.axios.get('http://localhost:8082/foodtype/getSecondTypeByStid',{params:{
          stid:name,
        }}).then(r=>{
          console.log(r.data);
          this.title=r.data.stname;

        })
        this.axios.get('http://localhost:8082/food/getFoodBySecondType',{params:{
          stid:name,
        }}).then(r=>{
          let foods=r.data;
          let length = r.data.length;
          let food={
            id:'',
            fprice:0,
            fdiscount:0,
            img:'',
            fname:'',
          };
          this.foodData=[];
          for(let i = 0;i<Math.ceil(length/4);i++){
            let temp=[];
            for(let j = i*4;j<i*4+4;j++){
              if(j>=length){
                  break;
              }

              food.id=foods[j].fid;
              food.img=foods[j].fpic;
              food.fname=foods[j].fname;
              food.fdiscount=foods[j].fdiscount;
              food.fprice=foods[j].fprice;
              temp.push(food);
              food={
                id:'',
                img:'',
                name:'',
              };
            }
            this.foodData.push(temp);
            temp=[];
          }
          console.log(this.foodData);
        })

      },
      addToOrder(fid){
        this.axios.get("http://localhost:8082/food/getFoodByFid",{params:{
          fid:fid,
        }}).then(r=>{
          console.log(r.data);
          var data = r.data;
          var cartFood={
           fid:data.fid,
           fcost:data.fcost,
           fdesc:data.fdesc,
           fdiscount:data.fdiscount,
           fname:data.fname,
           fpic:data.fpic,
           fprice:data.fprice,
           tid:data.tid,
           fnum:1,
           }
           this.axios.post("http://localhost:8082/cart/insertCart",cartFood).then(r=>{
               this.$Message.success('已添加至购物车');
               console.log(r)
               this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(d=>{
                 this.$store.dispatch("saveCartCount",d.data);
               })

           })
        })

      },
      route(fid){
        this.$router.push({path: "/detail", query: {fid: fid}})
        console.log(fid);
      },
      returnRecommand(){
        this.title="今日推荐";
        this.axios.get('http://localhost:8082/food/getRecommendFood').then(r=>{
          let foods=r.data;
          let length = r.data.length;
          let food={
            id:'',
            fprice:0,
            fdiscount:0,
            img:'',
            fname:'',
          };
          this.foodData=[];
          for(let i = 0;i<Math.ceil(length/4);i++){
            let temp=[];
            for(let j = i*4;j<i*4+4;j++){
              if(j>=length){
                  break;
              }

              food.id=foods[j].fid;
              food.img=foods[j].fpic;
              food.fname=foods[j].fname;
              food.fdiscount=foods[j].fdiscount;
              food.fprice=foods[j].fprice;
              temp.push(food);
              food={
                id:'',
                img:'',
                name:'',
              };
            }
            this.foodData.push(temp);
            temp=[];
          }
          console.log(this.foodData);
        });
      }
    },
    created () {
      this.axios.get('http://localhost:8082/foodtype/getFirstTypeWithSecondType').then(r=>{
        this.typeList=r.data
      })
      this.axios.get('http://localhost:8082/food/getRecommendFood').then(r=>{
        let foods=r.data;
        let length = r.data.length;
        let food={
          id:'',
          fprice:0,
          fdiscount:0,
          img:'',
          fname:'',
        };
        this.foodData=[];
        for(let i = 0;i<Math.ceil(length/4);i++){
          let temp=[];
          for(let j = i*4;j<i*4+4;j++){
            if(j>=length){
                break;
            }

            food.id=foods[j].fid;
            food.img=foods[j].fpic;
            food.fname=foods[j].fname;
            food.fdiscount=foods[j].fdiscount;
            food.fprice=foods[j].fprice;
            temp.push(food);
            food={
              id:'',
              img:'',
              name:'',
            };
          }
          this.foodData.push(temp);
          temp=[];
        }
        console.log(this.foodData);
      })
    },
  }
</script>

<style scoped>
  .menu-food{
    position: relative;
    left: 50px;
    font-size: 20px;
  }
  .contain{
    position: relative;
    display: flex;
    flex: 10;
  }

  .contain-left{
    position: relative;
    flex: 2.5;
  }
  .contain-right{
    position: relative;
    flex: 7.5;
  }
  .panel{
    top: 10px;
    text-align: center;
    position: relative;
    height: 40px;
    background-color: #F5A623;
  }
  .grid {
    max-width: 69em;
    list-style: none;
    margin: 30px auto;
    padding: 0;
}

</style>
