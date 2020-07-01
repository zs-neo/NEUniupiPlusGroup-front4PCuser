<template>
  <div class="clientCenterPage">
    <div class="content">
      <div class="left_nav_area">
        <div class="left_nav_content">
          <dl>
            <dt>
              订单中心
            </dt>
            <dd>
              <router-link to="/clientCenter/myOrders"  active-class="a-active" exact><span>我的订单</span></router-link>
            </dd>
            <dd>
              <a>我的优惠券</a>
            </dd>
          </dl>
          <dl>
            <dt>
              设置
            </dt>
            <dd>
              <router-link to="/clientCenter/" active-class="a-active" exact><span>个人信息</span></router-link>
            </dd>
            <dd>
              <a>收货地址</a>
            </dd>
          </dl>
          <dl>
            <dt>
              常见问题
            </dt>
            <dd>
              <router-link to="/clientCenter/myOrders"><a>常见问题</a></router-link>
            </dd>
            <dd>
              <a>客服中心</a>
            </dd>
          </dl>

        </div>
      </div>
      <div class="mainArea">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>

  .clientCenterPage{
    width: 100%;
    height: calc(100vh - 40px);
  }


  .content{
    margin: 0 auto;
    padding-left: 120px;
    padding-top: 20px;
    width: 80%;
    height: 100%;
    display: inline-block;
    display: block;
    background-color: #E3E4E5;
  }
  .a-active{
    color: #E4393C;
    font-weight: 700;
  }
  .left_nav_content dl dt{

        height: 28px;
        line-height: 28px;
        color: #333333;
        font-weight: 700;
  }
  .left_nav_content dl dd{
    color: #666666;
    line-height: 24px;
  }
  .left_nav_content dl dd a:hover {
      color: #e4393c;
      text-decoration: underline;
  }
  a {
      color: #666666;
      text-decoration: none;
  }
  dt {
      display: block;
  }
  .left_nav_content dl{
    padding-bottom: 15px;
  }
  .left_nav_area{
    float: left;
    height: 100%;
    width: 120px;
    position: relative;
    left: -120px;
  }
  .left_nav_content{
    text-align: center;
    width: 100px;
    height: 100%;
    margin-left: 10px;
    background-color: #F0FAFF;
  }
  .mainArea{
    background-color: lightcoral;
    float: left;
    width: 99.9%;
    height: 100%;
    margin-left: -120px;
  }
</style>
