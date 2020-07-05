<template>
  <div class="index">
    <div class="container">

		<div class="search bar">
		    <form>
		        <input placeholder="css搜索框代码测试" name="cname" type="text">
		        <button type="submit"></button>
		    </form>
		</div>

      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in slideList" :key="index">
            <a :href="'/#/product/'+item.id"><img :src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>

      <FoodDisplay></FoodDisplay>




      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img">
        </a>
      </div>

<!--     <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'">
        </a>
      </div> -->
    </div>

    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'"></a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" :key="i">
              <div class="item" v-for="(item,j) in arr" :key="j">
                <span :class="{'new-pro':j%2==0}">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ServiceBar></ServiceBar>

    <Modal
      title="提示"
      sureText="查看购物车"
      cancelText="取消"
      btnType="3"
      modalType="middle"
      :showModal="showModal"
      @submit="goToCart"
      @cancel="showModal=false">
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </Modal>

    <div class="children" v-if="display" @mouseover="remain" @mouseleave="leave">
     <ul v-for="(item,i) in foodData" :key="i">
         <li v-for="(sub,j) in item" :key="j">
           <a @click="intoFood(sub.id)">
             <img :src="`${imgPath}${sub.img}`">
               {{sub.name}}
           </a>
         </li>
       </ul>
     </div>
  </div>

</template>
<script>
import ServiceBar from './../components/ServiceBar'
import Modal from './../components/Modal'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import FoodDisplay from '../components/FoodDisplay.vue'
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    ServiceBar,
    Modal,
    FoodDisplay
  },
  data () {
    return {
      display:false,
      swiperOption: {
        autoplay: true,
        loop: true,
        theme:'light',
        // effect: 'cube',
        // cubeEffect: {
        //   shadowOffset: 100,
        //   shadowScale: 0.6
        // },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg',
        }
      ],

      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        }, {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        }, {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList: [
      ],
      showModal: false
    }
  },
  created() {
    this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(r=>{
      this.$store.dispatch("saveCartCount",r.data);
    })
  },
  methods: {

    dos(){
      this.axios.get('/user/hi', {
        params: {
        }
      }).then((res) => {
        console.log(res)
        }
        )
    },
    init () {
      // 查询14条数据，phoneList只用后面8条数据
      this.axios.get('/products', {
        params: {
          categoryId: 100012,
          pageSize: 14
        }
      }).then((res) => {
        res.list = res.list.slice(6, 14)
        this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
      })
    },
    addCart (id) {
      this.axios.post('/carts', {
        productId: id,
        selected: true
      }).then((res) => {
        this.showModal = true
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
      })
    },
    goToCart () {
      this.$router.push('/cart')
    },
    leave(){
      this.display=false;
    },
    remain(){
      this.display=true;
    },
    intoFood(fid){
      this.$router.push({path: "/detail", query: {fid: fid}})
      console.log(fid);
    }
  }
}
</script>
<style lang="scss">
  .nav-menu::-webkit-scrollbar{
    display: none;
  }
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .index{
    .swiper-box{
      .nav-menu{
        overflow: auto;
        position:absolute;
        width:962px;
        height:451px;
        z-index:5;
        padding:26px 0;
        // 带透明度的背景色
        background-color:#55585a7a;
        box-sizing:border-box;
        .menu {
          background-color:#55585a7a;
          box-sizing:border-box;

        }
        .menu-wrap {
          overflow: auto;
          height: inherit;
          .menu-item{
            height:50px;
            line-height:50px;
            a{
              position:relative;
              display:block;
              font-size:16px;
              color:#ffffff;
              padding-left:30px;
              &:after{
                position:absolute;
                right:30px;
                top:17.5px;
                content:' ';
                @include bgImg(10px,15px,'/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display:block;
              }
            }

          }
        }
      }
      .swiper-container {
        margin: 0 10px;
        height: 451px;
        .swiper-button-prev{
          left:5px;
        }
        img{
          width:100%;
          height:100%;
        }
      }
    }
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom:31px;
      a{
        width:296px;
        height:167px;
        // img{  base.scss写过了
        //   width:100%;
        //   height:100%;
        // }
      }
    }
    .banner{
      margin-bottom:50px;
    }
    .product-box{
      background-color:$colorJ;
      padding:30px 0 50px;
      h2{
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      }
      .wrapper{
        display:flex;
        .banner-left{
          margin-right:16px;
          img{
            width:224px;
            height:619px;
          }
        }
        .list-box{
          .list{
            @include flex();
            width:986px;
            margin-bottom:14px;
            &:last-child{
              margin-bottom:0;
            }
            .item{
              width:236px;
              height:302px;
              background-color:$colorG;
              text-align:center;
              span{
                display:inline-block;
                width:67px;
                height:24px;
                font-size:14px;
                line-height:24px;
                color:$colorG;
                &.new-pro{
                  background-color:#7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img{
                img{
                  width:100%;
                  height:195px;
                }
              }
              .item-info{
                h3{
                  font-size:14px;
                  color:$colorB;
                  line-height:14px;
                  font-weight:bold;
                }
                p{
                  color:$colorD;
                  line-height:13px;
                  margin:6px auto 13px;
                }
                .price{
                  color:#F20A0A;
                  font-size:$fontJ;
                  font-weight:bold;
                  cursor:pointer;
                  &:after{
                    @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                    content:' ';
                    margin-left:5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }


  div.search {
      padding:10px 0;
      form {
          position:relative;
          width:500px;
          margin:0 auto;
      }
  }


  input,button {
      border:none;
      outline:none;
  }

  input {
      width:100%;
      height:42px;
      padding-left:13px;
  }

  button {
      height:42px;
      width:42px;
      cursor:pointer;
      position:absolute;
  }

  .bar input {
      border:2px solid #FF6600;
      // border-radius:5px;
      background:transparent;
      top:0;
      right:0;
  }

  .bar button {
      background:#FF6600;
      // border-radius:0 5px 5px 0;
      width:60px;
      top:0;
      right:0;
  }

  .bar button:before {
      content:"搜索";
      font-size:15px;
      color:white;
  }
  .swiper-box{
    width: 100%;
  }
</style>
