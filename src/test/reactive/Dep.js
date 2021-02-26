/**
 * @Author: fzsong3
 * @Date: 2021/2/19 16:24
 * @Description:
 */

import { queueJob } from './next-tick.js'

export class Dep {

  constructor () {
    this.subs = []
  }

  // 收集依赖
  addSub (watcher) {
    // 存入依赖的回调函数
    this.subs.push(watcher)
  }

  // 监听触发
  notify () {
    this.subs.forEach(watcher => queueJob(watcher))
  }

}

// 全局标志
Dep.target = null
