<template>
  <div class="service">
    <div class="container">
      <ul>
        <li><span class="el-icon-chat-dot-round"></span>店家24小时在线</li>
        <li><span class="el-icon-thumb"></span>可申请退款</li>
        <li><span class="el-icon-chicken"></span>菜品多多</li>
        <li><span class="el-icon-shopping-cart-full"></span>优惠多多</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'service-bar'
}
</script>
<style lang="scss" scoped>
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .service{
    padding:33px 0;
    color:$colorC;
    font-size:16px;
    li{
      display:inline-block;
      width:24.9%;
      text-align:center;
      border-right:1px solid $colorH;
      span{
        display:inline-block;
        width:20px;
        height:20px;
        vertical-align: middle;
        margin-right:8px;
      }
      .icon-setting{
        @include bgImg(20px,20px,'/imgs/icon-setting.png');
      }
      .icon-7day{
        @include bgImg(20px,20px,'/imgs/icon-7day.png');
      }
      .icon-15day{
        @include bgImg(20px,20px,'/imgs/icon-15day.png');
      }
      .icon-post{
        @include bgImg(20px,20px,'/imgs/icon-post.png');
      }
    }

  }
</style>
