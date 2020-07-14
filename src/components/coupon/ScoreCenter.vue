<template>
  <div class="index">
    <logo></logo>
    <div class="product-box">
      <div class="container">

        <div class="wrapper">

          <div class="card">
            <img :src="imgurl" alt="Avatar" style="width:60%;margin-left:15%" >
            <div class="container" v-if="user.type==0" >
             <p class="userinfo" style="padding-top: 30px;">用户名：<span class="userinfo1">{{user.username}}</span> </p>
             <p class="userinfo">用户类型：<span class="userinfo1">普通用户</span> </p>
             <p class="userinfo">会员等级：<span class="userinfo1">无</span></p>
             <p class="userinfo">累计积分：<span class="userinfo1">{{parseInt(user.scores)}}点</span></p>
             <p class="userinfo" >当前可用积分：<span class="userinfo1">0点</span></p>
                <i-button type="error" shape="circle"style="width: 13%;font-weight: bold;font-size: 18px;margin: 13px">点我开通会员</i-button>
            </div>

            <div class="container" v-if="user.type==1" >
             <p class="userinfo" style="padding-top: 30px;">用户名：<span class="userinfo1">{{user.username}}</span></p>
             <p class="userinfo">用户类型：<span class="userinfo1">vip用户</span></p>
             <p class="userinfo">会员等级：<el-tag   type="danger"class="userinfo1">{{viplevel}}</el-tag></p>
             <p class="userinfo">认证时间：<span class="userinfo1">{{member.certificationdate}}</span></p>
             <p class="userinfo">累计积分：<span  class="userinfo1">{{parseInt(member.accumulatescores)}}点</span></p>
             <p class="userinfo">当前可用积分：<span class="userinfo1">{{parseInt(user.scores)}}点</span></p>
                <i-button type="primary" shape="circle"style="width: 13%;font-weight: bold;font-size: 18px;margin: 13px"@click="ShowDetail">查看兑换记录</i-button>

            </div>
              <i-button type="success" shape="circle"style=";font-weight: bold;font-size: 18px;margin: 13px;"@click="toMycoupon">查看我的优惠券</i-button>
          </div>

          <div class="list-box1">
            <div class="list" v-for="(arr,i) in redPackets" :key="i" >
              <div class="hongbao" v-for="(item,j) in arr" :key="j">
                  <div class="red-packet">
                      <header>
                          <img src="../../../public/imgs/logo.jpg"/>
                      </header>
                      <main>
                          <h1>{{item.rpmoney}}元无门槛</h1>
                          <p class="score">{{item.needscore}}积分</p>
                          <p class="author">五凤楼敬上</p>
                          <button :class="buttonStyle(item.rpid)"ref="redbut" @click="exchange($event,item)">{{buttext[item.rpid]}}</button>

                      </main>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>


    </div>



    <el-dialog title="积分消费明细" :visible.sync="dialogTableVisible" >
      <el-table :data="scoresDetail" max-height="400px"  >
         <el-table-column label="用户名" width="100">{{user.username}}</el-table-column>
        <el-table-column property="updateamount" label="积分" width="80">
          <template slot-scope="scope">
            {{scope.row.updateamount.toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column property="updatetime" label="时间" width="180"></el-table-column>
        <el-table-column property="description" label="说明"></el-table-column>
      </el-table>
        <el-button type="primary" style="margin-left: 88%;"@click="shutdown" >确定</el-button>
    </el-dialog>


   <ScoreCenterFooter></ScoreCenterFooter>


  </div>
</template>
<script>
    import logo from "./ScoreCenterLogo.vue"
    import ScoreCenterFooter from "./ScoreCenterFoot.vue"
    let server="http://localhost:8082/";
    let getAll="redpacket/getAll";
    let getMember="member/getMember";
    let insert ="redpacketreceive/insert";
    let updateScores="member/updateScores";
    let getByClientId="redpacketreceive/getByClientId";
    let uodateMemberDetail="memberdetail/insert";
    let getClient="client/getClient";
    let getHistory="memberdetail/getByClientid";//查看兑换记录
export default {
  name: 'index',

  data () {
    return {
      redPackets:[],
      user:"",
      member:"",
      alreadyRedPid:[],//存放已经领取的红包id
      buttext:[],//button的文字
      viplevel:"",//会员等级
      dialogTableVisible: false,
      scoresDetail:[],
      imgurl:"",
    }
  },
  components:{
    ScoreCenterFooter,
    logo,
  },
  created () {
    this.init();

  },
  methods: {

    //初始化拿红包数据
    init () {
       var userJsonStr = sessionStorage.getItem('user');
       this.user = JSON.parse(userJsonStr);
       let img="res/"+this.user.icon;
        this.imgurl=`${server}${img}`;
        this.axios.get(`${server}${getAll}`).then((res) => {

        this.redPackets = [res.data.slice(0, 4), res.data.slice(4, 8)]
      })
      this.getClient();
      this.checkMember();
      this.getRPByTime();
    },
    //拿到当前用户信息
    getClient(){
      this.axios.get(`${server}${getClient}`,{params:{
      			 clientid: this.user.clientid,
       		}}).then((res) => {
        console.log(res.data);
        this.user=res.data;
        if(res.data==""){
            this.$Notice.error({
              title: '参数错误',
              desc: '获取个人信息失败！'
          });
        }
      })

    },

    //根据用户是否领取过红包设定红包样式
     buttonStyle(rpid){
       if(this.user.type==1){
       for(let i=0;i<this.alreadyRedPid.length;i++){
         if(rpid==this.alreadyRedPid[i]){
           this.buttext[rpid]="已兑换";
           return "alreadyopen";
         }else{
           this.buttext[rpid]="兑换";
         }
       }
        return "open";
        }else{
          this.buttext[rpid]="兑换"
          return "open";
        }
     },

    //点击兑换
    exchange(event,item){
       console.log();
      if(this.user.type==0){
        this.$message.warning("对不起，您不可兑换，请先开通会员！")
      }else{

        if(event.target.innerText=="已兑换"){
           this.$message.warning("对不起，您本周期内已经兑换过该红包，请两周后再兑换！")
        }else{
         let needscore=item.needscore;
         let nowscore=this.user.scores;
         if(needscore>nowscore){
           this.$message.error("对不起，您的积分不足，无法兑换");
         }else{
            this.$Modal.confirm({
                     title: '兑换红包',
                     content: "您确定要消耗"+needscore+"积分兑换该红包么?",
                     onOk: () => {
                       let insertmsg={//新增红包兑换记录
                          "clientid":this.member.clientid,
                          "rpid":item.rpid,
                          "createtime":this.getNowFormatDate(),
                       };
                      this.axios.post(`${server}${insert}`,JSON.stringify(insertmsg),{
                                  headers: {
                                    'content-Type':'application/json',
                                  },
                                }).then((res) => {
                        console.log(res.data);
                        if(res.data.insertmsg){
                            this.updateScores(needscore);
                            this.uodateMemberDetail(needscore,item);
                            this.$message.success("兑换成功，请到我的优惠卷中查看！");
                            this.init();
                        }else{
                          this.$Notice.error({
                              title: '内部错误',
                              desc: '兑换失败！'
                          });
                        }
                      })

                     },
                     onCancel: () => {
                         this.$Message.info('点击了取消');
                     }
                 });
         }
         }
      }
    },
    //兑换结束之后修改会员当前可用积分
    updateScores(costScores){
      let finalscores=this.user.scores-costScores;
      console.log("finalscore"+this.member.clientid);
          this.axios.get(`${server}${updateScores}`,{params:{
        				 clientid: this.member.clientid,
                 scores:finalscores,
        	 		}}).then((res) => {
            this.user.scores=finalscores;
            console.log(res.data);
            if(!res.data.updateScores){
                this.$Notice.error({
                  title: '参数错误',
                  desc: '修改会员积分失败！'
              });
            }
          })
    },
    //兑换成功后生成一条积分变动信息
    uodateMemberDetail(costScores,redpacket){
      let memberdetail={//新增积分更新记录
         "clientid":this.member.clientid,
         "updateamount":costScores*-1,
         "description":"兑换"+redpacket.rpmoney+"元无门槛红包，消耗"+costScores+"积分",
         "updatetime":this.getNowFormatDate(),
      };
      this.axios.post(`${server}${uodateMemberDetail}`,JSON.stringify(memberdetail),{
                    headers: {
                      'content-Type':'application/json',
                    },
                  }).then((res) => {
        console.log("新增积分消费记录"+res.data);
        if(!res.data.insertmsg){
            this.$Notice.error({
              title: '参数错误',
              desc: '新增会员积分明细记录失败！'
          });
        }
      })


    },
    //拿到当前用户两周之内的红包领取信息(id)。用于判断是否更新红包
    getRPByTime(){
      if(this.user.type==0){//首先判断是否是会员
        return;
      }else{//是会员
        this.axios.get(`${server}${getByClientId}`,{params:{
        			 clientid: this.user.clientid,
         		}}).then((res) => {
          if(res.data.getmsg){
            this.alreadyRedPid=res.data.rpids;
            console.log(res.data.rpids);

          }

        })
      }


    },

      //  获取当前时间
        getNowFormatDate: function () {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            //外国的月份都是从0开始的，所以+1
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            //1-9月用0补位
            if(month >=1 && month <=9){
                month = "0" + month;
            }
            //1-9日用0补位
            if(strDate >=0 && strDate <= 9){
                strDate = "0" + strDate;
            }
            //获取当前时间 yyyy-MM-dd HH:mm:ss
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " +date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
            return currentdate;
        },
     //判断会员等级的方法
    checkviplevel(subscores){
      if(subscores<=500){
        return "黄金会员"
      }
      else if(500<subscores<1000){
        return "白金会员";
      }else {
         return "钻石会员";
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
                 this.viplevel=this.checkviplevel(this.member.accumulatescores);
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
    //点击查看兑换记录
    ShowDetail(){
      this.dialogTableVisible=true;
      this.axios.get(`${server}${getHistory}`,{params:{
      			 clientid: this.member.clientid,
       		}}).then((res) => {
        if(res.data.getmsg){
          this.scoresDetail=res.data.memberDetails;
          console.log(res.data);

        }

      })
    },
    //关闭弹出框
    shutdown(){
       this.dialogTableVisible=false;
    },
    //点击查看我的优惠卷
    toMycoupon(){
       this.$router.push(`/clientCenter/myCoupon`);
    },

  },

}
</script>
<style lang="scss">
  @import '../../assets/scss/config.scss';
  @import '../../assets/scss/mixin.scss';
  // @import '../../assets/css/scorecenter.css';
  .index{


    .banner{
      margin-bottom:50px;
    }
    .product-box{
     // background-color:$colorJ;
      //padding:20px 0 10px;
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
        padding: 5px;
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
  .userinfo{
    margin-bottom: 30px;
    font-weight: bold;
    font-family:"宋体";

  }
  .userinfo1{

    font-weight: bold;
    font-size: 16px;
    font-family:"bodoni mt"

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
  .red-packet .alreadyopen{
      outline: 0;
      width: 3em;
      height: 3em;
      color: #550000;
      border: none;
      display: block;
      font-size: 2em;
      cursor: pointer;
      margin: 1em auto;
      margin-left: 80px;
      background: #636363;
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
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.2);
    padding: 20px;
    transition: 0.3s;
    width: 20%;
    border-radius: 5px;
    border:3px solid #fbe1e2
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

img {
    border-radius: 5px 5px 0 0;
}

.container {
    //padding: 2px 16px ;
}
</style>
