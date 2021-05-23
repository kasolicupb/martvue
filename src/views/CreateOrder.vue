

<template>
  <div class="create-order">
    <s-header :name="'生成订单'" @callback="deleteLocal"></s-header>
    <div class="address-wrap">
      <div class="name" @click="goTo">
        <span>Kali </span>
        <span>13812100000</span>
      </div>
      <div class="address">北京市 北京市 昌平区 府学路18号</div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in list" :key="index">
        <div class="good-img"><img :src="item.img" alt="" /></div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.title }}</span>
            <span>x{{ item.num }}</span>
          </div>
          <div class="good-btn">
            <div class="price">¥{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ total }}</span>
      </div>
      <van-button
        @click="handleCreateOrder"
        class="pay-btn"
        color="#1baeae"
        type="primary"
        block
        >支付</van-button
      >
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed } from "vue";
import sHeader from "@/components/SimpleHeader";
import { payOrder } from "@/services/order";
import { setLocal, getLocal } from "@/common/js/utils";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { getCart, deleteCartItem } from "@/services/cart";

export default {
  components: {
    sHeader,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      list: [],
      address: {},
      showPay: false,
      orderNo: "",
      cartItemIds: [],
    });

    onMounted(() => {
      init();
    });

    const init = async () => {
      Toast.loading({ message: "加载中...", forbidClick: true });
      let id = JSON.parse(getLocal("token")).id;
      const { data } = await getCart(id);
      console.log(data);
      state.list = data;
      Toast.clear();
    };

    function current() {
      var d = new Date(),
        str = "";
      str += d.getFullYear() + "年"; //获取当前年份
      str += d.getMonth() + 1 + "月"; //获取当前月份（0——11）
      str += d.getDate() + "日";
      str += d.getHours() + ":";
      str += d.getMinutes() + ":";
      str += d.getSeconds();
      return str;
    }

    const goTo = () => {
      router.push({
        path: "/address",
        query: {
          cartItemIds: JSON.stringify(state.cartItemIds),
          from: "create-order",
        },
      });
    };

    const deleteLocal = () => {
      setLocal("cartItemIds", "");
    };

    const close = () => {
      router.push({ path: "/order" });
    };

    const handleCreateOrder = async () => {
      let now = current().toString()
      await state.list.forEach((item) => {
        console.log(item);
        payOrder({ item_id: item.item_id, num: item.num, time:now});
        deleteCartItem(item.item_id);
      });

      Toast.success("支付成功");
      setTimeout(() => {
        router.push({ path: "/order" });
      }, 2000);
    };

    const total = computed(() => {
      let sum = 0;
      state.list.forEach((item) => {
        sum += item.num * item.price;
      });
      return sum;
    });

    return {
      ...toRefs(state),
      goTo,
      deleteLocal,
      handleCreateOrder,
      close,
      total,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.create-order {
  background: #f9f9f9;
  .address-wrap {
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: "";
    }
  }
  .good {
    margin-bottom: 120px;
  }
  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;
    .good-img {
      img {
        .wh(100px, 100px);
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
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
