<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>

    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><input type="checkbox" :checked="checkList.length==list.length" style="width: 15px;height: 15px;"  @click="checkAll"><span style="box-sizing: border-box; padding-left: 5px;">全选</span></li>
            <li class="col-2">商品名称</li>
            <li class="col-2">单价</li>
            <li class="col-1">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul v-if="flashTable" class="cart-item-list">
            <NoDataForCart v-if="list.length===0"></NoDataForCart>
            <li class="cart-item" v-for="(item,index) in list" :key="index">
              <div class="col-1 item-check">
                <input type="checkbox" :checked="checkList.indexOf(item.fid)>=0" ref="selection" style="width: 15px;height: 15px;"  @click="checkOne(item.fid)"/>
              </div>
              <div class="col-2 item-name">
                <div>
                  <img style="border-radius: 10px; border: solid 1px lightgrey;" v-lazy="`${imgPath}${item.fpic}`">
                </div>
                <div><span>{{item.fname}}</span></div>
              </div>
              <div class="col-2 item-price">
                <span style="font-size: 12px;">￥</span>
                <span style="padding-right:15px;">{{item.fprice*item.fdiscount}}</span>
                <del style="color: #991968;"><span style="font-size: 12px;">￥</span>{{item.fprice}}</del>
              </div>
              <div class="col-1 item-num">
                 <InputNumber :min="1" style="width: 70px;" @on-change="change(item.fnum,item.fid)" v-model="item.fnum"></InputNumber>
              </div>
              <div class="col-1 item-total">{{item.fnum*item.fprice*item.fdiscount}}</div>
              <div class="col-1 item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a style="color: red; text-decoration: underline;" href="/index">继续点餐</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkList.length}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>


    <service-bar></service-bar>
  </div>

