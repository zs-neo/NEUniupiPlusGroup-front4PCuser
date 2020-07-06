<template>
  <div class="login">
<!--    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div> -->
    <div class="wrapper">
      <div class="container">
        <div class="logo">
          <img style="width: 500px;" height="500px" src="../../public/imgs/logo.jpg" />
        </div>
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg" @click="registernow">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
<!--    <div class="footer">
      <div class="footer-link">
        <a href="http://www.jerrybro.cn" target="_blank">登录页</a><span>|</span>
        <a href="http://www.jerrybro.cn" target="_blank">中软实训M组</a>
      </div>
      <p class="copyright">Copyright ©2020 NEU_M Rights Reserved.</p>
    </div> -->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '会员Test',
      password: '1234567',
      userId: ''
    }
  },
  methods: {
    ...mapActions(['saveUserName', 'saveCartCount']),
    login () {
      this.axios.get(`http://localhost:8082/user/login`, {params:{
      	'username':this.username,
      	'password':this.password,
      }}).then(rs=>{
      	console.log(rs.data)
      	if(rs.data!=""){
          console.log(rs.data);
      		sessionStorage.setItem("user",JSON.stringify(rs.data));
      		this.$router.push(

          {
      		  // path:'/index'对应路由起的name:index
      		  // 【注：用params传参必须使用name跳转路由；而用query传参必须使用path跳转路由】
      		  name: 'home',

      		}
          );
      	}else{
      		 this.$message.error("密码错误！")  ;
      	}
      });    },
    register () {
      this.axios.post('/user/register', {
        username: 'jerrybro',
        password: 'jerrybro',
        email: 'jerrybro@qq.com'
      }).then(() => {
        this.$message.success('注册成功')
      })
    },
    registernow(){
        this.$router.push('/signup')
    },
  }
}
</script>
<style lang="scss" scoped>
  .logo{
    flex: 1;
    padding-left: 100px;
  }
.login{
  &>.container{
    height:113px;
    img{
      width:auto;
      height:100%;
    }
  }
  .wrapper{
    position: relative;
    .container{
      opacity: 0.9;
      height:576px;
      display: flex;




      .login-form{
        flex:1 ;
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width:410px;
        height:510px;
        background-color:#ffffff;
        position:absolute;
        bottom:29px;
        right:20px;
        h3{
          line-height:23px;
          font-size:24px;
          text-align:center;
          margin:40px auto 49px;
          .checked{
            color:#FF6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          display:inline-block;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn{
          width:100%;
          height:50px;
          line-height:50px;
          margin-top:10px;
          font-size:16px;
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:14px;
          cursor:pointer;
          .sms{
            color:#FF6600;
          }
          .reg{
            color:#999999;
            span{
              margin:0 7px;
            }
          }
        }
      }
    }
  }
  .footer{
    height:100px;
    padding-top:60px;
    color:#999999;
    font-size:16px;
    text-align:center;
    .footer-link{
      a{
        color:#999999;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
    }
    .copyright{
      margin-top:13px;
    }
  }
}
</style>
