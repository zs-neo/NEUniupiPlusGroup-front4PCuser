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
import ClientCenter from '../components/clientCenter/ClientCenter.vue'
import MyOrders from '../components/clientCenter/MyOrders.vue'
import OrderDetails from '../components/clientCenter/OrderDetails.vue'
import ClientInfo from '../components/clientCenter/ClientInfo.vue'
import MyCenter from '../components/clientCenter/MyCenter.vue'
import MyCoupon from '../components/coupon/MyCoupon.vue';
import CouponCenter from '../components/coupon/CouponCenter.vue';
import ScoreCenter from '../components/coupon/ScoreCenter.vue';
import UpdateUserInfo from '../components/clientCenter/UpdateUserInfo.vue'
import MemberCenter from '../components/clientCenter/MemberCenter.vue'
import AccountSetting from '../components/clientCenter/AccountSetting.vue'
import UpdateIcon from '../components/clientCenter/UpdateIcon.vue'
import FoodDetail from '../views/foodDetail.vue'
import Notice from '../views/advice.vue'
Vue.use(VueRouter)

  const routes = [
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
        {//新增订单支付成功页面
          path: '/order/paysuccess',
          name: 'paysuccess',
          component: () => import('./../views/orderPaySuccess.vue')
        },
        {
          // 示例：http://192.168.0.107:8080/index
          path: '/notice',
          name: 'notice',
          component: Notice,
        },
        {
          path: '/order/pay',
          name: 'order-pay',
          component: () => import('./../views/orderPay.vue')
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
        },
        {
          path: '/cart',
          name: 'cart',
          component: () => import('./../views/cart.vue')
        },
        {
          path: '/confirm',
          name: 'Confirm',
          component: () => import('./../views/orderConfirm.vue')
        },

        {
          path: '/clientCenter',
          name: 'ClientCenter',
          component: ClientCenter,
          children:[
            {
              path: '/clientCenter/myOrders',
              name: 'MyOrders',
              component: MyOrders
            },
            {
              path: '/clientCenter/info',
              name: 'ClientInfo',
              component: ClientInfo,
              children:[
                {path: '/clientCenter/info/updateUserInfo',
                name: 'UpdateUserInfo',
                component: UpdateUserInfo},
                {path: '/clientCenter/info/memberCenter',
                name: 'MemberCenter',
                component: MemberCenter},
                {path: '/clientCenter/info/accountSetting',
                name: 'AccountSetting',
                component: AccountSetting},
                {path: '/clientCenter/info/updateIcon',
                name: 'UpdateIcon',
                component: UpdateIcon},

              ],
              redirect: '/clientCenter/info/updateUserInfo',
            },{
              path: '/clientCenter/myCenter',
              name: 'MyCenter',
              component: MyCenter
            },
           {
                  path: '/clientCenter/myAddress',
                  name: 'MyAddress',
                  component: MyAddress
                },
                {
                  path: '/clientCenter/addAddress',
                  name: 'AddAddress',
                  component: AddAddress
                },
                {
                  path: '/clientCenter/myCoupon',
                  name: 'MyCoupon',
                  component: MyCoupon
                },



          ],
          redirect: '/clientCenter/myCenter'
        },
         {
            path: '/couponCenter',
            name: 'CouponCenter',
            component: CouponCenter
          },
          {
            path: '/scoreCenter',
            name: 'ScoreCenter',
            component: ScoreCenter
          },
        {
          path: '/orderDetails',
          name: 'OrderDetails',
          component: OrderDetails,
        },
        {
          path:'/detail',
          name:'FoodDetail',
          component:FoodDetail,
        },
      ]
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('./../views/login.vue')
    },

    {
      path: '/scanCode',
      name: 'ScanCode',
      component: () => import('./../components/ScanPayCode.vue')
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
          path: '/order/alipay',
          name: 'alipay',
          component: () => import('./../views/alipay.vue')
        },

      ]
    },

	{
	  path: '/freeback',
	  component: freeback
	},
 {
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

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


router.beforeEach((to,from,next)=>{
	document.title = "五凤楼";
	next();
})
