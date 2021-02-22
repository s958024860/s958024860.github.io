/**
 * @Author: fzsong3
 * @Date: 2021/2/19 16:01
 * @Description:
 */

import { Dep } from './Dep.js';

export default class Watcher {
  /**
   * 构造器
   * @param observe function 理解为什么是函数？？ 确保返回值不相同
   * @param callback function
   */
  constructor (observe, callback) {
    this.observe = observe
    this.callback = callback
    // 开始收集依赖
    console.log('开始收集依赖========')
    Dep.target = this
    this.value = observe()
    // 收集完成释放
    Dep.target = null
    console.log('收集完成释放========')
  }

  update () {
    const newValue = this.observe()
    console.log('监听数据更新=======', this.value, newValue)
    if (newValue === this.value) return
    this.callback(newValue, this.value)
    this.value = newValue
    console.log('数据更新=========', this.value)
  }
}
