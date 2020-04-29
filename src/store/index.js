import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const myStore = new Vuex.Store({
  state: {
    name: 'John',
    date: '',
    initShow: 0,
    time: '',
    nowTime: '',
    week: '',
    // httpUrl: 'http://119.23.160.82:8793/dgrl-api',
    // httpUrl: 'http://10.109.6.189:8793/dgrl-api',
    // httpUrl: 'http://10.109.6.187:8793/dgrl-api', // 测试
    httpUrl: 'http://192.168.1.110:8793/dgrl-api',
    // httpUrl: 'http://127.0.0.1:8793/dgrl-api',
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
      hour = hour > 9 ? hour : '0' + hour
      let min = date.getMinutes()
      min = min > 9 ? min : '0' + min
      state.nowTime = year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + min
      state.date = year + '年' + month + '月' + day + '日'
      state.time = year + '/' + month + '/' + day + '/ ' + hour + ':' + min
      state.sweek = sweek
    }
  },
  getters: {
    getDate: (state, getters) => (string, type = 1) => {
      if (string === null || string === 0 || string === undefined) {
        return ''
      } else {
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
        if (type === 1) {
          return y + '/' + m + '/' + r + ' ' + h + ':' + f
        } else {
          return y + '/' + m + '/' + r
        }
      }
    },
    // 加千分符，保留两位小数点
    toThousand: (state, getters) => (string, type = 1) => {
      if (type === 1) {
        return string.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')
      } else if (type === 3) {
        let a = string
        let ar = a.split('.')
        if (ar.length > 1) {
          return ar[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,') + parseFloat(('0.' + ar[1])).toFixed(1).substring(1)
        } else {
          return ar[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,')
        }
      } else {
        let a = JSON.stringify(string)
        let ar = a.split('.')
        return ar[0].replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,') + parseFloat(('0.' + ar[1])).toFixed(2).substring(1)
      }
    },
    getTime: (state, getters) => (string) => {
      if (string === null || string === 0 || string === undefined) {
        return ''
      } else {
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
      }
    }
  },
  actions: {
  }
})

export default myStore
