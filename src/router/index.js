import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../components/goods/Goods'
import Ratings from '../components/ratings/Ratings'
import Seller from '../components/seller/Seller'
Vue.use(VueRouter);

const routes = [
  {path:'/',component:Goods,redirect:"/goods"},
  {path:'/goods',component:Goods},
  {path:'/ratings',component:Ratings},
  {path:'/seller',component:Seller}
]
export const router = new VueRouter({
  routes,
  linkActiveClass:'active'
})