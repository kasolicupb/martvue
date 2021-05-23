

<template>
  <div class="order-detail-box">
    <s-header :name="'订单详情'" @callback="close"></s-header>
    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
              <span v-if="detail.status == 2" style="font-size:5px;">已完成</span>
              <span v-else-if="detail.status == 1" style="font-size:5px;">进行中</span>
              <span v-else-if="detail.status == 0" style="font-size:5px;">已取消</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ detail.order_id }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ detail.create_time }}</span>
      </div>
      <!-- <van-button v-if="[1,2,3].includes(detail.orderStatus)" style="margin-bottom: 10px" color="#1baeae" block @click="confirmOrder(detail.orderNo)">确认订单</van-button> -->
      <van-button v-if="!(detail.orderStatus == 1)" block @click="handleCancelOrder(detail.order_id)">取消订单</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ detail.price}}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>
    <van-card
      :key="detail.order_id"
      style="background: #fff"
      :num="detail.num"
      :price="detail.price"
      desc="全场包邮"
      :title="detail.title"
      :thumb="detail.img"
    />

  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import sHeader from '@/components/SimpleHeader'
import { getOrderDetail, cancelOrder, confirmOrder, payOrder } from '@/services/order'
import { Dialog, Toast } from 'vant'
import { useRoute,useRouter } from 'vue-router'
export default {
  name: 'OrderDetail',
  components: {
    sHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      detail: {},
      showPay: false
    })

    onMounted(() => {
      init()
    })

    const init = async () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      const { id } = route.query
      const { data } = await getOrderDetail(id)
      console.log(data)
      state.detail = data
      Toast.clear()
    }

    const handleCancelOrder = (id) => {
      Dialog.confirm({
        title: '确认取消订单？',
      }).then(() => {
        cancelOrder(id).then(res => {
          if (res.Status == 200) {
            Toast('取消成功')
            router.push({name:'Order'})
          }
        })
      }).catch(() => {
        // on cancel
      });
    }

    const handleConfirmOrder = (id) => {
      Dialog.confirm({
        title: '是否确认订单？',
      }).then(() => {
        confirmOrder(id).then(res => {
          if (res.resultCode == 200) {
            Toast('确认成功')
            init()
          }
        })
      }).catch(() => {
        // on cancel
      });
    }

    const showPayFn = () => {
      state.showPay = true
    }

    const handlePayOrder = async (id, type) => {
      Toast.loading
      await payOrder({ orderNo: id, payType: type })
      state.showPay = false
      init()
    }

    const close = () => {
      Dialog.close()
    }

    return {
      ...toRefs(state),
      handleCancelOrder,
      handleConfirmOrder,
      showPayFn,
      handlePayOrder,
      close
    }

  }
}
</script>

<style lang="less" scoped>
  .order-detail-box {
    background: #f7f7f7;
    .order-status {
      background: #fff;
      padding: 20px;
      font-size: 15px;
      .status-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
        span {

        }
      }
    }
    .order-price {
      background: #fff;
      margin: 20px 0;
      padding: 20px;
      font-size: 15px;
      .price-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
        span {

        }
      }
    }
    .van-card {
      margin-top: 0;
    }
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
