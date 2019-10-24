// import
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '../view/home'
import Login from '../view/login'
import article from '../view/home/article'
import publish from '../view/home/publish'
import comment from '../view/home/comment'
import account from '../view/home/account'
import overview from '../view/home/overview'
import media from '../view/home/media'
import homepage from '../view/home/homepage'

// register


// rules
const routes = [
    {path:'/home',component:Home,children:[
        {path:'/',component:homepage},
        {path:'/homepage',component:homepage},
        {path:'/article/',component:article},
        {path:'/publish/',component:publish},
        {path:'/publish/:id',component:publish, name:"publish-edit"},
        {path:'/comment/',component:comment},
        {path:'/account/',component:account},
        {path:'/overview/',component:overview},
        {path:'/media/',component:media,name:'media'},
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