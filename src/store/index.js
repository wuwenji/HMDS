import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const myStore = new Vuex.Store({
  state: {
    name: 'John',
    date: '',
    time: '',
    nowTime: '',
    week: '',
    httpUrl: 'http://119.23.160.82:8793/dgrl-api',
    // httpUrl: 'http://10.109.6.189:8793/dgrl-api',
    // httpUrl: 'http://192.168.1.188:8793/dgrl-api',
    qrUrl: '',
    users: {}
  },
  mutations: {
    getNew (state) {
      state.qrUrl = state.httpUrl + '/tQrCode/getQRCode?u='
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = date.getDate()
      day = day > 9 ? day : '0' + day
      let sweek = ''
      if (date.getDay() === 0) {
        sweek = '星期日'
      }
      if (date.getDay() === 1) {
        sweek = '星期一'
      }
      if (date.getDay() === 2) {
        sweek = '星期二'
      }
      if (date.getDay() === 3) {
        sweek = '星期三'
      }
      if (date.getDay() === 4) {
        sweek = '星期四'
      }
      if (date.getDay() === 5) {
        sweek = '星期五'
      }
      if (date.getDay() === 6) {
        sweek = '星期六'
      }
      let hour = date.getHours()
      let min = date.getMinutes()
      setInterval(() => {
        state.nowTime = year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + min
        state.date = year + '年' + month + '月' + day + '日'
        state.time = year + '/' + month + '/' + day + '/ ' + hour + ':' + min
        state.sweek = sweek
      }, 60000)
      state.nowTime = year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + min
      state.date = year + '年' + month + '月' + day + '日'
      state.time = year + '/' + month + '/' + day + '/ ' + hour + ':' + min
      state.sweek = sweek
    }
  },
  getters: {
    getDate: (state, getters) => (string) => {
        let d = new Date(string)
        let y = d.getFullYear()
        let m = d.getMonth() + 1
        m = m > 9 ? m : '0' + m
        let r = d.getDate()
        r = r > 9 ? r : '0' + r
        return y + '-' + m + '-' + r
    },
    getTime: (state, getters) => (string) => {
      if (string != null) {
        let d = new Date(string)
        let y = d.getFullYear()
        let m = d.getMonth() + 1
        m = m > 9 ? m : '0' + m
        let r = d.getDate()
        r = r > 9 ? r : '0' + r
        let h = d.getHours()
        h = h > 9 ? h : '0' + h
        let f = d.getMinutes()
        f = f > 9 ? f : '0' + f
        return y + '/' + m + '/' + r + ' ' + h + ':' + f
      } else {
        return ''
      }
    }
  },
  actions: {
  }
})

export default myStore
