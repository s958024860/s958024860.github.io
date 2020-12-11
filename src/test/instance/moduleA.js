/**
 * @Author: fzsong3
 * @Date: 2020/12/11 8:43
 * @Description: class a
 */

let instance = null

export default class ModuleA {
  constructor (x, y) {
    if (!instance) {
      this.x = x
      this.y = y
      instance = this
    }
    return instance
  }
  speak () {
    console.log(`x: ${this.x}; y: ${this.y}`)
  }
}
