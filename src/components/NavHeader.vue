<template>
    <div class="header">
      <div class="nav-topbar">
        <div class="container">
          <div class="topbar-menu">

          </div>
          <div class="topbar-user">
            <!-- <a href="javascript:;" v-if="username">{{username}}</a> -->
           <a href="javascript:;" v-if="!username" @click="login()">登录</a>
            <a href="javascript:;" v-if="username" @click="logout()">退出</a>
            <a href="/clientCenter/myOrders" >我的订单</a>
            <a href="/clientCenter">个人中心</a>
            <a href="javascript:;"  @click="goToFreeback()">意见反馈</a>
            <a href="javascript:;"  @click="goToIndex()">首页</a>
            <a href="javascript:;" class="my-cart" @click="goToCart()">
              <span class="icon-cart"></span>购物车({{cartCount}})
            </a>

          </div>
        </div>
      </div>

     </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'nav-header',
  data () {
    return {
      phoneList: []
    }
  },
  computed: {

    /* 注释部分等同 ...mapState(['username','cartCount']) ，这只是简写方式语法糖而已
    username () {
      return this.$store.state.username
    },
    cartCount () {
      return this.$store.state.cartCount
    } */
    cartCount () {
      return this.$store.state.cartCount;
    }
    // ...mapState(['username', 'cartCount'])
  },
  filters: {
    currency (val) {
      if (!val) return '0.00'
      return '￥' + val.toFixed(2) + '元'
    }
  },
  mounted () {
    this.getProductList()
    // 这里是用来判断 login.vue(登录页面跳转过来的)路由跳转过来的参数，若this.$route.params.from是设定的'login'值，则请求购物车数量并保存到vuex中
    const params = this.$route.params
    if (params && params.from === 'login') {
      this.getCartCount()
    }
	this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(d=>{
	  this.$store.dispatch("saveCartCount",d.data);
	})
  },
  methods: {
    login () {
      this.$router.push('/login')
    },
    goToMyinfo(){
       this.$router.push('/myinfo')
    },
    goToFreeback(){
       this.$router.push('/freeback')
    },
    goToIndex(){
       this.$router.push('/')
    },

    logout () {
      // 发送请求给后端时，后端会拿到session的id，进行清空
      this.axios.post('/user/logout').then(() => {
        this.$message.success('退出成功')
        // 退出登录时，将cookie的userid马上置空（expires: '-1'的意思时，cookie立即失效）
        //            再将vuex中的username和cartCount置空
        this.$cookie.set('userId', '', { expires: '-1' })
        this.$store.dispatch('saveUserName', '')
        this.$store.dispatch('saveCartCount', '0')
      })
    },
    goToCart () {
      this.$router.push('/cart')
    },
    getProductList () {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
          pageSize: 6
        }
      }).then((res) => {
        this.phoneList = res.list
      })
    },
    getCartCount () {
      // 这里的res = 0 是当res为空时，设置默认值0
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style lang="scss">
  // 先设置<style lang="scss">允许使用scss；再导入scss定义的公共样式
  // base.scss抽取并复用.container{...}、a{img{...}}公用样式，所以这里省略不写了
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header {
    .nav-topbar {
      height: 39px;
      line-height: 39px;
      background-color: $colorB;
      color: #B0B0B0;
      .container {
        height: inherit;
        // flex弹性布局，水平、垂直居中
        @include flex();
        a{
          display: inline-block;
          // .nav-topbar中的color对a标签内的字体颜色不起作用，再设置一次(这里的优先级最高)
          color: #B0B0B0;
          margin-right: 17px;
        }
        .my-cart{
          width:110px;
          background-color: red;
          text-align:center;
          color:#ffffff;
          height: 39px;
          margin-right:0;
          .icon-cart{
            // url默认从public中找
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right: 4px;
          }
        }
      }
    }
  }
</style>
