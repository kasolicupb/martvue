<template>
  <div class="home">
    <header class="header">
      <span
        ><router-link :to="{ name: 'Order' }"
          ><van-icon name="wap-nav" size="40px" /></router-link
      ></span>
      <span>
        <h3 class="title">商城</h3>
        <router-link :to="{ name: 'Search' }" class="search-area"
          >搜索商品</router-link
        >
      </span>
      <span>
        <router-link :to="{ name: 'My' }"
          ><van-icon name="manager" size="38px"
        /></router-link>
      </span>
    </header>
    <nav-bar />
    <!-- swiper -->
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        lazy-render
      >
        <van-swipe-item v-for="(item, index) in carousels" :key="index">
          <img :src="item.carouselUrl" class="img" />
        </van-swipe-item>
      </van-swipe>
      <!-- 商城分类目 -->
      <div class="category-list">
        <div v-for="item in categoryList" :key="item.categoryId" @click="tips">
          <img :src="item.imgUrl" :alt="item.name" />
          <span>{{ item.name }}</span>
        </div>
      </div>
      <!-- shop-list -->
      <show-list title="商品栏目" :data="hotGoodses"></show-list>
      <!-- <show-list title="新品上线" :data="newGoodses"></show-list> -->
      <!-- <show-list title="最新推荐" :data="recommendGoodses"></show-list> -->
    </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { Swipe, SwipeItem, Toast } from "vant";
import { getHome } from "@/services/home.js";
import shopList from "@/components/show-list.vue";
import navBar from "@/components/NavBar.vue";
import {useStore} from 'vuex'
export default {
  name: "Home",
  setup() {
    const store = useStore();
    const search = function () {
      console.log("search");
    };
    const state = reactive({
      carousels: [],
      categoryList: [
        {
          name: "超市",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png",
          categoryId: 100001,
        },
        {
          name: "服饰",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png",
          categoryId: 100003,
        },
        {
          name: "全球购",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png",
          categoryId: 100002,
        },
        {
          name: "生鲜",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png",
          categoryId: 100004,
        },
        {
          name: "到家",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png",
          categoryId: 100005,
        },
        {
          name: "充值缴费",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png",
          categoryId: 100006,
        },
        {
          name: "9.9元拼",
          imgUrl: "https://s.yezgea02.com/1604041127880/9.9%402x.png",
          categoryId: 100007,
        },
        {
          name: "领劵",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png",
          categoryId: 100008,
        },
        {
          name: "省钱",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png",
          categoryId: 100009,
        },
        {
          name: "全部",
          imgUrl:
            "https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png",
          categoryId: 100010,
        },
      ],
      hotGoodses: [],
      newGoodses: [],
      recommendGoodses: [],
    });
    onMounted(async () => {
      const { data } = await getHome();
      console.log(data);
      // state.carousels = data.carousels;
      state.hotGoodses = data;
      // state.newGoodses = data.newGoodses;
      // state.recommendGoodses = data.recommendGoodses;
      state.carousels = [
        {
          carouselUrl:
            "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner-mate40.png",
        },
        {
          carouselUrl:
            "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner1.png",
        },
        {
          carouselUrl:
            "https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner2.png",
        },
      ];
      store.dispatch('asyncAddCart')
    });
    Toast.setDefaultOptions({ duration: 1000 });
    const tips = () => {
      Toast("敬请期待");
    };
    return {
      search,
      ...toRefs(state),
      tips,
    };
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [shopList.name]: shopList,
    navBar,
  },
};
</script>

<style lang="less" scoped >
// header
.header {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 6vh;
  position: fixed;
  justify-content: center;
  text-align: center;
  z-index: 999;
  padding-top: 5px;
}
.header span:nth-child(1) {
  height: 100%;
  width: 10vw;
}
.header span:nth-child(2) {
  height: 100%;
  width: 80vw;
  display: flex;
  flex-direction: row;
}
.title {
  width: 30vw;
  line-height: 6vh;
}
.search-area {
  line-height: 6vh;
  display: inline-block;
  width: 50vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 20px;
}
.header span:nth-child(3) {
  height: 100%;
  width: 10vw;
}

// swiper
.my-swipe van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 10vh;
  text-align: center;
  background-color: #39a9ed;
}
.img {
  width: 100%;
  height: 100%;
}

//category-list
.category-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  // justify-content: center;
  margin-top: 20px;
}
.category-list div {
  width: 20%;
  display: flex;
  // text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
}
.category-list div img {
  height: 7vh;
  width: 11vw;
}
.category-list div span {
  color: #4e5b6a;
  font-size: 0.8em;
}
</style>