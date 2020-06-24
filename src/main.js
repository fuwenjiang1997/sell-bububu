import Vue from 'vue'
import './cube-ui'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import Goods from './components/goods/goods.vue'
import Seller from './components/seller/seller.vue'
import Ratings from './components/ratings/ratings.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false

const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller },
  { path: '/', redirect: '/goods' }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
