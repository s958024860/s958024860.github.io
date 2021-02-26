/**
 * @Author: fzsong3
 * @Date: 2021/2/19 16:01
 * @Description:
 */

import { Dep } from './Dep.js';

let uid = 0
const p = Promise.resolve()
let nextTick = cb => Promise.resolve().then(cb)

export default class Watcher {
  /**
   * 构造器
   * @param observe function 理解为什么是函数？？ 确保返回值不相同
   * @param callback function
   */
  constructor (observe, callback) {
    this.id = ++uid
    this.observe = observe
    this.callback = callback
    // 开始收集依赖
    Dep.target = this
    this.value = observe()
    // 收集完成释放
    Dep.target = null
  }

  update () {
    const newValue = this.observe()
    if (newValue === this.value) return
    this.callback(newValue, this.value)
    console.log('newValue==============', newValue)
    this.value = newValue
  }
}
