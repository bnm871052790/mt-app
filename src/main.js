// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router } from './router/index'
import axios from 'axios'
import fastclick from 'fastclick'

//默认路径
// axios.defaults.baseURL = 'http://localhost:8080/';
// 配置Vue原型 (在任何组件中都可以正常使用axios)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

fastclick.attach(document.body)
// 解决clikc延迟300ms

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
