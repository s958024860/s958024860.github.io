/**
 * @Author: fzsong3
 * @Date: 2021/2/19 15:46
 * @Description:
 */
import { reactive } from './reactive'
import { Watcher } from "./Watcher";

const obj = {
  a: 1,
  b: {
    c: 2
  }
}

// 对象响应式
reactive(obj)

// 创建Watcher
new Watcher(() => {
  return obj.a + obj.b.c
}, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

// set 方法
obj.b.c = 5

obj.a = 6

