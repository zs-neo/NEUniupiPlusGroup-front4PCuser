<template>
  <div class="notify">
    <div class="textBox">
      <transition name="slide">
        <p class="mytext" :key="text.id">
        <el-tag type="warning">{{text.val.tag}}</el-tag>
            {{text.val.title}}</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scroll',
  data () {
    return {
      textArr: [
        {tag:'活动公告',title:'春节狂欢消费满300减100'},
        {tag:'精彩推荐',title:'龙虾特惠'},
        {tag:'会员专享',title:'认证会员领无门槛红包'},
        {tag:'热门推荐',title:'大闸蟹特惠88元/只'},
      ],
      number: 0
    }
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.textArr[this.number]
      }
    }
  },
  mounted () {
    this.startMove()
  },
  methods: {
    startMove () {
      // eslint-disable-next-line
      let timer = setInterval(() => {
        if (this.number === this.textArr.length-1) {
          this.number = 0;
        } else {
          this.number += 1;
        }
      }, 2500); // 滚动不需要停顿则将2000改成动画持续时间
    }
  }
}
</script>

<style scoped>

  .textBox {
    width: 100%;
    height: 60px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    text-align: center;
  }
  .mytext {
    font-size: 14px;
    font-family: "arial black";
    color: red;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 0.5s linear;
  }
  .slide-enter{
    transform: translateY(20px) scale(1);
    opacity: 1;
  }
  .slide-leave-to {
    transform: translateY(-20px) scale(0.8);
    opacity: 0;
  }
</style>
