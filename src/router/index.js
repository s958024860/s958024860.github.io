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
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../pages/Test')
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
  },
  {
    path: '/touch-scale',
    name: 'touchScale',
    component: () => import('../pages/TouchScale')
  },
  {
    path: '/component-name-test',
    name: 'ComponentNameTest',
    component: () => import('../pages/ComponentNameTest')
  },
  {
    path: '/css-var',
    name: 'cssVar',
    component: () => import('../pages/CssVar')
  },
  {
    path: '/text-overflow',
    name: 'textOverflow',
    component: () => import('../pages/TextOverflow')
  },
  {
    path: '/tab-exit',
    name: 'tabExit',
    component: () => import('../pages/TabExit')
  },
  {
    path: '/map',
    name: 'tabExit',
    component: () => import('../pages/AnHuiMap')
  },
  {
    path: '/pdf-viewer',
    name: 'pdfViewer',
    component: () => import('../pages/PdfViewer')
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
