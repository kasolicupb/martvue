<template>
  <div class="product-detail">
    <s-header :name="'商品详情'"></s-header>
    <div class="detail-content" v-for="(item, index) in list" :key="index">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item>
            <img :src="item.img" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ item.title || "" }}
        </div>
        <div class="product-desc">免邮费 顺丰快递</div>
        <div class="product-price">
          <span>¥{{ item.price || "" }}</span>
          <!-- <span>库存203</span> -->
        </div>
      </div>
      <div class="product-intro">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="item.detail_img || ''"></div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        :badge="!count ? '' : count"
        @click="goTo()"
        text="购物车"
      />
      <van-action-bar-button
        type="warning"
        @click="handleAddCart"
        text="加入购物车"
      />
      <van-action-bar-button type="danger" @click="goToCart" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { getDetail } from "@/services/good";
import { computed, onMounted, reactive, toRefs } from "vue";
// import { prefix } from "@/common/js/utils";
import sHeader from "@/components/SimpleHeader.vue";
import { useStore } from "vuex";
import { addCart,getCart } from "@/services/cart";
import { Toast } from "vant";

export default {
  name: "productDetail",
  components: { sHeader },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    //   const router = useRouter();
    const state = reactive({
      list: [],
    });

    onMounted(async () => {
      const { id } = route.params;
      const { data } = await getDetail(id);
      // data.goodsCarouselList = data.goodsCarouselList.map((i) => prefix(i)); //定义对数组元素内每一个元素的处理，返回处理后的结果。
      state.list = data;
      console.log(data)
      store.dispatch("asyncAddCart");
    });

    const goTo = () => {
      router.push({ name: "cart" });
    };

    const handleAddCart = async () => {
            Toast.loading({
  message: '加载中...',
  forbidClick: true,
});
      let data = []
      await getCart().then(res=>{
        data = res.data
      })
      let status = 0
      data.forEach(item => {
        if(item.item_id == state.list[0].id) {
          status = 1
        }
      })
      console.log("status="+status)
      // const hasItem = getCart()
      const { resultCode } = await addCart({
        item_id: state.list[0].id,
        status:status
      });
      Toast.clear();
      if (resultCode == 200) Toast.success("添加成功");
      store.dispatch("asyncAddCart");
    };

    const goToCart = async () => {
      Toast.loading({
  message: '加载中...',
  forbidClick: true,
});
            let data = []
      await getCart().then(res=>{
        data = res.data
      })
      let status = 0
      data.forEach(item => {
        if(item.item_id == state.list[0].id) {
          status = 1
        }
      })
      console.log("status="+status)
      // const hasItem = getCart()
      await addCart({
        item_id: state.list[0].id,
        status:status
      });
      Toast.clear()
      // if (resultCode == 200) Toast.success("添加成功");
      store.dispatch("asyncAddCart");
      router.push({ path: "/cart" });
    };

    const goBack = () => {
      router.back(-1);
    };
    console.log(store.state);
    const count = computed(() => store.state.cartCount); //如何做到一开始就刷新购物车数据？？--已解决=》在mounted调用一次store.dispatch("asyncAddCart");
    return { ...toRefs(state), goTo, handleAddCart, count, goToCart, goBack };
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.product-detail {
  .detail-header {
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
    .product-name {
      font-size: 14px;
    }
  }
  .detail-content {
    height: calc(100vh - 50px);
    overflow: hidden;
    overflow-y: auto;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        .fj();
        span:nth-child(1) {
          color: #f63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      padding-bottom: 50px;
      ul {
        .fj();
        width: 100%;
        margin: 10px 0;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px;
        img {
          width: 100%;
        }
      }
    }
  }
  .van-action-bar-button--warning {
    background: linear-gradient(to right, #6bd8d8, @primary);
  }
  .van-action-bar-button--danger {
    background: linear-gradient(to right, #0dc3c3, #098888);
  }
}
</style>