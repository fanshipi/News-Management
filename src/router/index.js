// import
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '../view/home'
import Login from '../view/login'
import article from '../view/home/article'

// register


// rules
const routes = [
    {path:'/home',component:Home,children:[
        {path:'/article',component:article}
    ]
},
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
    NProgress.start();
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

router.afterEach((to,from)=>{
   setTimeout(()=>{
    NProgress.done();
   },300)
})





// export
export default router