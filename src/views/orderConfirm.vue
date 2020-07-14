<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收货地址</span>
      </template>
    </order-header>

    <!-- 用svg来替换图片的请求，性能优化 -->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z" class="path1"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path>
          <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path>
          <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path>
          <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path>
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="selectWayArea">
            <div class="wayContent" :class="{'checked':'0' === checkWayIndex}" @click="checkWayIndex='0'">堂食</div>
            <div class="wayContent" :class="{'checked':'1' === checkWayIndex}" @click="checkWayIndex='1'">配送</div>
          </div>
          <transition name="el-fade-in-linear">
            <div v-if="checkWayIndex==='1'" class="item-address">
              <h2 class="addr-title">收货地址</h2>
              <div class="addr-list clearfix">
                <div class="addr-info" :class="{'checked':index === checkIndex}" @click="chooseAddress(index)" v-for="(item,index) in list" :key="index">
                   <h2>{{item.username}}</h2>
                  <div class="phone">{{item.phone}}</div>
                  <div class="street">{{item.province + ' ' + item.city + ' ' + item.district + ' ' + item.address}}</div>
                  <div class="action">
                    <!-- 删除地址图片 -->
                    <a href="javascript:;" class="fl" @click="delAddress(item)">
                      <svg class="icon icon-del">
                        <!-- 使用上面定义的svg矢量图 -->
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                    <!-- 编辑地址图片 -->
                    <a href="javascript:;" class="fr" @click="routeEdit">
                      <svg class="icon icon-edit">
                        <use xlink:href="#icon-edit"></use>
                      </svg>
                    </a>
                  </div>
                </div>
                <div class="addr-add" @click="routeAdd">
                  <div class="icon-add"></div>
                  <div>添加新地址</div>
                </div>
              </div>
            </div>
          </transition>

          <div class="item-good">
            <h2>商品明细</h2>
            <ul>
              <li class="itemTitle"><span>商品名称</span><span>数量</span><span>单价</span><span>总计</span></li>
              <li class="goodItem" v-for="(item,index) in cartList" :key="index">
                <div class="good-name">
                  <img style="border-radius: 50%;" v-lazy="`${imgPath}${item.fpic}`" >
                  <span style="padding-left: 10px;">{{item.fname}}</span>
                </div>
                <div class="good-amount"><span style="padding-left: 10px;color: green;">x{{item.fnum}}</span></div>
                <div class="good-price" style="width: 100px;"><span style="font-size: 12px;">￥</span><span style="padding-right: 10px;">{{item.fprice*item.fdiscount}}</span></div>
                <div class="good-total" style="width: 150px;"><span style="font-size: 12px;">￥</span>{{item.fprice*item.fdiscount*item.fnum}}</div>
              </li>
            </ul>
          </div>

          <div style="padding: 20px 0px; ">
            <div style="padding-right: 25px;width: fit-content; font-weight: 900; padding: 10px 0px;"><h2>优惠券</h2></div>
          </div>
          <div class="selectCouponArea">
            <div></div>
            <div class="couponContent" :class="{'checked':'0' === checkCouponIndex}" @click="checkCouponIndex='0'">不使用</div>
            <div class="couponContent" :class="{'checked':'1' === checkCouponIndex}" @click="checkCouponIndex='1'">使用</div>
          </div>
          <div v-if="checkCouponIndex === '1'" class="couponContent">
            <div class="coupon-info"
            :class="{'checked':index === couponIndex}"

            @click="chooseCoupon(index)"
            v-for="(item,index) in myCoupons" :key="index">
              <div v-bind:class="[item.rpid === undefined ? 'couponClass':'redPacketClass']">
                <span style="padding-right: 5px;"><span style="font-size: 10px;">￥</span>{{item.rpid === undefined?item.reduceMoney:item.rpmoney}}</span>
                <span>{{item.rpid === undefined?'满'+item.upToMoney+'可用':'无门槛'}}</span>
              </div>
            </div>
          </div>
          <div style="padding: 20px 0px; ">
            <div style="padding-right: 25px;width: fit-content; font-weight: 900; padding: 10px 0px;"><h2>备注</h2></div>
              <Input
                type="textarea"
                style="width:50%"
                v-model="remark"
                :maxlength=100
                show-word-limit
                placeholder="  备注 (不超过100字)...">
              </Input>
          </div>
          <div v-if="checkWayIndex==='1'" class="item-shipping">
            <h2>配送方式</h2>
            <span>专员配送</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">纸质发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}} 件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{totalPrice}} 元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">{{activityPrice}} 元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠券减免：</span>
              <span class="item-val">-{{discountPrice}} 元</span>
            </div>
            <div v-if="checkWayIndex==='1'" class="item">
              <span class="item-name">包装配送费：</span>
              <span class="item-val">5元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{payPrice.toFixed(2)}} 元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="javascript:void(0)" @click="backToCart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:void(0)" @click="orderSubmit" class="btn btn-large" >去结算</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from './../components/Modal';
