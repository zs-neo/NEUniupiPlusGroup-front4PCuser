<template>
  <div class="clientInfo">
    <div class="mytitle">
      <div class="titleArea">
        <h3>基本信息</h3>
      </div>
    </div>
    <div class="nav_order">
      <ul>
        <li><router-link to="/clientCenter/info/updateUserInfo" active-class="a-active" exact><span>我的信息</span></router-link></li>
        <li><router-link to="/clientCenter/info/memberCenter" active-class="a-active" exact><span>会员中心</span></router-link></li>
      </ul>
    </div>
    <div class="showArea">
      <div class="showInfo">
        <router-view></router-view>
      </div>
      <div class="showInfoFrame">
        <InfoFrame></InfoFrame>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoFrame from './InfoFrame.vue'
  export default{
    components:{
      InfoFrame,
    },
    data(){
      return{
        userinfo:{
          username:'Jack Ma',
          password:'',
          wechat_id:'wxid',
          icon:'',
          phone:'18745161585',
          createdate:'2020-7-2 16:03:20',
          type:1,
          state:1,
          scores:150,
        },

      }
    },
    created() {
      
    },
    methods:{

    }
  }
</script>

<style scoped>
  .clientInfo{
    width: 100%;
    height: 95%;
    background-color: #00B43C;
    box-sizing: border-box;
  }
  .mytitle{
    padding: 10px 20px 20px;
    margin: 0px 0px 20px;
    background-color: #999999;
  }
  .titleArea{
    /* box-sizing: border-box; */
    padding:10px 0px 0px;
    background-color: #00B43C;
  }

  .titleArea h3{
    font-size: 14px;
    color: #666;
    font-family: '\5b8b\4f53';
    line-height: 18px;
  }
  .showArea{
    box-sizing: border-box;
    margin: 20px;
    display: flex;
    background-color: #FFE4C4;
    height: 78%;
  }
  .showInfoFrame{
    background-color: red;
    flex: 1;
    padding: 15px;
    height: 170px;
    margin: 20px 0;
  }
  .showInfo{
    flex: 2;
    padding: 20px;
  }
  .infoRow{
    color: #999999;
    font-size: 14px;
    font-family: '\5b8b\4f53';
    font-weight: 800;
    padding: 10px 20px;
  }

  .nav_order{
    padding: 10px 20px;
    /* float: left; */
    width: 100%;
    height: 40px;
    background-color: #999999;
  }

  ul{
    list-style: none;
  }
  li{
    list-style: none;
    padding-right: 20px;
     float: left;
  }
  .a-active{
    color: #E4393C;
    font-weight: 700;
  }
  a:hover {
      color: #e4393c;
      text-decoration: underline;
  }
  a {
      color: #666666;
      text-decoration: none;
  }
</style>
