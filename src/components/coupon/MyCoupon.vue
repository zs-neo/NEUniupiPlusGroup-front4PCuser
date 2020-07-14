<template>
 <div>

 <Menu mode="horizontal" :theme="theme1" active-key="1">

          <Menu-item key="1" name="1" @click.native="canuse">
            <Icon type="ios-paper"></Icon>
            可用优惠卷({{Rcanusenum}}+{{Ccanusenum}})
        </Menu-item>
        <Menu-item key="2"name="2" @click.native="alreadyuse">
            <Icon type="ios-people"></Icon>
            已用优惠卷({{Rusednum}}+{{Cusednum}})
        </Menu-item>
        <Menu-item key="3"name="3" @click.native="outdate">
            <Icon type="settings"></Icon>
            已过期({{Routdatenum}}+{{Coutdatenum}})
        </Menu-item>
        <Submenu key="4"name="4">
            <template slot="title">
                <Icon type="stats-bars"></Icon>
                筛选
            </template>
            <Menu-group title="排序">
                <Menu-item key="3-1"name="5" @click.native="getMostFavor">最优惠</Menu-item>
                <Menu-item key="3-2"name="6" @click.native="almostoutdate">即将过期</Menu-item>
                <Menu-item key="3-3"name="7" @click.native="newget">新到账</Menu-item>
            </Menu-group>
        </Submenu>
    </Menu>


<div class="mycoupons">

<template v-for="(redpacket,i) in redPackets">
<div :class="redpacketclass">
	<div class="mycoupon-info mycoupon-info-right-dashed">
		<div class="mycoupon-store">五凤楼</div>
		<div class="mycoupon-price">&yen;{{redpacket.rpmoney}}<span>无门槛红包</span></div>
		<div class="mycoupon-description">订单满任意金额使用</div>
	</div>
	<div class="mycoupon-get">
			<el-link :underline="false":disabled="ellinkstatus"  class="mycoupon-desc" @click="useCoupon">{{text}}</el-link>
		<div class="mycoupon-expiry-date">{{redpacket.rpbegtime}}<br/>{{redpacket.rpendtime}}</div>
	</div>
</div>
</template>

<template v-for="(coupon,i) in myCoupons">
<div :class="couponclass">
	<div class="mycoupon-info mycoupon-info-right-dashed">
		<div class="mycoupon-store">五凤楼</div>
		<div class="mycoupon-price">&yen;{{coupon.couponstatus}}<span>优惠券</span></div>
		<div class="mycoupon-description">{{coupon.coupondesc}}</div>
	</div>
	<div class="mycoupon-get">
		<el-link :underline="false":disabled="ellinkstatus" class="mycoupon-desc" @click="useCoupon">{{text}}</el-link>
		<div class="mycoupon-expiry-date">{{coupon.couponbegtime}}<br/>{{coupon.couponendtime}}</div>
	</div>
</div>
</template>


<template v-if="Nocoupon">

<div class="coupon-empty-box">
          <img class="e-icon"src="../../../public/imgs/logo.jpg"></img>
          <div class="txt">哦噢~小主一张券都没有，快去抢几张~</div>
          <div class="op-btns mt20">
              <a  href="javascript:;"  @click="goToCouponCenter()"  class="btn-1" clstag="pageclick|keycount|mycoupon_new_201610184|34">去领券中心</a>
          </div>
      </div>
</template>


 </div>
 <mycouponHeader></mycouponHeader>
</div>
</template>

