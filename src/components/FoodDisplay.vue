<template>
  <div class="contain">
    <div class="contain-left">
       <div class="topTitle">
          <span style="font-size: 25px ;text-align: center;line-height:inherit; font-weight: 900;">菜品类别 <span style="font-size: 20px;color: #808695">Menu</span></span>
      </div>
      <Divider style="margin: 15px 0px;" />
      <Menu class="menu-food" accordion :theme="dark" @on-select="getFood">
         <div v-for="first in typeList">
           <Submenu :name=first.ftid>
             <template slot="title">
              <i :class="typeicon.get(first.ftid)"></i>
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
      <div class="panel"><h1 style="color: #F39B00; display: inline-block;">{{title}}</h1><Poptip trigger="hover" content="返回推荐" style="float: right; display: inline-block"><Button style="opacity:0.5; background-color: #FFFFFF;" @click="returnRecommand" shape="circle" icon="md-arrow-back"></Button></Poptip></div>
      <div style="height: fit-content;padding: 10px 40px;">
        <CheckboxGroup v-model="types" @on-change="onChange">
			<Checkbox label="热销" style="font-size: 18px;"><Icon type="md-flame" />热销</Checkbox>
			<Checkbox label="优选" style="font-size: 18px;"><Icon type="md-pricetags" />优选</Checkbox>
			<Checkbox label="折扣" style="font-size: 18px;"><Icon type="logo-yen" />折扣</Checkbox>
		</CheckboxGroup>
      </div>
      <template style="margin: auto;" v-for="item in foodData">
        <ul class="grid" style="position: relative; display: flex; perspective-origin: 50% 860.2px;">
            <li style="height: 200px; position: relative; width: 25%; box-sizing: border-box; padding: 0px 30px;" v-for="food in item">
               <div style="height: 200px;width: 150px;">
                 <div style="height: 100px;width: 150px;overflow: hidden;">
                    <a @click="route(food.id)">
                       <img class="foodImgArea" v-lazy="`${imgPath}${food.img}`" style="width: 150px;height: 100px;"/>
                     </a>
                 </div>
                 <div style="background-color: #f3f3f3;width: 150px; height: 85px;">
                   <div style="height: 25px;">
                      <a @click="route(food.id)" style="color: #808695">
                       <span style="font-size: 15px; font-weight: 900;">{{food.fname}}</span>
                      </a>
                   </div>
                   <div style="height: 25px;">
                     <a @click="route(food.id)" style="color: #808695">
                      <span style="font-size: 13px; font-weight: 900;">销量<span style="color: red;padding-left: 5px;">{{food.salesnum}}</span></span>
                     </a>
                   </div>
                   <div>
                    <span style="color: #ED4014;">￥</span>
                     <span style="color: #ED4014; font-size: 20px;padding-right: 10px;">{{food.fprice*food.fdiscount}}</span><del style="color: #808695; font-size: 15px;"><span style="font-size: 10px;">￥</span>{{food.fprice}}</del>
                     <Button type="error" shape="circle" icon="ios-add-circle-outline" style="float: right; right:59px;background-color: #F5A623;border: none;" @click="addToOrder(food.id)"></Button>
                   </div>
                 </div>
               </div>
            </li>


        </ul>
      </template>


    </div>

    <div class="contain-farright">
      <div class="compnentsCcontent">
        <EventNotify></EventNotify>
        <FullReductCard></FullReductCard>
        <EventCard></EventCard>
      </div>
    </div>
  </div>

</template>

