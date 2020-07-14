import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions'
Vue.use(Vuex)

// vuex中的状态变量通过：this.$store.state.username 来读取
const state = {
  username: '',
  cartCount: 0,
  signUpStep:0
}


export default new Vuex.Store({
  mutations:{
    SET_SIGN_UP_STEP (state, step){
      state.signUpStep = step;
    },
    saveCartCount (state, count) {
      state.cartCount = count
    }
  },
  state,
  // mutations,
  actions
})
