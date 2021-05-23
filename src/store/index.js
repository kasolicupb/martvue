import { createStore } from 'vuex'
import {getCart} from '@/services/cart'
import { getLocal } from '../common/js/utils'

export default createStore({
  state: {
    cartCount:0
  },
  mutations: {
    setCartCount(state,payload) {
      state.cartCount = payload.count
    }
  },
  actions: {
    async asyncAddCart({commit}) {
      // let token = getLocal('token');
      let localdata = JSON.parse(getLocal('token'))
      let {data} = await getCart(localdata.id)
      let count = 0
      data.forEach(item => {
        count += item.num
      });
      commit('setCartCount',{count:count || 0})
    }
  },
  modules: {
  }
})
