/**
 * @Author: fzsong3
 * @Date: 2021/2/21 9:59
 * @Description:
 */

import { reactive } from './reactive.js'
import { compile } from './compiler.js'
import { nextTick } from './next-tick.js'

export default class Vue {
  constructor (options) {
    this.options = options
    this.data = typeof options.data === 'function' ? options.data() : options.data
    this.methods = options.methods
    // 异步更新队列
    this.$nextTick = nextTick
    this.el = document.querySelector(options.el)
    // 响应式数据
    reactive(this.data)
    // 节点编译
    compile(this.el, this)
  }

}