<script>
  import mycouponHeader from './CouponHeader.vue'
    let server="http://localhost:8082/";
    let getMycoupon="couponreceive/getByClientIdAndStatus";
    let getMember="member/getMember";
    let getCouponByid="coupon/getCouponByid";
    let getRedPackets="redpacketreceive/getByClientIdAndStatus";
    let getRedPByid="redpacket/getRedPByid";
    let CgetMostFavor="couponreceive/getMostFavor";
    let CgetAlmostOutdate="couponreceive/getAlmostOutdate";
    let CgetNewHave="couponreceive/getNewHave";
    let RgetMostFavor="redpacketreceive/getMostFavor";
    let RgetAlmostOutdate="redpacketreceive/getAlmostOutdate";
    let RgetNewHave="redpacketreceive/getNewHave";
  export default {
    name: 'Mycoupon',
     data () {
          return {
              theme1: 'light',
              user:"",
              member:"",
              myCoupons:[],//普通优惠卷信息
              tempCoupons:[],//临时存放优惠卷信息
              redPackets:[],//会员红包信息
              couponclass:"mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-blue-gradient",
              redpacketclass:"mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-red-gradient",//红包样式需要根据状态来改变，优惠卷也一样
              text:"立即使用",
              ellinkstatus:false,
              Ccanusenum:0,//优惠卷数量
              Coutdatenum:0,
              Cusednum:0,
              Rcanusenum:0,//红包数量
              Routdatenum:0,
              Rusednum:0,
              CRcanusenum:0,//优惠卷红包总数量
              CRoutdatenum:0,
              CRusednum:0,
              Nocoupon:false,


          }
            },
    components: {
        mycouponHeader,
    },
    created(){
      this.init();
      this.getEverStatusNum();
      this.checkisZero(0);

    },
    methods:{
      init(){
        var userJsonStr = sessionStorage.getItem('user');
        this.user = JSON.parse(userJsonStr);
        this.getCoupons(`${getMycoupon}`,0);
        if(this.checkMember()){
              this.getRedPackets(`${getRedPackets}`,0);
        }
      },
      //清空数组
      resetArray(){
        this.myCoupons=[];
        this.redPackets=[];
      },
      //点击可用优惠卷
      canuse(){
        this.changeClass("立即使用");
        this.resetArray();
        this.init();
          this.Nocoupon=false;
        this.checkisZero(0);
      },

      //点击已用优惠卷
      alreadyuse(){
        this.resetArray();
        this.getCoupons(`${getMycoupon}`,1);
        this.changeClass("已使用");
        this.ellinkstatus=true;
        if(this.checkMember()){
              this.getRedPackets(`${getRedPackets}`,1);
        }
         this.Nocoupon=false;
         this.checkisZero(1);
    },
      //点击已过期
      outdate(){
        this.resetArray();
         this.Nocoupon=false;
        this.checkisZero(-1);
        this.getCoupons(`${getMycoupon}`,-1);
        this.changeClass("已过期");
        this.ellinkstatus=true;
        if(this.checkMember()){
              this.getRedPackets(`${getRedPackets}`,-1);
        }

      },

      //点击最优惠
      getMostFavor(){
        this.resetArray();
         this.changeClass("立即使用");
        this.getCoupons( `${CgetMostFavor}`,0);
        if(this.checkMember()){
             this.getRedPackets(`${RgetMostFavor}`,0);
       }
        this.Nocoupon=false;
        this.checkisZero(0);
      },
      //点击即将过期
      almostoutdate(){
           this.resetArray();
           this.changeClass("立即使用");
          this.getCoupons( `${CgetAlmostOutdate}`,0);
          if(this.checkMember()){
             this.getRedPackets(`${RgetAlmostOutdate}`,0);
       }
        this.Nocoupon=false;
        this.checkisZero(0);
      },
      //点击新到账
      newget(){
           this.resetArray();
           this.changeClass("立即使用");
          this.getCoupons( `${CgetNewHave}`,0);
          if(this.checkMember()){
                this.getRedPackets(`${RgetNewHave}`,0);
          }
           this.Nocoupon=false;
           this.checkisZero(0);
      },

      //修改优惠卷和红包样式
      changeClass(text){
              this.text=text;
        if(text=="立即使用"){
          this.couponclass="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-blue-gradient"
          this.redpacketclass="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-red-gradient"
          this.ellinkstatus=false;
        }else{
          this.couponclass="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-gray-gradient"
          this.redpacketclass="mycoupon mycoupon-wave-left mycoupon-wave-right mycoupon-gray1-gradient"

          this.ellinkstatus=true;
        }

      },
      //点击使用优惠卷
      useCoupon(){
       this.$router.push("/");
      },
      //初始化拿到各种状态的红包和优惠卷的数据
      getEverStatusNum(){
        for(let i=-1;i<2;i++){
            this.getCouponStatusNum(i);
            if(this.checkMember()){
                   this.getRedStatusNum(i);

            }
        }
      },

      //拿到各种状态优惠卷数量
      getCouponStatusNum(status){
      this.axios.get(`${server}${getMycoupon}`,{params:{
        			 clientid: this.user.clientid,
               status:status,
         		}}).then((res) => {
              if(res.data.getmsg){
                if(status==0){
                  this.Ccanusenum=res.data.couponReceives.length;
                  console.log("this.Ccanusenum中Rcanuse")
                  console.log(this.Rcanusenum);
                }
                else if(status==1){
                  this.Cusednum=res.data.couponReceives.length;
                }else{
                  this.Coutdatenum=res.data.couponReceives.length;
                }
              }

        })

      },
       //拿到各种状态红包数量
      getRedStatusNum(status){
      this.axios.get(`${server}${getRedPackets}`,{params:{
        			 clientid: this.user.clientid,
               status:status,
         		}}).then((res) => {
              if(res.data.getmsg){
                if(status==0){
                  this.Rcanusenum=res.data.redPacketReceives.length;
                }
                else if(status==1){
                  this.Rusednum+=res.data.redPacketReceives.length;
                }else{
                  this.Routdatenum+=res.data.redPacketReceives.length;
                }
              }

        })

      },
      //判断当前可用的红包和优惠卷数量是否全为0 ，为0则跳转
      checkisZero(status){
        this.axios.get(`${server}${getMycoupon}`,{params:{
          			 clientid: this.user.clientid,
                 status:status,
           		}}).then((res) => {
                console.log("wobeo执行了")
                console.log(res.data);
                if(!res.data.getmsg){
                  console.log("优惠卷为空")
                  if(this.checkMember()){ //是会员继续判断是否有红包
                    this.axios.get(`${server}${getRedPackets}`,{params:{
                      			 clientid: this.user.clientid,
                             status:status,
                       		}}).then((res) => {
                            if(!res.data.getmsg){
                              console.log("红包为空")
                             //  this.$router.push("/clientCenter/myCoupon/NoCouponPage")
                                this.$message.warning("哦噢~小主一张券都没有，快去抢几张~");
                                this.Nocoupon=true;
                            }

                      })
                  }
                }

          })



      },




      //拿到当前用户的所有优惠卷信息
      getCoupons:async function (geturl,status){
      this.axios.get(`${server}${geturl}`,{params:{
        			 clientid: this.user.clientid,
               status:status,
         		}}).then(async(res) => {
          if(res.data.getmsg){
            this.tempCoupons=res.data.couponReceives;
            for(let i=0;i<this.tempCoupons.length;i++){
          				  let eachmsg=this.tempCoupons[i];
          				  await this.axios.get(`${server}${getCouponByid}`,{params:{
          				 		 couponid: eachmsg.couponid,
          				 	}}).then((r)=>{
          				 		if(r.data.getmsg){
                             let coupon=r.data.coupon;
                             coupon.couponbegtime=this.handleTime( coupon.couponbegtime);
                             coupon.couponendtime=this.handleTime( coupon.couponendtime);
                             coupon.couponstatus=this.handleMoney(coupon.couponname);//分隔出满减金额
          				 			     this.myCoupons.push(coupon);
          				 		}else{
          				 			this.$message.error("服务错误，获取优惠卷失败！");
          				 		}
          				  })

           }

          }

        })

      },
      //获取当前用户所有红包信息
      getRedPackets:async function (geturl,status){
        this.axios.get(`${server}${geturl}`,{params:{
        			 clientid: this.user.clientid,
                status:status,
         		}}).then(async(res) => {
              console.log("red")
              console.log(res.data);
          if(res.data.getmsg){
            for(let i=0;i<res.data.redPacketReceives.length;i++){
            				  let eachmsg=res.data.redPacketReceives[i];
            				await this.axios.get(`${server}${getRedPByid}`,{params:{
            				 		 rpid: eachmsg.rpid,
            				 	}}).then(r=>{
            				 		if(r.data.getmsg){
                               let redPacket=r.data.redPacket;
                               redPacket.rpbegtime=this.handleTime(eachmsg.createtime);
                               redPacket.rpendtime=this.AddDays(redPacket.rpbegtime,7);//红包领取时间加7天为有效日期范围
            				 			     this.redPackets.push(redPacket);
            				 		}else{
            				 			this.$message.error("服务错误，获取红包失败！");
            				 		}
            				  })
             }

          }

        })
      },

        //当前时间加days,用于显示红包的有效期
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



      //截取时间保留到日显示
      handleTime(t){
        var timeArr = t.replace(" ", ":").replace(/\:/g, "-").split("-");
        var time = timeArr[0]+'.'+timeArr[1]+'.'+timeArr[2];
        return time;
      },
      //截取满减金额
      handleMoney(str){
        var numArr = str.match(/\d+/g);//分割出数字
        return numArr[1];
      },


     //验证身份
     checkMember(){
        return  sessionStorage.getItem('isVip');
     },
    //去领卷中心
    goToCouponCenter(){
         this.$router.push('/couponcenter')
      },

    },

    }

