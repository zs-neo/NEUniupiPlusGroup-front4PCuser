import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Home from './Home.vue';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import login from 'components/Login.vue';
import freeback from 'components/Freeback.vue';
import signup from './components/SignUp.vue';
import Myinfo from './components/Myinfo.vue';
import CheckPhone from './components/signUp/CheckPhone.vue';
import InputInfo from './components/signUp/InputInfo.vue';
import SignUpDone from './components/signUp/SignUpDone.vue';
import AddAddress from './components/myinfo/AddAddress.vue';
import MyAddress from './components/myinfo/MyAddress.vue';
import MyOrder from './components/myinfo/MyOrder.vue';
import MyShoppingCart from './components/myinfo/MyShoppingCart.vue';
import 'common/stylus/index.styl';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
  path: '/',
  component: Home,
  redirect:'/goods',
  children:[
   {
     path: 'seller',
     component: seller
   },
 {
  path: 'ratings',
  component: ratings
},
  {
   path: 'goods',
   component: goods
 },
   ],
},
 {
  path: '/login',
  name:"Login",
  component: login
}, {
  path: '/freeback',
  component: freeback
},   
{
      path: '/myinfo', // 个人中心
      name: 'Myinfo',
      component: Myinfo,
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
        {
          path: 'myShoppingCart',
          name: 'MyShoppingCart',
          component: MyShoppingCart
        }
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



},];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
