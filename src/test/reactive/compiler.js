/**
 * @Author: fzsong3
 * @Date: 2021/2/22 13:40
 * @Description:
 */
import Directive from './Directive.js'
import { directiveMap } from './constants.js'


export function compile (el, vm) {
  if (el.childNodes?.length) {
    for (let i = 0; i < el.childNodes.length; i++) {
      const node = el.childNodes[i]
      // node: element
      if (node.nodeType === 1) {
        compile(node, vm)
      } else if (node.nodeType === 3) {
        // todo
      }
    }
  }
  // 收集指令
  let directives = getDirectives(el, vm)
  // 建立绑定关系
  directives.forEach(directive => directive.bind())
}

/**
 * 收集指令
 * @param el
 * @param vm
 * @return {[]}
 */
function getDirectives (el, vm) {
  let directives = []
  if (el.attributes) {
    for (let { name, value } of el.attributes) {
      let handlerName = name.split(':')[0]
      if (handlerName in directiveMap) {
        // 实例化指令
        directives.push(new Directive(el, vm, name, value))
      }
    }
  }
  return directives
}
