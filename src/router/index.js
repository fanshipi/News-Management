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

// export
export default router