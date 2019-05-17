// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import store from './store'
import router from './router'
import http from './http'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/john.css'
import Print from 'vue-print-nb'
import echarts from 'echarts'
Vue.use(Print)

Vue.use(ElementUI)
Vue.prototype.http = http

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#web',
  router,
  store
})
