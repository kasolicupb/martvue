<template>
  <div class="cart-box">
    <s-header :name="'购物车'" :noback="true"></s-header>
    <div class="cart-body">
      <van-checkbox-group @change="groupChange" v-model="result" ref="checkboxGroup">
        <van-swipe-cell :right-width="50" v-for="(item, index) in list" :key="index">
          <div class="good-item">
            <van-checkbox :name="item.item_id" />
            <div class="good-img"><img :src="item.img" alt=""></div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.title }}</span>
                <span>x{{ item.num }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.price }}</div>
                <van-stepper
                  integer
                  :min="1"
                  :max="5"
                  :model-value="item.num"
                  :name="item.item_id"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              square
              icon="delete"
              type="danger"
              class="delete-button"
              @click="deleteGood(item.item_id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      v-if="list.length > 0"
      class="submit-all van-hairline--top"
      :price="total * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox @click="allCheck" v-model:checked="checkAll">全选</van-checkbox>
    </van-submit-bar>
    <div class="empty" v-if="!list.length">
      <img class="empty-cart" src="https://s.yezgea02.com/1604028375097/empty-car.png" alt="空购物车">
      <div class="title">购物车空空如也</div>
      <van-button round color="#1baeae" type="primary" @click="goTo" block>前往选购</van-button>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import { reactive, onMounted, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import navBar from '@/components/NavBar'
import sHeader from '@/components/SimpleHeader'
import { getCart, deleteCartItem, modifyCart } from '@/services/cart'
import {getLocal} from '@/common/js/utils.js'

export default {
  components: {
    navBar,
    sHeader
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      checked: false,
      list: [],
      all: false,
      result: [],
      checkAll: true
    })

    onMounted(() => {
      init()
    })

    const init = async () => {
      Toast.loading({ message: '加载中...', forbidClick: true });
      let id = JSON.parse(getLocal('token')).id
      const { data } = await getCart(id)
      console.log(data)
      state.list = data
      state.result = data.map(item => item.item_id)
      Toast.clear()
    }

    const total = computed(() => {
      let sum = 0
      let _list = state.list.filter(item => state.result.includes(item.item_id))
      _list.forEach(item => {
        sum += item.num * item.price
      })
      return sum
    })

    const goBack = () => {
      router.go(-1)
    }

    const goTo = () => {
      router.push({ path: '/home' })
    }

    const onChange = async (value, detail) => {
      if (value > 5) {
        Toast.fail('超出单个商品的最大购买数量')
        return
      }
      if (value < 1) {
        Toast.fail('商品不得小于0')
        return
      }
      if (state.list.filter(item => item.item_id == detail.name)[0].num == value) return
      Toast.loading({ message: '修改中...', forbidClick: true });
      const params = {
        user_id:JSON.parse(getLocal('token')).id,
        item_id: detail.name,
        num: value
      }
      console.log(params)
      await modifyCart(params)
      state.list.forEach(item => {
        if (item.item_id == detail.name) {
          item.num = value
        }
      })
      store.dispatch('asyncAddCart')
      Toast.clear();
    }

    const onSubmit = async () => {
      if (state.result.length == 0) {
        Toast.fail('请选择商品进行结算')
        return
      }
      // const params = JSON.stringify(state.result)
      router.push({name:'createOrder'})

    }

    const deleteGood = async (id) => {
      await deleteCartItem(id)
      store.dispatch('asyncAddCart')
      init()
    }

    const groupChange = (result) => {
      if (result.length == state.list.length) {
        state.checkAll = true
      } else {
        state.checkAll = false
      }
      state.result = result
    }
    
    const allCheck = () => {
      if (!state.checkAll) {
        state.result = state.list.map(item => item.item_id)
      } else {
        state.result = []
      }
    }

    

    return {
      ...toRefs(state),
      total,
      goBack,
      goTo,
      onChange,
      onSubmit,
      deleteGood,
      groupChange,
      allCheck
    }
  }
}
</script>

<style lang="less">
  @import '../common/style/mixin';
  .cart-box {
    .cart-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      .fj();
      .wh(100%, 44px);
      line-height: 44px;
      padding: 0 10px;
      .boxSizing();
      color: #252525;
      background: #fff;
      border-bottom: 1px solid #dcdcdc;
      .cart-name {
        font-size: 14px;
      }
    }
    .cart-body {
      margin: 16px 0 100px 0;
      padding-left: 10px;
      .good-item {
        display: flex;
        .good-img {
          img {
            .wh(100px, 100px)
          }
        }
        .good-desc {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          padding: 20px;
          .good-title {
            display: flex;
            justify-content: space-between;
          }
          .good-btn {
            display: flex;
            justify-content: space-between;
            .price {
              font-size: 16px;
              color: red;
              line-height: 28px;
            }
            .van-icon-delete {
              font-size: 20px;
              margin-top: 4px;
            }
          }
        }
      }
      .delete-button {
        width: 50px;
        height: 100%;
      }
    }
    .empty {
      width: 50%;
      margin: 0 auto;
      text-align: center;
      margin-top: 200px;
      .empty-cart {
        width: 150px;
        margin-bottom: 20px;
      }
      .van-icon-smile-o {
        font-size: 50px;
      }
      .title {
        font-size: 16px;
        margin-bottom: 20px;
      }
    }
    .submit-all {
      margin-bottom: 50px;
      .van-checkbox {
        margin-left: 10px
      }
      .van-submit-bar__text {
        margin-right: 10px
      }
      .van-submit-bar__button {
        background: @primary;
      }
    }
    .van-checkbox__icon--checked .van-icon {
      background-color: @primary;
      border-color: @primary;
    }
  }
</style>
