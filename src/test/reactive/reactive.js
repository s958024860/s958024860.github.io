/**
 * @Author: fzsong3
 * @Date: 2021/2/19 15:31
 * @Description: 为对象创建添加响应式
 */
import { Dep } from './Dep.js';

export function reactive (obj) {
  for (let key in obj) {
    defineReactive(obj, key)
  }
}

export function defineReactive (obj, key) {
  let value = obj[key]
  // 一个属性创建一个依赖收集
  const dep = new Dep()
  if (typeof value === 'object') reactive(value)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get () {
      // 创建监听器进行依赖收集
      if (Dep.target) {
        dep.addSub(Dep.target)
      }
      return value
    },
    set (newValue) {
      if (value === newValue) return
      value = newValue
      dep.notify()
    }
  })
}

