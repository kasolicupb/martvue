<template>
  <div class="list">
    <header class="header">{{ title }}</header>
    <div class="item-list">
      <div class="shop-item" v-for="item in data" :key="item.id" @click="gotoDetail(item.id)">
        <img
          :src="item.img"
          :alt="item.title"
          class="shop-img"
        />
        <span class="title">{{ item.title }}</span>
        <span class="price">￥{{ item.price }}</span>
      </div>
    </div>
  </div>
</template>
´
<script>
import router from '@/router/index.js'
export default {
  name: "show-list",
  props: ["title", "data"],
  setup() {
      const gotoDetail = (id)=>{
          router.push({path:`/products/${id}`})
      }
    return {gotoDetail};
  },
  //   computed:{
  //       setName(itemName.length()>0) {
  //           if(name.length()>10) {
  //               return name.subString
  //           }
  //       }
  //   }
};
</script>

<style scoped>
.list {
  margin-bottom: 70px;
}
.header {
  background-color: #f9f9f9;
  color: #3d98da;
  text-align: center;
  height: 7vh;
  line-height: 7vh;
  /* border: 1px solid #f5f5f5; */
}
.item-list {
  display: flex;
  flex-wrap: wrap;
}
.shop-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-right: 1px solid #e9e9e9;
  border-top: 1px solid #e9e9e9;
  width: 49.5%;
}
.shop-img {
  height: 100%;
  width: 100%;
}
.title {
  width: 17ch;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.9em;
  padding-top: 1vh;
}
.price {
    color: #3d98da;
    font-size: 0.9em;
    padding-top: 1vh;
    padding-bottom: 1vh;
}
</style>