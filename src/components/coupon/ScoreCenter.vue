<template>
  <div class="index">
    <div class="product-box">
      <div class="container">
        <h2>会员积分兑换红包</h2>
        <div class="wrapper">

          <div class="card">
            <img src="../../../public/imgs/userhead.jpg" alt="Avatar" style="width:60%;margin-left:15%" >
            <div class="container" v-if="user.type==0" >
             <p class="userinfo" style="padding-top: 30px;">用户名：{{user.username}}</p>
             <p class="userinfo">用户类型：普通用户</p>
             <p class="userinfo">会员等级：青铜</p>
             <p class="userinfo">累计积分：{{user.scores}}点</p>
             <p class="userinfo">当前可用积分：{{user.scores}}点</p>
                <i-button type="success" style="width: 13%;font-weight: bold;font-size: 18px;">点我开通会员</i-button>
            </div>

            <div class="container" v-if="user.type==1" >
             <p class="userinfo" style="padding-top: 30px;">用户名：{{user.username}}</p>
             <p class="userinfo">用户类型：vip用户</p>
             <p class="userinfo">会员等级：王者</p>
               <p class="userinfo">认证时间：{{member.certificationdate}}</p>
             <p class="userinfo">累计积分：{{member.accumulatescores}}点</p>
             <p class="userinfo">当前可用积分：{{member.scores}}点</p>

            </div>
          </div>

          <div class="list-box1">
            <div class="list" v-for="(arr,i) in redPackets" :key="i">
              <div class="hongbao" v-for="(item,j) in arr" :key="j">
                  <div class="red-packet">
                      <header>
                          <img src="../../../public/imgs/userhead.jpg"/>
                      </header>
                      <main>
                          <h1>{{item.rpmoney}}元无门槛</h1>
                          <p class="score">{{item.needscore}}积分</p>
                          <p class="author">秘制小厨房敬上</p>
                          <button class="open" @click="exchange(item)">兑换</button>
                      </main>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="container">
      <div class="ads-box">
        <div class="main-module module-help" id="beanHelp">
        					<div class="help-title">会员积分使用常见问题</div>
        					<dl class="bean-help-list">
        						<dt>1.积分和红包的有效期</dt>
        						<dd>积分的有效期最长2年，最短1年，即从获得积分开始至次年年底，逾期自动作废（如若交易在使用积分有效期之外发生退款，该部分积分不予退还；本页面红包自领取之日起一个月内有效。</dd>
        						<dt>2. 积分的兑换比例</dt>
        						<dd>积分和人民币兑换比例是10:1，即10个积分相当于人民币1元。</dd>
        						<dt>3. 积分如何获取</dt>
        						<dd>用户在秘制小厨房进行点餐、点餐后评价、晒单、交易满意度、移动端下单、指定区域在线支付等活动都可以获得积分。</dd>
        					</dl>
        					<div class="view-more"><a href="" class="ftc02">了解更多问题 &gt;</a></div>
        				</div>
 </div>

    </div>


  </div>
</template>
<script>

let server="http://localhost:8082/";
let getAll="redpacket/getAll";
let getMember="member/getMember";


