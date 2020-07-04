import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

/**
 * - 根据环境变量获取不同的请求地址[方式一]: CORS和JSONP跨越时,使用env.js自己定义的环境文件
 * import env from './env'
 * axios.defaults.baseURL = env.baseURL
 */

/**
 * - 根据环境变量获取不同的请求地址[方式二]: 代理跨越,则不用env.js,直接修改vue.config.js和axios.defaults.baseURL = '/api'
 * 根据前端的跨域方式做调整 /pro/b : /api/pro/b => /pro/b
 * 因为是代理方式跨越，域名相同可直接写'/api'，若是JSONP/CORS其他方式跨域则要写全'http:www.jerrybro.cn/api'
 * 将每个通过axios发送的请求都在url中加上/api
 */
axios.defaults.baseURL = '/api'
// 第三中方式：模拟接口数据（使用easy-mock方式模拟请求数据）
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5dc7afee2b69d9223b633cbb/mimall';

// axios.defaults.timeout = 8000

/**
 * 第二种方式：模拟接口数据
 * 常量mock为开关，需要自己写src/mock/api.js文件，即为下面require引入的代码
 * const mock = true
 * if (mock) {
 *  require('./mock/api')
 * }
 */

// 接口响应拦截 （请求拦截没做）
// 第一个参数，是请求响应200成功后的拦截（根据请求内容的状态字段判断拦截），
// 第二个参数，是请求响应除200(如4xx/5xx)以外失败后的拦截


axios.interceptors.response.use(function (response) {
  return response;
}, (error) => {
  return Promise.reject(error);
})Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(ElementUI);axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.use(ElementUI);// 将axios挂载到Vue实例中，其他页面都可以this.axios.get()调用，不用再单独引入axios，更方便
Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
