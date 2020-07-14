<template>
  <div class="infoFrame">
    <div class="iconArea">
      <div class="imgBorder">
        <img :src="iconShowWay"/>

      </div>
      <div class="tab"><span class="rank" :style="userinfo.type==1?iconMember:iconCom">{{rank}}</span></div>
    </div>
    <div class="mainInfoArea">
      <div><span class="title">用户名</span><span class="col">{{userinfo.username}}</span></div>
      <div><span class="title">小厨点</span><span class="col">{{parseInt(userinfo.scores)}}</span></div>
      <div><span class="title">会员类型</span><span :style="userinfo.type==1?memberStyle:comStyle" class="col">{{userinfo.type==0?'普通用户':'尊贵会员'}}</span></div>
      <div><span class="title">认证时间</span><span class="col">{{userinfo.member.certificationdate}}</span></div>

    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        userinfo:{},
        memberStyle: 'color: #ffa7ca;',
        comStyle: 'color: #666;',
        rank:'',
        iconMember: 'background-color: gold',
        iconCom: 'background-color: #FFFFFF',
      }
    },
    created() {
      this.setUserinfo();
    },
    computed:{
    	iconShowWay(){
    		if(this.userinfo.icon){
    			return `http://localhost:8082/res/${this.userinfo.icon}`;
    		}else{
    			return require('../../../public/imgs/icon/headerIcon.png');
    		}
    	}
    },
    methods:{
      setUserinfo(){
        this.userinfo = JSON.parse(sessionStorage.getItem('user'));
        if(this.userinfo.member&&this.userinfo.member.certificationdate&&this.userinfo.member.certificationdate!=''){
          this.userinfo.member.certificationdate =this.userinfo.member.certificationdate.split(" ")[0];
        }else{
          this.userinfo.member = {certificationdate:'敬请认证'};
          // this.userinfo.member.certificationdate="敬请认证"
        }
        if(this.userinfo.type==1){
          if(this.userinfo.member.accumulatescores&&this.userinfo.member.accumulatescores!=''){
            if(this.userinfo.member.accumulatescores<500){
              this.rank = '黄金';
            }
            else if(this.userinfo.member.accumulatescores>=500){
              this.rank='白金';
            }else if(this.userinfo.member.accumulatescores>=1000){
              this.rank='钻石';
            }
          }
        }

      }
    }
  }
</script>

<style scoped>
  .infoFrame{
    width: 95%;
    height: 95%;
    display: block;
    box-sizing: border-box;
  }
  .iconArea img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .iconArea{
    display: inline-block;
    height: 105px;

  }
  .mainInfoArea{
     font-family: '\5b8b\4f53';
     font-size: 13px;
     font-weight: 500;
     color: #595959;
    display: inline-block;
    /* background-color: #999999; */
    width: 60%;
    height: 100%;
    padding: 10px;
  }
  .mainInfoArea >div{
    padding-bottom: 10px;
  }
  .title{
    padding-right: 10px;
  }
  .col{
    font-weight: 700;
  }
  .rank {
    position: absolute;
    left: 35px;
    top: -10px;
    padding-left: 1px;
    width: 40px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    -webkit-box-shadow: 2px 4px 4px 0 rgba(41,41,41,.5);
    box-shadow: 2px 4px 4px 0 rgba(41,41,41,.5);
    color: #343434;
  }
  .tab{
    position: relative;
  }
  .imgBorder{
    width: 108px;
    height: 108px;
    padding: 3px;
    border-radius: 50%;
    border: solid 1px #F08080;
    background-color: #FFFFFF;
    text-align: center;
    line-height: 100px;
  }
</style>
