/**
 * @Author: fzsong3
 * @Date: 2021/2/19 16:24
 * @Description:
 */
export class Dep {

  constructor () {
    this.subs = []
  }

  // 收集依赖
  addSub (watcher) {
    this.subs.push(watcher)
  }

  // 监听触发
  notify () {
    console.log('依赖仓库====', this.subs)
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }

}

// 全局标志
Dep.target = null
