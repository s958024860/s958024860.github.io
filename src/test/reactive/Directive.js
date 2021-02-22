/**
 * @Author: fzsong3
 * @Date: 2021/2/22 8:37
 * @Description: 指令
 */

import Watcher from './Watcher.js'
import { directiveMap, browserEvents } from './constants.js'

export default class Directive {

  constructor (el, vm, name, value) {
    this.el = el
    this.vm = vm
    this.description = {
      name: name.split(':')[0],
      bindKey: value,
      eventType: name.split(':')[1] || null
    }
  }

  /**
   * 节点绑定指令
   */
  bind () {
    this[`${directiveMap[this.description.name]}Handler`]()
  }

  /**
   * v-text
   */
  vTextHandler () {
    this.el.innerText = this.vm['data'][this.description.bindKey]
    new Watcher(() => {
      return this.vm['data'][this.description.bindKey]
    }, (newValue) => {
      this.el.innerText = newValue
    })
  }

  /**
   * v-show
   * @param directiveName
   * @param bindKey
   */
  vShowHandler (directiveName, bindKey) {
    const originDisplayValue = window.getComputedStyle(this.el).display
    const showFlag = this.vm['data'][this.description.bindKey]
    this.el.style.display = showFlag ? originDisplayValue : 'none'
    new Watcher(() => {
      return this.vm['data'][this.description.bindKey]
    }, (newValue) => {
      this.el.style.display = newValue ? originDisplayValue : 'none'
    })
  }

  /**
   * v-model
   * @param directiveName
   * @param bindKey
   */
  vModelHandler (directiveName, bindKey) {
    this.el.value = this.vm['data'][this.description.bindKey]
    this.el.addEventListener('input', (event) => {
      this.vm['data'][this.description.bindKey] = event.target.value
    }, false)
  }

  /**
   * v-on
   * @param directiveName
   * @param bindKey
   */
  vOnHandler (directiveName, bindKey) {
    const method = this.vm['methods'][this.description.bindKey].bind(this.vm)
    if (browserEvents.includes(this.description.eventType)) {
      this.el.addEventListener(this.description.eventType, method, false)
    }
  }

}