import OrderHeader from './../components/OrderHeader';
import Distpicker from 'v-distpicker';
import Vue from 'vue';
let server="http://localhost:8082/";
let getCouponURL="couponreceive/getByClientIdAndStatus";
let getRedPacketsURL="redpacketreceive/getByClientIdAndStatus";
import '../util/bigdecimal.js';
export default {
  name: 'order-confirm',
  components: {
    Modal,
    OrderHeader,
    Distpicker
  },
  data () {
    return {
      checkWayIndex: '0',//默认堂食
      checkCouponIndex: '0',//默认不使用优惠券和红包
      remark:'',
      checkList:[],
      imgPath:"http://localhost:8082/res/",
      list: [], // 收货地址列表
      deliveryAddress:'',
      discountContent: '',
      cartList: [], // 购物车中需要结算的商品列表
      totalPrice:0,//未减免金额
      activityPrice:0,//活动减免金额
      cartTotalPrice: 0, // 商品总金额
      discountPrice: 0,
      payPrice: 0,
      count: 0, // 商品结算数量
      deliveryCost: 5,
      orderDeliveryCost: 0,
      userAddress: {
        userid:'',
        username:'',
        phone:'',
        province:'',
        city:'',
        district:'',
        address:'',
        postal:''
      },
      userAction: '', // 用户行为: 0新增、1编辑、2删除
      showDelModal: false, // 是否显示删除弹框
      showEditModal: false, // 是否显示新增或者编辑弹框
      checkIndex: 0,// 当前收货地址选中索引,
      couponIndex: 0, //当前优惠券选中索引
      myCoupons:[],
    }
  },
  watch:{
    checkWayIndex(newVal){
      if(newVal==='1'){
        if(this.totalPrice<50){
          this.$message.error("50元以内不予配送...");
          this.checkWayIndex = '0';
          // location.reload();
        }else{
          this.orderDeliveryCost = this.deliveryCost;
        }
      }else{
        this.orderDeliveryCost = 0;
      }
    },
    orderDeliveryCost(newVal){
      this.payPrice = newVal + this.cartTotalPrice - this.discountPrice;
      console.log(this.payPrice);
    },
    checkCouponIndex(newVal){
      if(newVal === '1'){
        if(this.myCoupons[0].rpid === undefined){
          this.discountPrice = this.myCoupons[0].reduceMoney;
        }else{
          this.discountPrice = this.myCoupons[0].rpmoney;
        }
      }else{
        this.discountPrice = 0;
      }
    },
    discountPrice(newVal){
      this.payPrice = this.cartTotalPrice + this.orderDeliveryCost - newVal;
      console.log(this.payPrice);
    }
  },
  created () {
    this.getAddressList();
    this.checkList=this.$route.query.list;
    this.getCartList();
  },
  mounted() {
    this.getCoupons(getCouponURL, 0);
    this.getRedPackets(getRedPacketsURL, 0);
  },
  methods: {
    chooseAddress(index){
      this.checkIndex=index;
      this.deliveryAddress = this.list[index];
    },
    chooseCoupon(index){
      this.couponIndex=index;
      this.discountContent = this.myCoupons[index];
      if(this.myCoupons[index].rpid===undefined){
        this.discountPrice = this.myCoupons[index].reduceMoney;
      }else{
        this.discountPrice = this.myCoupons[index].rpmoney;
      }
    },
    backToCart(){
      this.$router.push("/cart");
    },
    getAddressList () {
      this.axios.get("http://localhost:8082/userAddress/getUserAddress").then((res) => {
        if(res.data.status){
          this.list = res.data.list;
          this.deliveryAddress = this.list[0];
          this.checkIndex = 0;
        }else{
          this.$message.error(res.data.msg);
        }
      });
    },

    routeAdd () {
      this.$router.push("/clientCenter/addAddress");
      this.userAction = 0
      this.userAddress = {}
      this.showEditModal = true
    },

    routeEdit () {
      this.$router.push("/clientCenter/myAddress");
    },
    delAddress (item) {
      this.$confirm("此操作不可撤销, 确认删除？", "警告", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.get("http://localhost:8082/userAddress/deleteUserAddress",{params:{
          addressid:item.addressid,
        }}).then(r=>{
          if(r.data.status){
            this.$message.success("删除成功");
          }else{
            this.$message.error(rs.data.msg);
          }
          console.log(r.data);
          this.getAddressList();
        })
      }).catch(() => {
        this.$message({
        type: 'info',
        message: '已取消'
        });
      });
    },
    getCartList () {
      this.axios.post("http://localhost:8082/cart/getCartsByFids",this.checkList).then(r=>{
        console.log(r.data);
        this.cartList=r.data;
        this.count=r.data.length;
        this.cartTotalPrice=0;
        this.totalPrice=0;
        for(let i = 0;i<this.count;i++){
          this.totalPrice+=Math.floor((r.data[i].fnum*r.data[i].fprice)*100)/100;
          this.cartTotalPrice+=Math.floor((r.data[i].fnum*r.data[i].fprice*r.data[i].fdiscount)*100)/100;
        }
        this.activityPrice=Math.floor((this.cartTotalPrice-this.totalPrice)*100)/100;
        this.payPrice = this.cartTotalPrice;
        // for(let i = 0;i<this.count;i++){
        //   this.totalPrice+=(new BigDecimal(r.data[i].fnum)*new BigDecimal(r.data[i].fprice));
        //   this.cartTotalPrice+=(new BigDecimal(r.data[i].fnum)*new BigDecimal(r.data[i].fprice)*new BigDecimal(r.data[i].fdiscount));
        // }
        // this.activityPrice=(this.cartTotalPrice-this.totalPrice);
        // this.payPrice = this.cartTotalPrice;

      })
    },
    getCoupons(geturl,status){
        Vue.axios.get(`${server}${geturl}`,{params:{
      			 clientid: JSON.parse(sessionStorage.getItem("user")).clientid,
             status:status,
       		}}).then((res) => {
        if(res.data.getmsg){
          var tempCoupons=res.data.couponReceives;
          console.log(tempCoupons);
          let coupon;
          for(let i=0;i<tempCoupons.length;i++){
             coupon=tempCoupons[i].coupon;
             coupon.couponbegtime=this.handleTime(coupon.couponbegtime);
             coupon.couponendtime=this.handleTime(coupon.couponendtime);
             this.handleMoney(coupon.couponname, rs=>{
               coupon.upToMoney = rs[0];
               coupon.reduceMoney = rs[1];
             });
             // console.log('total-price: '+this.totalPrice);
             coupon.crid = tempCoupons[i].crid;
             if(coupon.upToMoney<this.totalPrice){
               this.myCoupons.push(coupon);
             }

          }
          if(tempCoupons.length>0){
            this.discountContent = this.myCoupons[0];
          }
          console.log(this.myCoupons);
        }
      })
    },
    handleTime(t){
      var timeArr = t.replace(" ", ":").replace(/\:/g, "-").split("-");
      var time = timeArr[0]+'.'+timeArr[1]+'.'+timeArr[2];
      return time;
    },
    //截取满减金额
    handleMoney(str, callback){
      var numArr = str.match(/\d+/g);//分割出数字
      callback(numArr);
    },
    AddDays(date,days){
         var nd = new Date(date);
           nd = nd.valueOf();
       nd = nd + days * 24 * 60 * 60 * 1000;
       nd = new Date(nd);
         var y = nd.getFullYear();
         var m = nd.getMonth()+1;
         var d = nd.getDate();
         if(m <= 9) m = "0"+m;
         if(d <= 9) d = "0"+d; 
         var cdate = y+"."+m+"."+d;
         return cdate;
     },
    //获取当前用户所有红包信息
    getRedPackets(geturl,status){
      this.axios.get(`${server}${geturl}`,{params:{
          clientid: JSON.parse(sessionStorage.getItem("user")).clientid,
          status:status,
      }}).then((res) => {
        console.log("red");
        console.log(res.data);
        if(res.data.getmsg){
          for(let i=0;i<res.data.redPacketReceives.length;i++){
             let redPacket=res.data.redPacketReceives[i].redPacket;
             redPacket.rpbegtime=this.handleTime(res.data.redPacketReceives[i].createtime);
             redPacket.rpendtime=this.AddDays(redPacket.rpbegtime,7);//红包领取时间加7天为有效日期范围
             redPacket.id = res.data.redPacketReceives[i].id;
             this.myCoupons.push(redPacket);
           }

          if(res.data.redPacketReceives.length>0){
            this.discountContent = this.myCoupons[0];
          }
        }

      })
    },
    // 订单提交
    orderSubmit () {
      if(this.checkWayIndex === '1' && this.deliveryAddress===''){
        this.$message.error("请添加地址");
        return;
      }
      sessionStorage.setItem("payOrder", this.cartList);
      let addressid;
      let discountid;
      let discountType;
      if(this.checkWayIndex === '1'){
        console.log("----------address area top----------");
        console.log(this.deliveryAddress);
        console.log(this.orderDeliveryCost);
        addressid = this.deliveryAddress.addressid;
        console.log("----------address area bottom----------");
      }
      if(this.checkCouponIndex === '1'){
        console.log("----------discount area top----------");
        console.log(this.discountContent);
        console.log(this.discountPrice);
        if(this.discountContent.rpid===undefined){
          discountType = 0;
          discountid = this.discountContent.crid;
        }else{
          discountType = 1;
          discountid = this.discountContent.id;
        }

        console.log("----------discount area bottom----------");
      }
      var order = {
        cost: this.payPrice.toFixed(2),
        remark: this.remark,
        couponid: discountid,
        discountType: discountType,
        userAddressId: addressid,
        orderDetailsList:[]
      };
      //TODO
      for(var foodItem of this.cartList){
        order.orderDetailsList.push({
          foodid: foodItem.fid,
          amount: foodItem.fnum
        });
      }
      console.log(order);
      sessionStorage.setItem("orderConfirmInfo", JSON.stringify(order));
      sessionStorage.setItem("deliverAddress", JSON.stringify(this.deliveryAddress));
      sessionStorage.setItem("discountprice", this.activityPrice - this.discountPrice);
      console.log(JSON.parse(sessionStorage.getItem("orderConfirmInfo")));
      Vue.axios.post(`http://localhost:8082/order/addOrder`, order).then(rs=>{
        console.log(rs.data);
        if(rs.data.status){
          this.$message.success("提交成功");
          this.axios.post("http://localhost:8082/cart/deleteCartItems",this.checkList);
          // this.$router.push("/clientCenter/myOrders");

          this.$router.push({
            path: '/order/pay',
            query: {
              orderNo: rs.data.serialnum
            }
          });
        }else{
          this.$message.error(rs.data.msg);
        }
      });


    },
    changeProvince(a){
      this.userAddress.province=a.value;
    },
    changeDistrict(a){
      this.userAddress.district=a.value;
    },
    changeCity(a){
      this.userAddress.city=a.value;
    }
  }
}
</script>
<style lang="scss">
  .coupon-info{
    font-family: simsun;
    font-weight: 900;
    font-size: 15px;
    box-sizing: border-box;
    width: 122px;
    height: 37px;
    margin: 5px;
    line-height: 37px;
    // height: fit-content;
    cursor: pointer;
    display: inline-block;
    // width: fit-content;
    // height: 30px;
    text-align: center;
    // line-height: 50px;
    // margin: 0px 5px;

    &.checked{
      border:1px solid #75a7e8;
    }
  }
  .couponClass{
    width: 120px;
    height: 35px;
    background-color: #f9301a;
    color: #FFFFFF;
  }
  .redPacketClass{
    width: 120px;
    height: 35px;
    background-color: #e4e724;
    color: brown;
  }
  .selectWayArea{
    font-size: 16px;
    font-family: simsun;
    font-weight: 900;
    color: green;
    padding: 10px 0px;
    .wayContent{
      cursor: pointer;
      display: inline-block;
      width: 100px;
      // height: 30px;
      text-align: center;
      line-height: 50px;
      margin: 0px 5px;
      border: 1px solid #E5E5E5;
      &.checked{
        border:1px solid red;
      }
    }
  }
  .selectCouponArea{
    height: fit-content;
    font-size: 14px;
    font-family: simsun;
    font-weight: 900;
    color: lightskyblue;
    padding: 10px 0px;
    .couponContent{
      padding: 2px 10px;
      height: fit-content;
      cursor: pointer;
      display: inline-block;
      width: fit-content;
      // height: 30px;
      text-align: center;
      // line-height: 50px;
      margin: 0px 5px;
      border: 1px solid #E5E5E5;
      &.checked{
        border:1px solid red;
      }
    }
  }

  .order-confirm{
     height: inherit;
     width: inherit;

     .wrapper::-webkit-scrollbar{
        display: none;
      }

    .wrapper{
      height: 80%;
      overflow: auto;
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:84px;
      .order-box{
        background-color:#ffffff;
        padding-left: 40px;
        padding-bottom: 40px;
        .addr-title{
          margin-bottom:21px;
        }
        .item-address{
          padding-top: 10px;

          .addr-list{
            .addr-info,.addr-add{
              box-sizing:border-box;
              float: left;
              width:271px;
              height:180px;
              border:1px solid #E5E5E5;
              margin-right: 15px;
              padding: 15px 24px;
              font-size: 14px;
              color:#757575;
            }
            .addr-info{
              font-family: simsun;
              font-weight: 900;
              cursor:pointer;
              margin-top: 5px;
              h2{
                height:27px;
                font-size:20px;
                font-weight: 900;
                color:#00027f;
                margin-bottom:10px;
              }
              .phone{
                padding: 5px;
              }
              .street{
                height:50px;
                padding : 5px;
              }
              .action{
                height:50px;
                line-height:50px;
                .icon{
                  width: 20px;
                  height: 20px;
                  fill: #666666;
                  vertical-align: middle;
                  &:hover{
                    fill: #FF6700;
                  }
                }
              }
              &.checked{
                border:1px solid #ff6700;
              }
            }
            .addr-add{
              margin-top: 5px;
              text-align:center;
              color: #999999;
              cursor:pointer;
              .icon-add{
                width:30px;
                height:30px;
                border-radius:50%;
                background:url('/imgs/icon-add.png') #E0E0E0 no-repeat center;
                background-size:14px;
                margin: 0 auto;
                margin-top: 45px;
                margin-bottom: 10px;
              }
            }
          }
        }
        .item-good{
          margin-top:34px;
          border-bottom: 1px solid #E5E5E5;
          padding-bottom: 12px;
          .itemTitle{
            color: #174878;
            font-size: 17px;
            display: flex;
            text-align: center;
            span{
              flex: 1;
            }
          }
          h2{
            border-bottom:1px solid #E5E5E5;
            padding-bottom: 5px;
          }
          li{
            text-align: center;
            font-family: simsun;
            font-weight: 900;
            color: #666666;
            display:flex;
            align-items: center;
            height:40px;
            line-height:40px;
            margin-top:10px;
            font-size:16px;
            .good-name{
              flex:1;
              img{
                width:30px;
                height:30px;
                vertical-align:middle;
              }
            }
            .good-amount{
              flex: 1;
            }
            .good-price{
              flex:1;
              color: lightcoral;
            }
            .good-total{
              flex: 1;
              color:#FF6600;
              font-size: 18px;
            }
          }
        }
        .item-shipping,.item-invoice{
          margin-top:31px;
          line-height: 20px;
          h2{
            display: inline-block;
            margin-right: 71px;
            font-size: 20px;
            width: 80px;
          }
          span,a{
            font-size:16px;
            color:#FF6700;
            margin-right:23px;
          }
        }
        .detail{
          padding: 50px 44px 33px 0;
          border-bottom: 1px solid #f5f5f5;
          text-align: right;
          font-family: simsun;
          font-weight: 900;
          font-size: 16px;
          color: #666666;
          .item-val{
            color:#FF6700;
          }
          .item{
            line-height: 15px;
            margin-bottom: 12px;
          }
          .item-val{
            display:inline-block;
            width:150px;
          }
          .item-total{
            .item-val{
              font-size:28px;
            }
          }
        }
        .btn-group{
          margin-top: 37px;
          text-align: right;
        }
      }
    }
    .edit-wrap{
      font-size:14px;
      .item{
        margin-bottom:15px;
        .input{
          display:inline-block;
          width:283px;
          height:40px;
          line-height:40px;
          padding-left:15px;
          border:1px solid #E5E5E5;
          // 给.input类的兄弟元素添加样式
          &+.input{
            margin-left:14px;
          }
        }
        select{
          height:40px;
          line-height:40px;
          border:1px solid #E5E5E5;
          margin-right:15px;
        }
        textarea{
          height:62px;
          width:100%;
          padding:13px 15px;
          box-sizing:border-box;
          border:1px solid #E5E5E5;
        }
      }
    }
  }
</style>