export default {
  name: 'index',

  data () {
    return {
      redPackets:[],
      user:"",
      member:"",
    }
  },
  created () {
    this.init();
  },
  methods: {

    //初始化拿红包数据
    init () {

       var userJsonStr = sessionStorage.getItem('user');
       this.user = JSON.parse(userJsonStr);

        this.axios.get(`${server}${getAll}`).then((res) => {

        this.redPackets = [res.data.slice(0, 4), res.data.slice(4, 8)]
      })
      this.checkMember();
    },
    //点击兑换
    exchange(item){
       console.log(item);
      if(this.user.type==0){
        this.$message.warning("对不起，您不可兑换，请先开通会员！")
      }else{
         let needscore=item.needscore;
         let nowscore=this.member.scores;
         if(needscore>nowscore){
           this.$message.error("对不起，您的积分不足，无法兑换");
         }else{



           if(confirm("您确定消耗一定积分兑换该红包么？")){
             
             


             this.$message.success("兑换成功，请到我的优惠卷中查看！");
           }


         }

      }














    },
    //判断是否是会员如果是拿到会员信息
    checkMember(){
      let usertype=this.user.type
        if(usertype==0){
          return;
        }
        else if (usertype==1){
            this.axios.get(`${server}${getMember}`,{params:{
				  				 clientid: this.user.clientid,
				  	 		}}).then((res) => {
              console.log(res.data);
              if(res.data.getMember=="success"){
                 var timeArr = res.data.member.certificationdate.replace(" ", ":").replace(/\:/g, "-").split("-");
                 var time = timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];
                 this.member=res.data.member;
                 this.member.certificationdate=time;
              }else{
                this.$Notice.error({
                    title: '参数错误',
                    desc: '会员信息获取失败！'
                });
              }
            })

        }else{
         this.$Notice.error({
             title: '参数错误',
             desc:  '身份验证失败！'
         });
        }
    },


  },


}
</script>
<style lang="scss">
  @import '../../assets/scss/config.scss';
  @import '../../assets/scss/mixin.scss';
  // @import '../../assets/css/scorecenter.css';
  .index{
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom:31px;
      a{
        width:296px;
        height:167px;

      }
    }

    .banner{
      margin-bottom:50px;
    }
    .product-box{
      background-color:$colorJ;
      padding:20px 0 15px;
      h2{
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      }
      .wrapper{
        display:flex;

        .banner-left{
            width:200px;
            height:300px;
            font-family: "Arial";

        }

      }
      .list-box1{
        .list{
          @include flex();
          width:986px;
          margin-bottom:14px;
          &:last-child{
            margin-bottom:0;
          }
          .hongbao{
            width:240px;
            background-color:$colorG;
            text-align:center;
            span{
              display:inline-block;
              width:67px;
              height:24px;
              font-size:14px;
              line-height:24px;
              color:$colorG;
              &.new-pro{
                background-color:#7ECF68;
              }
              &.kill-pro{
                background-color:#E82626;
              }
            }
            }
          }
         }
    }
  }

.bean-help-list {
    line-height: 26px;
    color: #333;
}

.bean-help-list dt {
    font-weight: 700;
}
.bean-help-list dd {
    margin-bottom: 14px;
}

.help-title {
    height: 59px;
    line-height: 59px;
    border-bottom: 1px solid #eee;
    margin-bottom: 18px;
    font-size: 16px;
    font-weight: 700;
    color: #1b1b1b;
}
.module-help {
    margin-left:50px ;
    font-family: "Helvetica Neue",sans-serif;
    font-size: 14px;
}
  .userinfo{
    margin-bottom: 30px;
    font-weight: bold;


  }

  .red-packet{
      color: #fff;
      padding: 1em;
      height: 28em;
      margin: auto;
      max-width: 25em;
      overflow: hidden;
      position: relative;
      border-radius: 1em;
      background: #c40b00;
     animation: red-packet .75s both cubic-bezier(0.68, -0.55, 0.27, 1.55);
     font-family: "楷体";
  }

  .red-packet header{
      top: -16.5em;
      left: 0;
      right: 0;
      height: 25em;
      position: absolute;
      border-radius: 100%;
      background: #b00b00;
  }
  .red-packet img{
      left: 0;
      right: 0;
      bottom: -2em;
      margin: auto;
      max-width: 5em;
      position: absolute;
      border-radius: 100%;
      border: .25em solid #fff;
  }
  .red-packet main{
      margin-top: 10em;
      text-align: center;
  }
  .red-packet .author{
      opacity: .7;
      font-size: 15px;
      margin-top: 10px;
  }
  .red-packet .score{
      opacity: .8;
      font-size: 18px;

  }
  .red-packet .open{
      outline: 0;
      width: 3em;
      height: 3em;
      color: #fff;
      border: none;
      display: block;
      font-size: 2em;
      cursor: pointer;
      margin: 1em auto;
      margin-left: 80px;
      background: #ffb03a;
      border-radius: 100%;
      transition: background .3s, transform .3s;
  }
  .red-packet .open:hover{
      transform: scale(1.1);
  }
  .red-packet .open:active{
      background: #eba534;
  }
  @keyframes red-packet{
      from{
          opacity: 0;
          transform: scale(0);
      }
      to{
          opacity: 1;
          transform: scale(1);
      }
  }

.card {
   font-family: "楷体";
    font-size: 18px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 20px;
    transition: 0.3s;
    width: 20%;
    border-radius: 5px;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
    border-radius: 5px 5px 0 0;
}

.container {
    padding: 2px 16px ;
}
</style>