</script>

<style>
  	@import '../../assets/css/mycupon.css';
  .coupon-empty-box {
      min-height: 360px;
      text-align: center;
  }
  .coupon-empty-box .e-icon {
      display: block;
      width: 190px;
      height: 190px;
      margin: 70px auto 20px;

      overflow: hidden;
  }
  .coupon-empty-box .txt {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      line-height: 20px;
  }
  .mt20 {
      margin-top: 20px;
  }
  .btn-1:link, .btn-1:visited, .btn-2:link, .btn-2:visited, .btn-3:link, .btn-3:visited, .btn-4:link, .btn-4:visited {
      color: #fff;
      text-decoration: none;
  }
  .coupon-empty-box .btn-1 {
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      width: 118px;
      padding: 0;
  }

  .btn-1, .btn-2, .btn-3, .btn-4 {
      background-color: #e74649;
      background-image: -moz-linear-gradient(top,#e74649,#df3134);
      background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#e74649),color-stop(1,#df3134));
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e74649', endColorstr='#df3134', GradientType='0');
      -ms-filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e74649', endColorstr='#df3134');
      background-image: linear-gradient(to bottom,#e74649 0,#df3134 100%);
      border-radius: 2px;
      display: inline-block;
      *display: inline;
      *zoom: 1;
      height: 18px;
      line-height: 18px;
      padding: 3px 15px 4px;
      color: #fff;
  }


</style>
