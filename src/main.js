import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入全局样式
import './assets/style/index.scss'

// 引入全局指令
import './directives'

// 引入路由
import router from './router'
// 引入mock数据
import './mock'
// 服务端接口
import httpInstance from './api/httpInstance'
// markdown 支持
import MarkdownItVue from 'markdown-it-vue'
// markdown 样式
import 'github-markdown-css/github-markdown.css'

import App from './App.vue'

// 注册全局组件 测试
Vue.component('ButtonCounter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

Vue.use(MarkdownItVue)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.axios = httpInstance

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
