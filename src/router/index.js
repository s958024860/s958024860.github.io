/**
 * @Author: fzsong3
 * @Date: 2020/6/22 9:29
 * @Description: vue路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import KeyTest from '../pages/KeyTest'
import FormTableTest from '../pages/FormTableTest'
import Home from '../pages/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/formTableTest',
    name: 'formTableTest',
    component: FormTableTest,
  },
  {
    path: '/keyTest',
    name: 'keyTest',
    component: KeyTest,
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
