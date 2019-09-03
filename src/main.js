import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'

Vue.use(ElementUi)

import router from './router'
import '../src/assets/css/base.css'

Vue.config.productionTip = false


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log( config);
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
