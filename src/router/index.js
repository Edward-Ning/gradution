import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Login from '@/components/login/Login'
import Register from '@/components/register/Register'
import BackgroundTask from '@/components/backgroundTask/BackgroundTask'
import UserCenter from '@/components/userCenter/userCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/backgroundTask',
      name: 'BackgroundTask',
      component: BackgroundTask
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: UserCenter
    }
  ]
})
