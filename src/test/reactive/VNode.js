/**
 * @Author: fzsong3
 * @Date: 2021/2/25 8:59
 * @Description: 虚拟dom
 */
export default class VNode {
  constructor (
    tag,
    data,
    children,
    text,
    elm
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
  }
}
