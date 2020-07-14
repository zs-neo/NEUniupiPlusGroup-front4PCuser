<template>
  <div class="index">
<logo></logo>

  <div class="container">
    <div class="img">
    <img class="imgclass"  src="../../../public/imgs/slider/slide-2.jpg"><img>
   <img class="imgclass1"  src="../../../public/imgs/food/52da0e14dce6a.jpg"><img>
  </div>

<div style="margin-left: 77px;" >

      <div class="font">
      <!--  <span class="i1"></span> -->
        <h3>为你推荐好卷</h3>
<!--       <span class="i1"></span> -->
    </div>

<template v-for="(coupon,i) in coupons">
  <div :class="couponstyle[i]">
  	<div class="coupon-info coupon-hole coupon-info-right-dashed">
  		<div class="coupon-price">&yen;{{coupon.coupondesc}}</div>
  		<div class="coupon-desc">{{coupon.couponname}}</div>
  		<div class="coupon-expiry-date">有效期：{{coupon.couponbegtime}}至{{coupon.couponendtime}}</div>
  	</div>
  	<el-link  :class="CouponStatus(coupon.couponid)" @click="getCoupon($event,coupon)">{{buttext[coupon.couponid]}}</el-link>
  </div>

</template>


    </div>
  </div>
  </div>
</template>
<script>
    import logo from "./CouponCenterLogo.vue"
    let server="http://localhost:8082/";
    let getAll="coupon/getAll";
    let insertCouponReceive="couponreceive/insertCouponReceive";
    let getMember="member/getMember";
    let getAllOwnCoupons="couponreceive/getByClientId";
    let updateCouponNum= "coupon/updateCoupon";

export default {
  name: 'index',
  data () {
    return {
      user:"",
      coupons:[],
      couponstyle:[],
      owncoupons:[],//已经领取过的优惠卷
      buttext:[],//button的文字
    }
  },
  components:{
    logo,
  },
  created(){
    this.init();

  },
  methods: {
    //初始化优惠卷信息
    init(){
      var userJsonStr = sessionStorage.getItem('user');
      this.user = JSON.parse(userJsonStr);
      this.axios.get(`${server}${getAll}`).then((res) => {
                  this.coupons=res.data.coupons;
                 for(let i=0;i<this.coupons.length;i++){
                     let coupon=this.coupons[i];
                     coupon.couponbegtime=this.handelTime(coupon.couponbegtime);
                     coupon.couponendtime=this.handelTime(coupon.couponendtime);
                     var str = coupon.couponname;
                     var numArr = str.match(/\d+/g);//分割出数字
                     coupon.coupondesc=numArr[1];//拿到满减的金额数目
                     this.couponstyle[i]=this.checkCouponType(coupon.coupondesc);
                     this.buttext[coupon.couponid]="立即领取";
                 }
               })
             this.getAllOwnCoupons();

    },
    //验证身份
    checkMember(){
       return  sessionStorage.getItem('isVip');
    },
    //截取时间到天
    handelTime(time){
      var timeArr = time.replace(" ", ":").replace(/\:/g, "-").split("-");
      var result = timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];
      return result;
    },
    //判断优惠卷类型的方法
    checkCouponType(money){
      if(money<=10){ //根据优惠卷的面额改变优惠卷样式
       return "coupon coupon-wave-left coupon-yellow-gradient";
      }else if(10<money&&money<=50){
         return "coupon coupon-wave-left coupon-green-gradient"
      }else {
        return"coupon coupon-wave-left coupon-blue-gradient"
      }

    },
    //点击领取优惠卷,将领取记录插入到优惠卷信息中
    getCoupon(event,coupon){

        if(this.checkMember()==false&&(coupon.limituser==1)){//非会员限制
          this.$message.warning("对不起，该优惠卷仅限vip用户，请先认证为会员！")  ;
          return;
        }else{
          if(event.target.innerText=="立即使用"){
             this.$router.push("/");
             return;
          }else{
       let receiveinfo={//新增优惠卷领取记录
          "clientid":this.user.clientid,
          "couponid":coupon.couponid,
          "createtime":this.getNowFormatDate(),
       };
        this.axios.post(`${server}${insertCouponReceive}`,JSON.stringify(receiveinfo),{
                    headers: {
                      'content-Type':'application/json',
                    },
                  }).then((res) => {
                    if(res.data.insertmsg){
                        this.$message.success("优惠卷领取成功！");
                        this.updateCouponNum(coupon.couponid);
                        this.init();//刷新页面，优惠卷的领取状态改变
                    }
                    console.log(res.data);

                 })
    }
      }

    },

    //数据库中优惠卷的存量-1，已领取+1
    updateCouponNum(couponid){
    	this.axios.get(`${server}${updateCouponNum}`,{params:{
    							 couponid: couponid,
    				 		}}).then((res) => {

    				  if(res.data.updatemsg){

    					console.log(res.data)

    				  }else{
    					  this.$message.error("内部错误，修改优惠卷数量失败");
    				  }

    				})


    },


//  获取当前时间
        getNowFormatDate: function () {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if(month >=1 && month <=9){
                month = "0" + month;
            }
            if(strDate >=0 && strDate <= 9){
                strDate = "0" + strDate;
            }
            //获取当前时间 yyyy-MM-dd HH:mm:ss
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " +date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
            return currentdate;

        },

		//拿到当前用户所领取的所有优惠卷信息用于判断当前页面优惠卷的状态（领取与否）
		getAllOwnCoupons(){
			this.axios.get(`${server}${getAllOwnCoupons}`,{params:{
						 clientid: this.user.clientid,
			 		}}).then((res) => {
			  if(res.data.getmsg){
			    this.owncoupons=res.data.couponids;
          console.log(this.owncoupons)

			  }

			})

		},
    //根据用户是否领取过优惠卷设定优惠卷样式
     CouponStatus(couponid){
        let length=this.owncoupons.length;
        console.log("length"+length)
       for(let j=0;j<length;j++){
         if(couponid==this.owncoupons[j]){
            this.buttext[couponid]="立即使用";
           return "coupon-alreadyget coupon-get-already";
          }else{
                this.buttext[couponid]="立即领取";
            }
          }
         return "coupon-get ";



     },




  },
}
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/config.scss';
  @import '../../assets/scss/mixin.scss';
  @import '../../assets/css/couponcenter';

</style>
