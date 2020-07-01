<template>
  <div >
    <Layout class="layout">
      <Sider class="side-bar" :style="{height: 'calc(100vh - 35px)', background: '#fff', overflow: 'auto'}" ref="side" :collapsed-width="78">
        <Menu active-name="1-2" theme="light" width="auto" @on-select="onSelect">
          <div class="user-icon">
            <div class="user-img">
              <img src="imgs/head.png">
            </div>
            <p>Gavin</p>
          </div>
          <Submenu name="0">
            <template slot="title">
              <Icon type="ios-home"></Icon>
                <span>我的信息</span>
            </template>
            <MenuItem name="">个人资料</MenuItem>
          </Submenu>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-pricetags"></Icon>
                <span>我的红包</span>
            </template>
            <MenuItem name="">优惠卷</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
            <Icon type="ios-navigate"></Icon>
                <span>我的地址</span>
            </template>
            <MenuItem name="myAddress">我的收货地址</MenuItem>
            <MenuItem name="addAddress">添加收货地址</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
           <Icon type="ios-barcode"></Icon>
                <span>我的订单</span>
            </template>
            <MenuItem name="">全部订单</MenuItem>
            <MenuItem name="">待付款</MenuItem>
            <MenuItem name="">待评价</MenuItem>
             <MenuItem name="">退款/售后</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
                <Icon type="ios-heart"></Icon>
                <span>我的收藏</span>
            </template>
            <MenuItem name="">我的收藏</MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
        <Icon type="ios-person"></Icon>
              <span>我的客服</span>
            </template>
            <MenuItem name="">客服中心</MenuItem>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
          <Icon type="ios-paper"></Icon>
                <span>常见问题</span>
            </template>
            <MenuItem name="">常见问题</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout class="layout">
        <Header :style="{background: '#fff'}">
          <h2>{{activeTitle}}</h2>
        </Header>
        <Content class="content">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </Content>
      </Layout>
    </Layout>

  </div>

</template>

<script>

export default {
  name: 'MyInfo',
  data () {
    return {
      activeTitle: '我的订单',
      bar: {
        'myAddress': '我的收货地址',
        'addAddress': '添加收货地址',
        'myOrder': '我的订单',
      }
    };
  },
  methods: {
    onSelect (name) {
      this.activeTitle = this.bar[name];
      this.$router.push(`/myinfo/${name}`);
    }
  }
};
</script>

<style scoped>
.side-bar a{
  color: #232323;
}
.user-icon {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user-icon span {
  font-size: 96px;
}
.user-img {
  margin-bottom: 15px;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  overflow: hidden;
}
.user-img img{
  width: 100%;
}
.content {
  margin: 15px;
  background-color: #fff;
  padding: 15px;
}
.layout-footer-center {
  padding: 0px 15px;
  padding-bottom: 15px;
  text-align: center;
}
</style>
