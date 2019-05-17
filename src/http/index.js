import axios from 'axios'
import router from '../router'
import { MessageBox } from 'element-ui'
import store from '../store'

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('hmdsUsers')) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = JSON.parse(localStorage.getItem('hmdsUsers')).token
    }
    // config.headers.imooc = `5429026`;
    return config;
  },
  err => {
    return Promise.reject(err);
  });


// http response 拦截器
axios.interceptors.response.use(
  undefined,
  error => {
    let res = error.response;
    switch (res.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        // store.commit(types.LOGOUT);
        // router.replace({
        //  path: '/login',
        //  query: {redirect: router.currentRoute.fullPath}
        // })
        console.log('未登录 或者token过期');
      case 403:
        console.log('您没有该操作权限');
      // alert('您没有该操作权限');
      case 500:
        MessageBox('登录过期，请重新登录！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('hmdsUsers')
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
        })
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });


const http = (url, params) => {
  let Url = store.state.httpUrl + url
  return new Promise((resolve, reject) => {
    axios.post(Url, params, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getExcel = (url, params) => {
  let Url = store.state.httpUrl + url
  return new Promise((resolve, reject) => {

    axios.post(Url, params, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      responseType: 'arraybuffer'
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default http
