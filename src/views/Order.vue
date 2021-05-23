
<template>
  <div class="order-box">
    <s-header :name="'我的订单'" :back="'/home'"></s-header>
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="10"
        >
          <div v-for="(item, index) in list" :key="index" class="order-item-box" @click="goTo(item.order_id)">
            <div class="order-item-header">
              <span style="font-size:5px;">订单时间：{{ item.create_time }}</span>
              <span v-if="item.status == 2" style="font-size:5px;">已完成</span>
              <span v-else-if="item.status == 1" style="font-size:5px;">进行中</span>
              <span v-else-if="item.status == 0" style="font-size:5px;">已取消</span>
            </div>
            <van-card
              :key="item.id"
              :num="item.num"
              :price="item.price"
              desc="全场包邮"
              :title="item.title"
              :thumb="item.img"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import sHeader from '@/components/SimpleHeader'
import { getOrderList } from '@/services/order'
import { useRouter } from 'vue-router';

export default {
  name: 'Order',
  components: {
    sHeader
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      status: '',
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0
    })

    const loadData = async () => {
      const { data } = await getOrderList()
      console.log(data)
      state.list = data
      // state.list = state.list.concat(list)
      // state.totalPage = data.totalPage
      state.loading = false;
      state.finished = true;
      // if (state.page >= data.totalPage) state.finished = true

    }

    const onChangeTab = (name) => {
      // 这里 Tab 最好采用点击事件，@click，如果用 @change 事件，会默认进来执行一次。
      state.status = name
      onRefresh()
    }

    const goTo = (id) => {
      router.push({ path: '/order-detail', query: { id } })
    }

    const goBack = () => {
      router.go(-1)
    }

    const onLoad = () => {
      console.log("onload")
      // if (!state.refreshing && state.page < state.totalPage) {
      //   console.log(state.page)
      //   console.log(state.totalPage)
      //   state.page = state.page + 1
      // }
      if (state.refreshing) {
        state.list = [];
        state.refreshing = false;
      }
      loadData()
    }

    const onRefresh = () => {
      state.refreshing = true
      state.finished = false
      state.loading = true
      state.page = 1
      onLoad()
    }

    return {
      ...toRefs(state),
      onChangeTab,
      goTo,
      goBack,
      onLoad,
      onRefresh
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .order-box {
    .order-header {
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
      .order-name {
        font-size: 14px;
      }
    }
    .order-tab {
      position: fixed;
      left: 0;
      z-index: 1000;
      width: 100%;
      border-bottom: 1px solid #e9e9e9;
    }
    .skeleton {
      margin-top: 60px;
    }
    .content {
      height: calc(~"(100vh - 70px)");
      overflow: hidden;
      overflow-y: scroll; 
      margin-top: -18px;
    }
    .order-list-refresh {
      .van-card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .van-pull-refresh__head {
        background: #f9f9f9;
      }
      .order-item-box {
        margin: 20px 10px;
        background-color: #fff;
        .order-item-header {
          padding: 10px 20px 0 20px;
          display: flex;
          justify-content: space-between;
        }
        .van-card {
          background-color: #fff;
          margin-top: 0;
        }
      }
    }
  }
</style>
