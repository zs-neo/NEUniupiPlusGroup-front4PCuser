<template>
    <div class="footer">
      <div class="footer-logo">
        <img src="/imgs/logo-round.jpg" alt="">
        <p>五凤楼</p>
      </div>
      <div class="footer-link">
        <a target="_blank">Secret Kitchen</a><span>|</span>
        <a target="_blank">中软实训M组</a><span></span>
      </div>
      <div class="copyright">
        Copyright ©2020 <span class="domain">NEUMG</span> All Rights Reserved.
      </div>
    </div>
</template>

<script>
export default {
  // 放入html被调用的标签名：<nav-footer></nav-footer>
  name: 'nav-footer'
}
</script>
<style lang="scss" scoped>
  @import './../assets/scss/config.scss';
  .footer{
    height:234px;
    border-top:4px solid $colorA;
    background-color:$colorB;
    color:$colorD;
    font-size:16px;
    box-sizing: border-box;
    text-align:center;
    padding: 20px 0px;
    .footer-logo{
      img{
        width:100px;
        height:inherit;
        border-radius: 50%;
      }
    }
    .footer-link{
      a{
        color:$colorD;
        display:inline-block;
      }
      span{
        margin:0 10px;
      }
      margin-bottom:13px;
    }
    .copyright{
      .domain{
        color:$colorA;
      }
    }
  }
</style>
