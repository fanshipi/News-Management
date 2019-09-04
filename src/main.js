import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import JSONbig from 'json-bigint'
Vue.prototype.$axios = axios

// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
// transformRequest: [function (data) {
  //   // 对 data 进行任意转换处理
  
  //   return data;
  // }],
  
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  axios.defaults.transformResponse = [function (data) {
    // 对 data 进行任意转换处理
    // console.log(data);
    // return data;
    // console.log(JSONbig.parse(data));
    
    // return JSONbig.parse(data);
    try {
      // 有可能数据非json对象
      let obj = JSONbig.parse(data)
      return obj
    } catch(err) {
      return data
    }
  }],
  
  Vue.use(ElementUi)
  axios.defaults.baseURL = 'http://ttapi.research.itcast.cn';

import router from './router'
import '../src/assets/css/base.css'

Vue.config.productionTip = false


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log( config);
  let res = JSON.parse(window.sessionStorage.getItem("user_info"));
  if(res) {
    config.headers.Authorization = `Bearer ${res.token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  Vue.prototype.$message.error('请先登录')
  // router.push('/login')
  return Promise.reject(error);
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
