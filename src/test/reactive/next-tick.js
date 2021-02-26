/**
 * @Author: fzsong3
 * @Date: 2021/2/26 9:37
 * @Description: 任务队列 异步更新
 */
// 任务队列
const taskQueue = []
// 所有任务放微任务中
const timerFunc = () => { Promise.resolve().then(flushJobs) }

/**
 * 添加任务队列
 * @param watcher
 */
export function queueJob (watcher) {
  // 重复监听，添加第一次
  if (!taskQueue.includes(watcher)) {
    taskQueue.push(watcher)
    timerFunc()
  }
}

/**
 * 执行所有任务
 */
function flushJobs () {
  let watcher
  for (let i = 0, _i = taskQueue.length; i < _i; i++) {
    watcher = taskQueue.shift()
    watcher && watcher.update()
  }
}

/**
 * 手动触发 执行队列中所有任务
 * @param cb
 * @param ctx
 * @return {Promise<unknown>}
 */
export function nextTick (cb, ctx) {
  let _resolve
  if (cb) {
    // 回调函数 模拟watcher queue存储的是watcher 而不是callback
    taskQueue.push({ update: cb })
  }
  timerFunc()
  return new Promise(resolve => {
    _resolve = resolve
  })
}