<script>
  import EventNotify from './event/EventNotify.vue'
  import FullReductCard from './event/FullReductCard.vue'
  import EventCard from './event/EventCard.vue'
  export default{
    components:{
        EventNotify,
        EventCard,
        FullReductCard,
    },
    data(){
      return{
        salefood:[],//热销食品
		discountfood:[],//折扣食品
		groupfood:[],//优选食品
        typeList:[],//第一分类和第二分类
        foodData:[],//排列好的食物数据
        types:[],//模糊查询标签
        flist:[],//保存未排列的食物数据,也是模糊查询的当前数据
        allFood:[],
        title:"今日推荐",
        dark:"light",
        imgPath:'http://localhost:8082/res/',
        typeicon:new Map(),
      }
    },
    methods:{
         onChange(){
          this.title='食品列表';
          if(this.types.length==0){
            this.title='今日推荐';
            this.returnRecommand();
            this.flist=this.allFood;
          }else{
            this.flist=this.allFood;
            for(let k = 0;k<this.types.length;k++){
              let tempList=[];
              if(this.types[k]=='热销'){
                for(let i=0;i<this.flist.length;i++){
                   for(let j = 0;j<this.salefood.length;j++){
                     if(this.flist[i].fid==this.salefood[j].fid){
                       tempList.push(this.flist[i]);
                     }
                   }
                }
                this.flist=tempList;
              }else if(this.types[k]=='优选'){
				for(let i=0;i<this.flist.length;i++){
				   for(let j = 0;j<this.groupfood.length;j++){
					 if(this.flist[i].fid==this.groupfood[j].fid){
					   tempList.push(this.flist[i]);
					 }
				   }
				}
                this.flist=tempList;
              }else if(this.types[k]=='折扣'){
				  for(let i=0;i<this.flist.length;i++){
					 for(let j = 0;j<this.discountfood.length;j++){
					   if(this.flist[i].fid==this.discountfood[j].fid){
						 tempList.push(this.flist[i]);
					   }
					 }
				  }
                this.flist=tempList;
              }
            }
            this.dataToTable(this.flist);
          }

        },
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

              food.salesnum = foods[j].salesnum;
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
          this.dataToTable(r.data);
        });
      },
      dataToTable(foods){
        let length = foods.length;
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
            food.salesnum = foods[j].salesnum;
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
      },
    },
    created () {
      this.typeicon.set(13,"el-icon-ice-tea");
      this.typeicon.set(12,"el-icon-dish-1");
      this.typeicon.set(11,"el-icon-hot-water");
      this.typeicon.set(10,"el-icon-burger");
      this.typeicon.set(9,"el-icon-food");
      this.typeicon.set(14,"el-icon-tableware");
      this.axios.get('http://localhost:8082/foodtype/getFirstTypeWithSecondType').then(r=>{
        this.typeList=r.data
      });
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
            food.fprice=foods[j].fprice
            food.salesnum = foods[j].salesnum;
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
       this.axios.get('http://localhost:8082/food/getSaleFood').then(r=>{
          this.salefood=r.data;
        });
        this.axios.get('http://localhost:8082/food/getAll').then(r=>{
          this.allFood=r.data;
          this.flist=r.data;
        });
		 this.axios.get('http://localhost:8082/food/getdiscountFood').then(r=>{
			this.discountfood=r.data;
		  });
		  this.axios.get('http://localhost:8082/food/getGroup1Food').then(r=>{
			this.groupfood=r.data;
		  })
    },
  }
</script>

<style scoped>

  .foodImgArea:hover{
    transform: scale(1.1);
  }
  .foodImgArea{
    transition: all ease-in-out 0.3s;
  }

  .menu-food{
    font-size: 20px;
  }
  .contain{
    box-sizing: border-box;
    padding: 20px;
    display: flex;
  }

  .topTitle{
    width: inherit;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-top: 10px;
  }
  .ivu-menu-vertical /deep/ .ivu-menu-submenu-title {
      padding: 12px 15px;
      width: inherit;
    }
  .contain-left{
    flex: 1;
    padding: 0px 20px;


  }

  .contain-right{
    flex: 3;
    padding: 0px 20px;
  }
  .contain-farright{
    flex: 1;
    padding: 0px 20px;
    .compnentsCcontent{
      width: fit-content;
    }
  }
  .panel{
    padding: 10px;
    background-color: red !important;
    text-align: center;
    height: 55px;
    background-color: #FFFFFF;
  }
  .grid {
    max-width: 69em;
    list-style: none;
    margin: 30px auto;
    padding: 0;
}

</style>
