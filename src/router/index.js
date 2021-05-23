import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'My',
    component:() => import(/* webpackChunkName: "my" */ '../views/Login.vue')
  },
  {
    path:'/search',
    name:'Search',
    component:() => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path:'/categories',
    name:'Categories',
    component:() => import(/* webpackChunkName: "categories" */ '../views/Categories.vue')
  },
  {
    path:'/products/:id',
    name:'products',
    // props:true,
    component:() => import(/* webpackChunkName: "categories" */ '../views/productDetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Cart.vue'),

  },
  {
    path: '/createOrder',
    name: 'createOrder',
    component: () => import(/* webpackChunkName: "login" */ '@/views/CreateOrder.vue'),

  },
  {
    path: '/Order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Order.vue'),

  },
  {
    path: '/order-detail',
    name: 'OrderDetail',
    component: () => import(/* webpackChunkName: "login" */ '@/views/OrderDetail.vue'),

  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