</template>
<script>
import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
import NoDataForCart from '../components/NoDataForCart.vue'
export default {
  name: 'index',
  components: {
    // 可以使用<order-header>或<OrderHeader>
    OrderHeader,
    ServiceBar,
    NavFooter,
    NoDataForCart
  },
  data () {
    return {
      imgPath:"http://localhost:8082/res/",
      list: [], // 商品列表
      cartTotalPrice: 0, // 商品总金额
      checkedNum: 0,// 选中商品数量
      checkList:[],//选中框
      ischeckAll:false,
      flashTable: true
    }
  },
  mounted () {
    this.axios.get('http://localhost:8082/cart/getCart').then(r=>{
      if(r.data.msg === undefined){
        this.list=r.data;
        this.checkAll();
      }else{
        this.$message.error("请先登录");
        this.$router.push('/');
      }

    });
  },
  watch:{
    checkList(newValue, oldValue){
      if(newValue.length==this.list.length){
        this.ischeckAll = true;
      }else{
        this.ischeckAll = false;
      }
    },
    list(newVal){
      if(newVal.length>0){
        this.flashTable =false;       
        this.list = newVal
        this.flashTable = true;
      }
    }
  },
  methods: {
    checkOne (fid) {
        let idIndex = this.checkList.indexOf(fid)
        if (idIndex >= 0) {
          // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
          this.checkList.splice(idIndex, 1)
        } else {
          // 选中该checkbox
          this.checkList.push(fid)
        }
        if(this.list.length==this.checkList.length){
          this.ischeckAll=true;
        }
        this.cartTotalPrice=0;
        for(let i = 0;i<this.checkList.length;i++){

          for(let j = 0;j<this.list.length;j++){
              if(this.checkList[i]==this.list[j].fid){
              this.cartTotalPrice=Math.floor((this.cartTotalPrice+this.list[j].fnum*this.list[j].fdiscount*this.list[j].fprice)*100)/100;
              }
          }
        }
    },
    checkAll () {
      this.ischeckAll = !this.ischeckAll
      if (this.ischeckAll) {
        // 全选时
        this.checkList = []
        this.list.forEach(function (item) {
          this.checkList.push(item.fid)
        }, this)
      } else {
        this.checkList = []
      }
      this.cartTotalPrice=0;
      for(let i = 0;i<this.checkList.length;i++){

        for(let j = 0;j<this.list.length;j++){
            if(this.checkList[i]==this.list[j].fid){
              this.cartTotalPrice=Math.floor((this.cartTotalPrice+this.list[j].fnum*this.list[j].fdiscount*this.list[j].fprice)*100)/100;
            }
        }
      }
    },
    // 获取购物车列表
    getCartList () {
      this.axios.get('/carts').then((res) => {
        this.renderData(res)
      })
    },
    // 更新购物车数量和购物车单选状态
    updateCart (item, type) {
      let quantity = item.quantity
      let selected = item.productSelected
      if (type === '-') {
        if (quantity === 1) {
          this.$message.warning('商品至少保留一件')
          return
        }
        --quantity
      } else if (type === '+') {
        if (quantity > item.productStock) {
          this.$message.warning('购买数量不能超过库存数量')
          return
        }
        ++quantity
      } else {
        selected = !item.productSelected
      }
      this.axios.put(`/carts/${item.productId}`, {
        quantity,
        selected
      }).then((res) => {
        this.renderData(res)
      })
    },
    // 删除购物车商品
    delProduct (item) {
      let index=0;
      for(let i = 0;i<this.list.length;i++){
        if(item.fid==this.list[i].fid){
          index = i;
        }
      }
      console.log(this.list[index]);
      this.axios.post('http://localhost:8082/cart/deleteCartItem',this.list[index]).then(r=>{
        console.log(r.data);
        this.$Message.success("删除成功");
        this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(d=>{
          this.$store.dispatch("saveCartCount",d.data);
        })
      })
      this.list.splice(index,1);

    },

    // 公共赋值
    renderData (res) {
      this.list = res.cartProductVoList || []
      this.checkedNum = this.list.filter(item => item.productSelected).length
    },
    // 购物车下单
    order () {
      if(this.checkList.length==0){
        this.$Message.error("至少选择一项");
      }else{
        this.$router.push({
          path:'/confirm',
          query:{list:this.checkList}
        })
      }
      // }else{
      //   this.axios.post("http://localhost:8082/cart/deleteCartItems",this.checkList).then(r=>{
      //     this.axios.get('http://localhost:8082/cart/getCart').then(d=>{
      //       this.list=d.data;

      //     });
      //   })
      // }
    },
    change(fnum,fid){
      console.log(fnum);
      console.log(fid);
      this.axios.get("http://localhost:8082/cart/updataCart",{params:{
        fnum:fnum,
        fid:fid
      }}).then(r=>{
        console.log(r.data);
      })


    }
  }
}
</script>
<style lang="scss" scoped>
  .col-1{
    flex:1;
  }
  .col-2{
    flex:2;
  }
  .cart{
    box-sizing: border-box;
    height: 95%;
    .wrapper{
      height: 75%;
      background-color:#F5F5F5;
      padding-top:30px 0px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          text-align: center;
          display:flex;
          height: 79px;
          line-height: 79px;
        }
        .cart-item-list{
          height: 365px;
          overflow: auto;

          .cart-item{
            display: flex;
            text-align: center;
            font-family: simsun;
            font-weight: 900;
            color: #666666;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
            }
            .item-name{
              height: inherit;
              margin: 0px;
              font-size: 18px;
              box-sizing: border-box;

              img{
                width:80px;
                height:80px;
                margin-left: 0px;
                display: inline-block;
                // vertical-align:top;
              }
              div{
                height: inherit;
                padding:22px 15px;
                display: inline-block;
                line-height: 80px;
                vertical-align:middle
              }
            }
            .item-price{
              color: red;
            }
            .item-num{
              // .num-box{
              //   display:inline-block;
              //   width:inherit;
              //   height:40px;
              //   line-height:40px;
              //   border:1px solid #E5E5E5;
              //   font-size:14px;
              //   a{
              //     display:inline-block;
              //     width:50px;
              //     color:#333333;
              //   }
              //   span{
              //     display:inline-block;
              //     width:50px;
              //     color:#333333;
              //   }
              // }
            }
            .item-total{
              color:#FF6600;
            }
            .item-del{
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
        .cart-item-list::-webkit-scrollbar{
          display: none;
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>
