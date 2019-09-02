// import
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../view/home'
import Login from '../view/login'

// register


// rules
const routes = [
    {path:'/home',component:Home},
    {path:'/login',component:Login},
]

// exam
const router = new VueRouter({
    routes
})

// 判断登录
// to到哪里
// from从哪里来
// next接下来去的地方
router.beforeEach((to,from,next)=>{
    if(to.path != '/login') {
        let res = window.sessionStorage.getItem('user_info')
        if(res) {
            next()
        }else {
            Vue.prototype.$message.error('请先登录')
            next('/login')
        }
    }else {
        next()
    }
})

// export
export default router