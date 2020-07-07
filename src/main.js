import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import router from './router'
// 引入mock数据
import './mock'
// 服务端接口
import httpInstance from './api/httpInstance'
// markdown 支持
import MarkdownItVue from 'markdown-it-vue'

import App from './App.vue'

Vue.use(MarkdownItVue)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.axios = httpInstance

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
