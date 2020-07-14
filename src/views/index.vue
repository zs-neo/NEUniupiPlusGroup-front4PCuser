<template>
  <div class="index">
    <div class="swiperbox">
      <div class="swipeArea">
        <div class="item" :class="this.swipeClassPrefix+this.swipeClass[0]">
          <img :src="this.slideList[0].img" @click="showCurrImg(0)"/>
        </div>
        <div class="item" :class="this.swipeClassPrefix+this.swipeClass[1]">
          <img :src="this.slideList[1].img" @click="showCurrImg(1)"  />
        </div>
        <div class="item" :class="this.swipeClassPrefix+this.swipeClass[2]">
          <img :src="this.slideList[2].img" @click="showCurrImg(2)" />
        </div>
      </div>
    </div>
    <div class="container">
      <FoodDisplay></FoodDisplay>
    </div>
    <ServiceBar></ServiceBar>
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
          img: '/imgs/slider/ads-discount.jpg',
        }
      ],
      swipeClass:[
        '0',
        '1',
        '2',
      ],
      swipeClassPrefix: 'p',
      showModal: false
    }
  },
  created() {
    this.axios.get("http://localhost:8082/cart/getCartTypeNum").then(r=>{
      if(r.data.status){
        this.$store.dispatch("saveCartCount",r.data);
      }
    })
  },
  mounted() {
    this.swiperMove();
  },
  methods: {
    showCurrImg(index){
      let swipeClassObj = JSON.stringify(this.swipeClass);
      let swipeClassList = JSON.parse(swipeClassObj);
      if(index===0){
        this.swipeClass = ['1', '2', '0'];
      }else if(index===1){
        this.swipeClass = ['0', '1', '2'];
      }else{
        this.swipeClass = ['2', '0', '1'];
      }
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
    swiperMove(){
      var result = setInterval(rs=>{
        let swipeClassObj = JSON.stringify(this.swipeClass);
        let swipeClassList = JSON.parse(swipeClassObj);
        // console.log(swipeClassList);
        let temp = swipeClassList[0];
        for(let i = 0;i<swipeClassList.length-1;i++){
          swipeClassList[i] = swipeClassList[(i+1)%(swipeClassList.length)];
        }
        swipeClassList[swipeClassList.length-1] = temp;
        this.swipeClass = swipeClassList;
      }, 3000);
    }
  }
}
</script>
<style lang="scss" scoped>
  .swipeArea{
    width: 100%;
    height: 450px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    padding: 50px 0px;
  }

  .swipeArea .item{
    width: fit-content;
    height: 90%;
    position: absolute;
    transition: all 0.3s ease;
  }
  .swipeArea .item img{
      cursor: pointer;
      width: 1100px;
      height: 90%;
      box-sizing: border-box;
      text-align: center;
      border-radius: 20px;
      transition: all ease-in-out 1s;
      overflow: hidden;
    }

  .p1{
    transform: translate3d(20%, 0, 0) scale(1);
    opacity: 1;
    z-index: 3;
    width: 1000px;
  }
  .p2{
    transform: translate3d(48%, 0, 0) scale(0.75);
    // opacity: 0.9;
    z-index: 2;
  }
  .p0{
    transform: translate3d(-10%, 0, 0) scale(0.75);
    // opacity: 0.1;
    z-index: 1;
  }
  .nav-menu::-webkit-scrollbar{
    display: none;
  }
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  *{
    font-family: simsun;
  }
  .container{
    width: 100%;
    box-sizing: border-box;
    padding: 0px 40px;
  }
  .index{
    width: 100%;
    height: 100%;
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
        height: 451px;
        .swiper-button-prev{
          left:5px;
        }
        img{
          width:100%;
          height:100%;
          border-radius: 10px;
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
