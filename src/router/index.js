import Vue from 'vue'
import VueRouter from 'vue-router'
import freeback from '../views/Freeback.vue';
import signup from '../views/SignUp.vue';
import MyInfo from '../views/Myinfo.vue';
import CheckPhone from '../components/signUp/CheckPhone.vue';
import InputInfo from '../components/signUp/InputInfo.vue';
import SignUpDone from '../components/signUp/SignUpDone.vue';
import AddAddress from '../components/myinfo/AddAddress.vue';
import MyAddress from '../components/myinfo/MyAddress.vue';
import MyOrder from '../components/myinfo/MyOrder.vue';

// Vue加载插件的语法
Vue.use(VueRouter)

// 再导出VueRouter实例，这里格式是：VueRouter实例的参数是一个对象
export default new VueRouter({
  // routes(路由):即url输入对应的路径,加载显示对应的组件
  routes: [
    {
      path: '/',
      name: 'home', // 若这里取了name,则对应导入的component组件中也要定义相同的name: 'home'
      component: () => import('./../views/home.vue'),
      redirect: '/index', // 默认输入xxx:8080 跳转到 xxx:8080/index中
      children: [
        {
          // 示例：http://192.168.0.107:8080/index
          path: '/index',
          name: 'index',
          component: () => import('./../views/index.vue')
        },
        {
          // 动态路由(即url中可加参数并获取)：
          // http://192.168.0.107:8080/product/id(一个参数)
          path: '/product/:id',
          name: 'product',
          component: () => import('./../views/product.vue')
        },
        {
          // 动态路由(即可加参数并获取)：
          // http://192.168.0.107:8080/detail/id(一个参数)
          path: '/detail/:id',
          name: 'detail',
          component: () => import('./../views/detail.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./../views/login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./../views/cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('./../views/order.vue'),
      children: [
        {
          path: '/order/list',
          name: 'order-list',
          component: () => import('./../views/orderList.vue')
        },
        {
          path: '/order/confirm',
          name: 'order-confirm',
          component: () => import('./../views/orderConfirm.vue')
        },
        {
          path: '/order/pay',
          name: 'order-pay',
          component: () => import('./../views/orderPay.vue')
        },
        {
          path: '/order/alipay',
          name: 'alipay',
          component: () => import('./../views/alipay.vue')
        }
      ]
    },
	{
	  path: '/freeback',
	  component: freeback
	},
	{
	      path: '/myinfo', // 个人中心
	      name: 'MyInfo',
	      component: MyInfo,
	      children: [
	        {
	          path: '/',
	          name: 'HomeIndex',
	          component: MyOrder
	        },
	        {
	          path: 'myAddress',
	          name: 'MyAddress',
	          component: MyAddress
	        },
	        {
	          path: 'addAddress',
	          name: 'AddAddress',
	          component: AddAddress
	        },
	        {
	          path: 'myOrder',
	          name: 'MyOrder',
	          component: MyOrder
	        },

	      ]
	    },{
	  path: '/signup',
	  component: signup,
	  children: [
	    {
	      path: '/',
	      name: 'index',
	      component: CheckPhone
	    },
	    {
	      path: 'checkPhone',
	      name: 'CheckPhone',
	      component: CheckPhone
	    },
	    {
	      path: 'inputInfo',
	      name: 'InputInfo',
	      component: InputInfo
	    },
	    {
	      path: 'signUpDone',
	      name: 'SignUpDone',
	      component: SignUpDone
	    }
	  ]

	},
  ]
})