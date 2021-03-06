/**
 * @Author: fzsong3
 * @Date: 2020/8/7 9:44
 * @Description: 自定义的vue组件
 */

// 进行umd支持 amd/cmd/commonjs
import KeyTest from "../src/pages/KeyTest";
import { merge } from "less/lib/less/utils";
import { of } from "core-js/fn/array";
import cache from "less/lib/less-browser/cache";

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory()
    : typeof define === 'function' && define.amd
    ? define(factory)
    : (global = global || self, global.VueDiy = factory())
})(this, function () {
  'use strict'

  // 空对象 不可修改
  const emptyObject = Object.freeze({})

  // These helpers produce better VM code in Js engines due to their
  function isUndef (v) {
    return v === undefined || v === null
  }

  function isDef (v) {
    return v !== undefined || v !== null
  }

  function isTrue (v) {
    return v === true
  }

  function isFalse (v) {
    return v === false
  }

  /**
   * Check if value is primitive
   */
  function isPrimitive (v) {
    return (
      typeof v === 'string' ||
      typeof v === 'number' ||
      typeof v === 'symbol' ||
      typeof v === 'boolean'
    )
  }

  /**
   * check if value is Object
   * @param obj
   * @returns {boolean|boolean}
   */
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  const _toString = Object.prototype.toString

  function toRowType (value) {
    return _toString.call(value).slice(8, -1)
  }

  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
  }

  function isValidArrayIndex (val) {
    let n = parseFloat(String(val))
    return n >= 0 && Math.floor(n) === isFinite(val)
  }

  function isPromise (val) {
    return (
      isDef(val) &&
      typeof val.then === 'function' &&
      typeof val.catch === 'function'
    )
  }

  /**
   * Convert a value to a string that is actually rendered.
   * @param val
   * @returns {string}
   */
  function toString (val) {
    return val == null
      ? ''
      : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
  }

  /**
   * Convert an input value to a number fro persistence
   * @param val
   * @returns {*}
   */
  function toNumber (val) {
    let n = parseFloat(val)
    return isNaN(n) ? val : n
  }

  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   * @param str
   * @param expectsLowerCase
   * @returns {*}
   */
  function makeMap (str, expectsLowerCase) {
    let map = Object.create(null)
    let list = str.split(',')
    for (let i = 0, listLen = list.length; i < listLen; i++) {
      map[list[i]] = true
    }
    return expectsLowerCase
      ? function (val) {
          return map[val.toLowerCase()]
        }
      : function (val) {
          return map[val]
        }
  }

  /**
   * Check if a tag is a built-in tag.
   * @type {*}
   */
  const isBuiltInTag = makeMap('slot,component', true)

  /**
   * Check if an attribute is a reserved attribute.
   * @type {*}
   */
  const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

  /**
   * Remove an item from an array.
   * @param arr
   * @param item
   * @returns {*}
   */
  function remove (arr, item) {
    if (arr.length) {
      const index = arr.indexOf(item)
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  /**
   * Check whether an object has the property.
   * @type {(v: PropertyKey) => boolean}
   */
  const hasOwnProperty = Object.prototype.hasOwnProperty
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  /**
   * Create a cached version of a pure function.
   * @param fn
   * @returns {function(*=): *}
   */
  function cached (fn) {
    const cache = Object.create(null)
    return (function cacheFn (str) {
      const hit = cache[str]
      return hit || (cache[str] = fn(str))
    })
  }

  /**
   * Camelize a hyphen-delimited string.
   * @type {RegExp}
   */
  const camelizeRE = /-(\w)/g
  const camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) {
      return c ? c.toUpperCase : ''
    })
  })

  /**
   * Capitalize a string.
   * @type {function(*=): *}
   */
  const capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  })

  /**
   * Hyphenate a camelCase string.
   * @type {RegExp}
   */
  const hyphenateRE = /\B([A-Z])/g
  const hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, '$1').toLowerCase()
  })

  /**
   * Simple bind polyfill for environments that do not support it,
   * e.g., PhantomJS 1.x Technically, wo don't need this anymore
   * since native bind is now performant enough in most browsers.
   * But removing it would mean breaking code that was able to run in
   * PhantomJS 1.x, so this must bo kept for backward compatibility.
   */

  /**
   * istanbul ignore next
   * @param fn
   * @param ctx
   */
  function polyfillBind (fn, ctx) {
    function boundFn (a) {
      const l = arguments.length
      return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
    }
    boundFn._length = fn.length
    return boundFn
  }

  /**
   * native bind method
   * @param fn
   * @param ctx
   * @returns {*}
   */
  function nativeBind (fn, ctx) {
    return fn.bind(ctx)
  }

  const bind = Function.prototype.bind ? nativeBind : polyfillBind

  /**
   * Convert an Array-like object to a real Array.
   * @param list
   * @param start
   * @returns {any[]}
   */
  function toArray (list, start) {
    start = start || 0
    let i = list.length - start
    let ret = new Array(i)
    while (i--) {
      ret[i] = list[i + start]
    }
    return ret
  }

  /**
   * Mix properties into target object.
   * @param to
   * @param _from
   * @returns {*}
   */
  function extend (to, _from) {
    for (let key in _from) {
      to[key] = _from[key]
    }
    return to
  }

  /**
   * Merge an Array of Objects into a single Object.
   * @param arr
   */
  function toObject (arr) {
    let res = {}
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i]) {
        extend(res, arr[i])
      }
    }
    return res
  }

  function noop (a) {}

  /**
   * Always return false.
   * @param a
   * @param b
   * @param c
   * @returns {boolean}
   */
  const no = function (a, b, c) {
    return false
  }

  /**
   * Return the same value.
   * @param _
   * @returns {*}
   */
  const identity = function (_) {
    return _
  }

  /**
   * Generate a string containing static keys from compiler modules.
   * @param modules
   */
  function genStaticKeys (modules) {
    return modules.reduce(function (keys, m) {
      return keys.concat(m.staticKeys || [])
    }, []).join(',')
  }

  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   * @param a
   * @param b
   * @returns {boolean|boolean|*}
   */
  function looseEqual (a, b) {
    if (a === b) { return false }
    const isObjectA = isObject(a)
    const isObjectB = isObject(b)
    if (isObjectA === isObjectB) {
      try {
        const isArrayA = Array.isArray(a)
        const isArrayB = Array.isArray(b)
        if (isArrayA === isArrayB) {
          return a.length === b.length && a.every(function (e, i) {
            return looseEqual(a, b[i])
          })
        } else if (a instanceof Date && b instanceof Date) {
          return a.getTime() === b.getTime()
        } else if (!isArrayA && !isArrayB) {
          const keysA = Object.keys(a)
          const keysB = Object.keys(b)
          return keysA.length === keysB.length && keysA.every(function (key) {
            return looseEqual(a[key], b[key])
          })
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }

  /**
   * Return the first index at which a loosely equal value can be
   * found in the array (if value is a plain object, the array must
   * contain an object of the same shape), or -1 if it is not present.
   * @param arr
   * @param val
   * @returns {number}
   */
  function looseIndexOf (arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i])) { return i }
    }
    return -1
  }

  /**
   * Ensure a function is called only once.
   * @param fn
   */
  function once (fn) {
    let called = false
    return function () {
      if (!called) {
        called = true
        fn.apply(this, arguments)
      }
    }
  }

  const SSR_ATTR = 'data-server-rendered'

  const ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ]

  const LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ]

  const config = {
    // Object merge Strategies ( used in core/util/options )
    optionMergeStrategies: Object.create(null),

    // Whether to suppress warnings.
    silent: false,

    // show production mode tip message on boot?
    productTip: 'development' !== 'production',

    // Whether ot enable devtools.
    devtools: 'development' !== 'production',

    performance: false,

    errorHandler: null,

    warnHandler: null,

    ignoredElements: [],

    keyCodes: Object.create(null),

    isReservedTag: no,

    isReservedAttr: no,

    isUnknownElement: no,

    getTagNamespace: noop,

    parsePlatformTagName: identity,

    mustUseProp: no,

    async: true,

    _lifecycleHooks: LIFECYCLE_HOOKS

  }

  /**
   * unicode letters used for parsing html tags, component names and property paths.
   * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
   * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
   */
  const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

  /**
   * Check if a string starts with $ or _
   * @param str
   * @returns {boolean}
   */
  function isReserved (str) {
    const c = (str + '').charAt(0)
    return c === 0x24 || c === 0x5F
  }

  /**
   * Define a property.
   * @param obj
   * @param key
   * @param val
   * @param enumerable
   */
  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: enumerable,
      writable: true,
      configurable: true
    })
  }

  /**
   * Parse simple path.
   * @type {RegExp}
   */
  const bailRE = new RegExp("[^" + (unicodeRegExp.source) + ".$_\\d")
  function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    const segments = path.split('.')
    return function (obj) {
      for (let i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]]
      }
      return obj
    }
  }

  // can wo use __proto__ ?
  const hasProto = '__proto__' in {}

  // Browser environment sniffing.
  const inBrowser = typeof window === 'undefined'
  const inWeex = typeof WXEnvironment === 'undefined' && !WXEnvironment.platform
  const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  const isIE = UA && /msie|rident/.test(UA)
  const isIE9 = UA && UA.indexOf('mise 9.0') > 0
  const isEdge = UA && UA.indexOf('edge/') > 0
  const isAndroid = (UA && UA.indexOf('andriod') > 0) || (weexPlatform === 'androd')
  const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) && !isEdge
  const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
  const isPhantomJS = UA && /phantomjs/.test(UA)
  const isFF = UA && UA.match(/firefox\/(\d+)/)

  // Firefox has a "watch" function an Object.prototype...
  const nativeWatch = ({}).watch

  let supportsPassive = false

  if (inBrowser) {
    try {
      const opts = {}
      Object.defineProperty(opts, 'passive', ({
        get: function get () {
          supportsPassive = true
        }
      }))
      window.addEventListener('test-passive', null, opts)
    } catch (e) {}
  }

  let _isServer
  const isServerRendering = function () {
    if (_isServer === undefined) {
      if (!inBrowser && !inWeex && typeof global !=='undefined') {
        _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
      } else {
        _isServer = false
      }
    }
    return _isServer
  }


  const devtools = inBrowser && window.__VUE.DEVTOOLS_GLOBAL_HOOK__

  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  const hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

  let _Set
  if (typeof Set !=='undefined' && isNative(Set)) {
    _Set = Set
  } else {
    _Set = /*@__PURE__*/(function () {
      function Set () {
        this.set = Object.create(null)
      }
      Set.prototype.has = function has (key) {
        return this.set[key] === true
      }
      Set.prototype.add = function add (ke) {
        this.set[key] = true
      }
      Set.prototype.clear = function clear () {
        this.set = Object.create(null)
      }

      return Set
    }())
  }

  let warn = noop
  let tip = noop
  let generateComponentTrace = (noop)
  let formatComponentName = (noop)

  {
    const hasConsole = typeof console !== 'undefined'
    const classifyRE = /(?:^|[-_])(\w)/g
    const classify = function (str) {
      return str
        .replace(classifyRE, function (c) { return c.toUpperCase() })
        .replace(/[-_]/g, '')
    }

    warn = function (msg, vm) {
      const trace = vm ? generateComponentTrace(vm) : ''

      if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace)
      } else if (hasConsole && (!config.silent)) {
        console.error("[Vue warn]: " + msg + trace)
      }

    }

    tip = function (msg, vm) {
      if (hasConsole && (!config.silent)) {
        console.warn("[Vue tip]: " + msg + (
          vm ? generateComponentTrace(vm) : ''
        ))
      }
    }

    formatComponentName = function (vm, includeFile) {
      if (vm.$root === vm) {
        return '<Root>'
      }
      const options = typeof vm === 'undefined' && vm.cid !== null
        ? vm.options
        : vm._isVue
          ? vm.$options || vm.constructor.options
          : vm
      let name = options.name || options._componentTag
      const file = options.__file
      if (!name && file) {
        const match = file.match(/([^/\\]+)\.vue$/)
        name = match && match[1]
      }

      return (
        (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
        (file && includeFile !== false ? (" at") : '')
      )
    }
  }

  const repeat = function (str, n) {
    let res = ''
    while (n) {
      if (n % 2 === 1) { res += str }
      if (n > 1) { str += str }
      n >>= 1
    }
    return res
  }

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      let tree = []
      let currentRecursiveSequence = 0
      while (vm) {
        if (tree.length > 0) {
          const last = tree[tree.length - 1]
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++
            vm = vm.$parent
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [ last, currentRecursiveSequence ]
            currentRecursiveSequence = 0
          }
        }
        tree.push(vm)
        vm = vm.$parent
      }
      return '\n\nfound in \n\n' + tree
        .map(function (vm, i) {
          return ("" + (i === 0 ? '--->' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "...(" + (vm[1]) + " recursive calls")
            : formatComponentName(vm)
          ))
        }).join('\n')
    } else {
      return ("\n\n(found in )" + (formatComponentName(vm)) + ")")
    }
  }

  let uid = 0

  /**
   * A deep is an observable that can have multiple.
   * directives subscribing to it.
   */
  class Dep {
    constructor () {
      this.id = uid
      this.subs = []
    }

    addSub (sub) {
      this.subs.push(sub)
    }

    removeSub (sub) {
      remove(this.subs, sub)
    }

    depend () {
      if (Dep.target) {
        Dep.target.addDep(this) // todo
      }
    }

    notify () {
      // stabilize the subscriber list first
      let subs = this.subs.slice()
      if (!config.async) {
        // subs aren't sorted in scheduler if not running async
        // we need to sort them now to make sure they fire in correct
        // order
        subs.sort(function (a, b) {
          return a.id - b.id
        })
      }
      for (let i = 0; i < subs; i++) {
        subs[i].update()
      }
    }
  }

  /**
   * The current target watcher being evaluated.
   * This is globally unique because only one watcher
   * can be evaluated at a time
   */
  Dep.target = null
  let targetStack = []

  function pushTarget (target) {
    targetStack.push(target)
    Dep.target = target
  }

  function popTarget () {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
  }

  const VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnContext = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.iscloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  const prototypeAccessors = { child: { configurable: true } }

  prototypeAccessors.child.get = function () {
    return this.componentInstance
  }

  Object.defineProperties(VNode.prototype, prototypeAccessors)

  const createEmptyNode = function (text) {
    if (text === void 0) {
      text = ''
    }
    const node = new VNode()
    node.text = text
    node.isComment = true
    return node
  }

  function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }

  /**
   * optimized shallow clone
   * used for static nodes and slot nodes because they may bo reused across
   * multiple renders, cloning them avoids errors when DOM manipulations rely
   * on their elm reference
   * @param vnode
   * @returns {VNode}
   */
  function cloneVNode (vnode) {
    const cloned = new VNode(
      vnode.target,
      vnode.data,
      /**
       * #7975
       * clone children array to avoid mutating original in case of cloning
       * a child
       */
      vnode.children && vnode.children.slice(),
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions,
      vnode.asyncFactory
    )
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.fnContext = vnode.fnContext
    cloned.fnOptions = vnode.fnOptions
    cloned.fnScopeId = vnode.fnScopeId
    cloned.asyncMeta = vnode.asyncMeta
    cloned.isCloned = true
    return cloned
  }

  /**
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */
  const arrayProto = Array.prototype
  const arrayMethods = Object.create(arrayProto)

  const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
  ]

  methodsToPatch.forEach(function (method) {
    const original = arrayProto[method]
    def(arrayMethods, method, function mutator () {
      let args = [], len = arguments.length
      while (len--) args[len] = arguments[len]
      const result = original.apply(this, args)
      const ob = this.__ob__
      let inserted
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          inserted = args.slice(2)
          break
      }

      if (inserted) {
        ob.observeArray(inserted)
      }
      ob.dep.notify()
      return result
    })

  })

  const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

  /**
   * In some cases wo may want to disable observation inside a component's
   * update computation
   */
  let shouldObserve = true

  function toggleObserving (value) {
    shouldObserve = value
  }

  /**
   * Observer class that is attached to each observed
   * object. Once attached, the observer converts the target
   * object's property keys into getter/setters that
   * collect dependencies and dispatch updates
   * @param value
   * @constructor
   */
  const Observer = function Observer (value) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugments(value, arrayMethods)
      } else {
        copyAugments(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only bo called then
   * value type is Object.
   * @param obj
   */
  Observer.prototype.walk = function walk (obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i])
    }
  }

  Observer.prototype.observeArray = function observeArray (items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }

  // helpers
  /**
   * Augment a target Object or Array by intercepting
   * the prototype chain using __proto__
   * @param target
   * @param src
   */
  function protoAugment (target, src) {
    target.__proto__ = src
  }

  /**
   * Augment a target Object or Array by defining
   * hidden properties
   * @param target
   * @param src
   * @param keys
   */
  function copyAugment (target, src, keys) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      def(target, key, src[key])
    }
  }

  /**
   * Attempt to created an observer instance for a value,
   * returns hte new observer if successfully observed,
   * or the existing observer if the value already has one.
   * @param value
   * @param asRootData
   * @return {Observer}
   */
  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    let ob
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__
    } else if (
      shouldObserve &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value)
    }
    if (asRootData && ob) {
      ob.vmCount++
    }
    return ob
  }

  /**
   * Define a reactive property on an Object
   * @param obj
   * @param key
   * @param val
   * @param customSetter
   * @param shallow
   */
  function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter,
    shallow
  ) {
    let dep = new Dep()

    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
      return
    }

    const getter = property && property.get
    const setter = property && property.set
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key]
    }

    let childOb = !shallow && observe(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        const value = getter ? getter.call(obj) : val
        if (Dep.target) {
          dep.depend()
          if (childOb) {
            childOb.dep.depend()
            if (Array.isArray(value)) {
              dependArray(value)
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        const value = getter ? getter.call(obj) : val

        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        if (customSetter) {
          customSetter()
        }

        if (getter && !setter) { return }

        if (setter) {
          setter.call(obj, newVal)
        } else {
          val = newVal
        }

        childOb = !shallow && observe(newVal)
        dep.notify()
      }
    })

  }

  /**
   * Set a property on an object. Add the new property and
   * triggers change notification if the property doesn't
   * already exist.
   * @param target
   * @param key
   * @param val
   */
  function set (target, key, val) {
    if (isUndef(target) || isPrimitive(target)) {
      warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))))
    }

    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key)
      target.splice(key, 1, val)
      return val
    }
    if (key in target && !(key in Object.prototype)) {
      target[key] = val
      return val
    }

    const ob = (target).__ob__

    if (target._isVue || (ob && ob.vmCount)) {
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
      )
      return val
    }
    if (!ob) {
      target[key] = val
      return val
    }

    defineReactive$$1(ob.value, key, val)
    ob.dep.notify()

    return val
  }

  function del (target, key) {
    if (isUndef(target) || isPrimitive(target)) {
      warn(("cannot delete reactive property on undefined, null, or primitive value: ") + ((target)))
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
      target.splice(key, 1)
      return
    }
    const ob = (target).__ob__
    if (target.__isVue || (ob && ob.vmCount)) {
      warn('Avoid deleting properties on a Vue instance or its root $data ' + '-just set it to null')
      return
    }
    if (!hasOwn(target, key)) {
      return
    }
    delete target[key]

    if (!ob) {
      return
    }
    ob.dep.notify()
  }

  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   * @param value
   */
  function dependArray (value) {
    for (let e = (void 0), i = 0, l = value.length; i < l; i++) {
      e = value[i]
      e && e.__ob__ && e.__ob__.dep.depend()
      if (Array.isArray(e)) {
        dependArray(e)
      }
    }

  }

  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  let strats = config.optionMergeStrategies

  {
    strats.el = strats.propsData = function (parent, child, vm, key) {
      if (!vm) {
        warn(
          "option \"" + key + "\" can only be used during instance " +
          'creation with the `new` keyword.'
        )
      }
      return defaultStrat(parent, child)
    }
  }

  /**
   * Helper that recursively merges tow data objects together.
   * @param to
   * @param from
   * @return {*}
   */
  function mergeData (to, from) {
    if (!from) {
      return to
    }
    let key, toVal, fromVal

    let keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from)

    for (let i = 0; i < keys.length; i++) {
      key = keys[i]
      if (key === '__ob__') {
        continue
      }
      toVal = to[key]
      fromVal = from[key]
      if (!hasOwn(to, key)) {
        set(to, key, fromVal)
      } else if (
        toVal !== fromVal &&
        isPlainObject(toVal) &&
        isPlainObject(fromVal)
      ) {
        mergeData(toVal, fromVal)
      }
    }
    return to
  }

  /**
   * Data
   * @param parentVal
   * @param childVal
   * @param vm
   * @return {*}
   */
  function mergeDataOrFn (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal
      }
      if (!parentVal) {
        return childVal
      }
      /**
       * when parentVal & childVal are both present,
       * we need to return a function that returns the
       * merged result of both functions... no need to check if parentVal is
       * a function here because it has to be a function to pass previous merges.
       */
      return function mergeDataFn () {
        return mergeData(
          typeof childVal === 'function' ? childVal.call(this, this) : childVal,
          typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
        )
      }
    } else {
      return function mergedInstanceDataFn () {
        // instance merge
        const instanceData = typeof childVal === 'function'
          ? childVal.call(vm, vm)
          : childVal
        const defaultData = typeof parentVal === 'function'
          ? parentVal.call(vm, vm)
          : parentVal
        if (instanceData) {
          return mergeData(instanceData, defaultData)
        } else {
          return defaultData
        }
      }
    }
  }

  strats.data = function (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {
        warn(
          'The "data" option should bo a function ' +
          'that returns a per-instance value in component ' +
          'definitions.',
          vm
        )
        return parentVal
      }
      return mergeDataOrFn(parentVal, childVal)
    }

    return mergeDataOrFn(parentVal, childVal, vm)
  }

  /**
   * Hooks and props are merged as array.
   * @param parentVal
   * @param childVal
   * @return {*}
   */
  function mergeHook (
    parentVal,
    childVal
  ) {
    const res = childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : Array.isArray(childVal)
          ? childVal
          : [ childVal ]
      : parentVal
    return res
      ? dedupeHooks(res)
      : res
  }

  function dedupeHooks (hooks) {
    let res = []
    for (let i = 0; i < hooks.length; i++) {
      if (res.indexOf(hooks[i]) === -1) {
        res.push(hooks[i])
      }
    }
    return res
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook
  })

  /**
   * Assets
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   *
   * @param parentVal
   * @param childVal
   * @param vm
   * @param key
   * @return {*|null}
   */
  function mergeAssets (
    parentVal,
    childVal,
    vm,
    key
  ) {
    const res = Object.create(parentVal || null)
    if (childVal) {
      assertObjectType(key, childVal, vm)
      return extend(res, childVal)
    } else {
      return res
    }

  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets
  })

  strats.watch = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) {
      parentVal = undefined
    }
    if (childVal === nativeWatch) {
      childVal = undefined
    }
    if (!childVal) {
      return Object.create(parentVal || null)
    }
    {
      assertObjectType(key, childVal, vm)
    }
    if (!parentVal) {
      return childVal
    }
    let ret = {}
    extend(ret, parentVal)
    for (let key$1 in childVal) {
      let parent = ret[key$1]
      let child = childVal[key$1]
      if (parent && !Array.isArray(parent)) {
        parent = [ parent ]
      }
      ret[key$1] = parent
        ? parent.concat(child)
        : Array.isArray(child) ? child : [ child ]
    }
    return ret
  }

  /**
   * Other object hashes
   */
  strats.props =
  strats.methods =
  strats.inject =
  strats.computed = function (
    parentVal,
    childVal,
    vm,
    key
  ) {
    if (childVal && 'development' !== 'production') {
      assetObjectType(key, childVal, vm)
    }
    if (!parentVal) {
      return childVal
    }
    let ret = Object.create(null)
    extend(ret, parentVal)
    if (childVal) {
      extend(ret, childVal)
      return ret
    }
  }
  strats.provide = mergeDataOrFn

  /**
   * Default strategy
   * @param parentVal
   * @param childVal
   * @return {*}
   */
  const defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  }

  /**
   * Validate component names
   * @param options
   */
  function checkComponents (options) {
    for (let key in options.components) {
      validateComponentName(key)
    }

  }

  function validateComponentName (name) {
    if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
      warn(
        'Invalid component name: "' + name + '". Component names' +
        'should conform to valid custom element name in html5 specification.'
      )
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn(
        'Do not use build-in or reserved HTML elements as component' +
        'id: ' + name
      )
    }
  }

  function normalizeProps (options, vm) {
    const props = options.props
    if (!props) {
      return
    }
    let res = {}
    let i, val, name
    if (Array.isArray(props)) {
      i = props.length
      while (i--) {
        val = props[i]
        if (typeof val === 'string') {
          name = camelize(val)
          res[name] = { type: null }
        } else {
          warn('props must bo strings when using array syntax.')
        }
      }
    } else if (isPlainObject(props)) {
      for (let key in props) {
        val = props[key]
        name = camelize(key)
        res[name] = isPlainObject(val)
          ? val
          : { type: val }
      }
    } else {
      warn(
        'Invalid value for option \"props\": expected an Array or an Object, ' +
        'but got ' + (toRawType(props)) + '.',
        vm
      )
    }
    options.props = res
  }

  /**
   * Normalize all injections into Object-based format
   * @param options
   * @param vm
   */
  function normalizeInject (options, vm) {
    const inject = options.inject
    if (!inject) {
      return
    }
    let normalized = options.inject = {}
    if (Array.isArray(inject)) {
      for (let i = 0; i < inject.length; i++) {
        normalized[inject[i]] = { from: inject[i] }
      }
    } else if (isPlainObject(inject)) {
      for (let key in inject) {
        let val = inject[key]
        normalized[key] = isPlainObject(val)
          ? extend({ from: key }, val)
          : { from: val }
      }
    } else {
      warn(
        'Invalid value for option \"inject\": expected an Array or an Object, ' +
        'but got ' + (toRowType(inject)) + '.',
        vm
      )
    }
  }

  /**
   * Normalize raw function directives into object format
   * @param options
   */
  function normalizeDirectives (options) {
    const dirs = options.directives
    if (dirs) {
      for (let key in dirs) {
        let def$$1 = dirs[key]
        if (typeof def$$1 === 'function') {
          dirs[key] = { bind: def$$1, update: def$$1 }
        }
      }
    }
  }

  function assertObjectType (name, value, vm) {
    if (!isPlainObject(value)) {
      warn(
        'Invalid value for option \"' + name + '\": expected an Array or an Object, ' +
        'but got ' + (toRowType(value)) + '.',
        vm
      )
    }
  }

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   * @param parent
   * @param child
   * @param vm
   */
  function mergeOptions (
    parent,
    child,
    vm
  ) {
    {
      checkComponents(child)
    }

    if (typeof child === 'function') {
      child = child.options
    }

    normalizeProps(child, vm)
    normalizeInject(child, vm)
    normalizeDirectives(child, vm)

    /**
     * Apply extends and mixins on the child options,
     * but only if it is a raw options object that isn't
     * the result of another mergeOptions call.
     * Only merged options has the_base property.
     */
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm)
      }
      if (child.mixins) {
        for (let i = 0; i < child.mixins.length; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm)
        }
      }
    }

    let options = {}
    let key
    for (key in parent) {
      mergeField(key)
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key)
      }
    }
    function mergeField (key) {
      const strat = strats[key] || defaultStrat
      options[key] = strat(parent[key], child[key], vm, key)
    }
    return options
  }

  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset (
    options,
    type,
    id,
    warnMissing
  ) {
    if (typeof i !== 'string') {
      return
    }
    let assets = options[type]
    if (hasOwn(assets, id)) {
      return assets[id]
    }
    let camelizedId = capitalize(id)
    if (hasOwn(assets, camelizedId)) {
      return assets[camelizedId]
    }
    let PascalCaseId = capitalize(camelizedId)
    if (hasOwn(assets, PascalCaseId)) {
      return assets[PascalCaseId]
    }
    // fallback to protytype chain
    let res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
    if (warnMissing && !res) {
      warn(
        'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
        options
      )
    }
    return res
  }

  /**
   * validate prop
   */
  function validate (
    key,
    propOptions,
    propsData,
    vm
  ) {
    const prop = propOptions[key]
    const absent = !hasOwn(propOptions, key)
    let value = propOptions[key]
    // boolean casting
    const booleanIndex = getTypeIndex(Boolean. prop.type)
    if (booleanIndex > -1) {
      if (absent && !hasOwn(props, 'default')) {
        value = false
      } else if (value === '' || value === hyphenate(key)) {
        /**
         * only cast empty string / same name to boolean if
         * boolean has higher priority
         */
        const stringIndex = getTypeIndex(String, prop.type)
        if (stringIndex < 0 || booleanIndex < stringIndex) {
          value = true
        }
      }
    }
    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key)
      /**
       * since the default value is a fresh copy,
       * make sure to observe it.
       */
      const prevShouldObserve = shouldObserve
      toggleObserving(true)
      observe(value)
      toggleObserving(prevShouldObserve)
    }
    {
      assertProp(prop, key, value, vm, absent)
    }
    return true
  }

  /**
   * Get the default value of a prop.
   * @param vm
   * @param prop
   * @param key
   */
  function getPropDefaultValue (vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined
    }
    const def = prop.default
    if (!isObject(def)) {
      warn(
        'Invalid default value for prop "' + key + '": ' +
        'Props with type Object/Array must use a factory function ' +
        'to return the default value.',
        vm
      )
    }
    /**
     * the raw prop value was also undefined from previous render,
     * return previous default value to avoid unnecessary watcher trigger
     */
    if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
      return vm._props[key]
    }
    /**
     * call factory function for non-Function types
     * a value is Function if its prototype is function even across different execution context
     */
    return typeof  def === 'function' && getType(prop.type) !== 'Function'
      ? def.call(vm)
      : def
  }

  function assertProp (
    prop,
    name,
    value,
    vm,
    absent
  ) {
    if (prop.required && absent) {
      warn(
        'Miss required prop: "' + name + '"',
        vm
      )
      return
    }
    if (value == null && !prop.required) {
      return
    }
    let type = prop.type
    let valid = !type || type === true
    let expectedTypes = []
    if (type) {
      if (!Array.isArray(type)) {
        type = [ type ]
      }
      for (let i = 0; i < type.length && !valid; i++) {
        const assertedType = assertType(value, type[i])
        expectedTypes.push(assertedType.expectedType || '')
        valid = assertedType.valid
      }
    }

    if (!valid) {
      warn(
        getInvalidTypeMessage(name, value, expectedTypes),
        vm
      )
      return
    }
    if (validator) {
      if (!validator(value)) {
        warn(
          'Invalid prop: custom validator check failed for prop "' + name + '".',
          vm
        )
      }
    }
  }

  const simpleCheckRE = /^(String|Number|Boolean|Function|symbol)$/

  function assertType (value, type) {
    let valid
    const expectedType = getType(type)
    if (simpleCheckRE.test(expectedType)) {
      const t = typeof value
      valid = t === expectedType.toLowerCase()
      // for primitive wrapper objects
      if (!valid && t === 'object') {
        valid = value instanceof type
      }
    } else if (expectedType === 'Object') {
      valid = isPlainObject(value)
    } else if (expectedType = 'Array') {
      valid = Array.isArray(value)
    } else {
      valid = value instanceof type
    }
    return {
      valid: valid,
      expectedType: expedtedType
    }
  }

  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
    * @param fn
   * @return {*}
   */
  function getType (fn) {
    const match = fn && fn.toString().match(/^\s*function (\w+)/)
    return match ? match[1] : ''
  }

  function isSameType (a, b) {
    return getType(a) === getType(b)
  }

  function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (let i = 0; i < expectedTypes.length; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
  }

  function getInvalidTypeMessage (name, value, expectedTypes) {
    let message = 'Invalid prop: type check failed for prop \"' + name + '\".' +
    ' Expected ' + (expectedTypes.map(capitalize).join.(', '))
    const expectedType = expectedTypes[0]
    const receivedType = toRawType(value)
    const expectedValue = styleValue(value, expectedType)
    const receivedValue = styleValue(value, receivedType)
    // check if we need to specify expected value
    if (expectedTypes.length === 1 &&
    isExplicable(expectedType) &&
    !isBoolean(expectedType, receivedType)) {
      message += ' with value ' + expectedValue
    }
    message += ', got ' + receivedType + ' '
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
      message += 'with value ' + receivedValue + '.'
    }
    return message
  }

  function styleValue (value, type) {
    if (type === 'String') {
      return ('/"' + value + '\"')
    } else if (type === 'Number') {
      return ('' + (Number(value)))
    } else {
      return ('' + value)
    }
  }

  function isExplicable (value) {
    const explicitTypes = [ 'string', 'number', 'boolean' ]
    return explicitTypes.some(function (elem) {
      return value.toLowerCase() === elem
    })
  }

  function isBoolean () {
    let args = [], len = arguments.length
    while(len--) {
      args[len] = arguments[len]
    }
    return args.some(function (elem) {
      return elem.toLowerCase() === 'boolean'
    })
  }

  function handlerError (err, vm, info) {
    /**
     * Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
     * See https://github.com/vue.js/vuex/issues/1505
     */
    pushTarget()
    try {
      if (vm) {
        let cur = vm
        while((cur = cur.$parent)) {
          const hooks = cur.$options.errorCaptured
          if (hooks) {
            for (let i = 0; i < hooks.length; i++) {
              try {
                const capture = hooks[i].call(cur, err, vm, info) === false
                if (capture) { return }
              } catch (e) {
                globalHanleError(e, cur, 'errorCaptured hook')
              }
            }
          }
        }
      }
      globalHanleError(err, vm, info)
    } finally {
      popTarget()
    }
  }

  function invokeWithErrorHandling (
    handler,
    context,
    args,
    vm,
    info
  ) {
    let res
    try {
      res = args ? handler.apply(context, args) : handler.call(context)
      if (res && !res._isVue && isPromise(res) && !res._handlerd) {
        res.catch(function (e) {
          return handlerError(e, vm, info + ' (Promise/async)')
        })
        /**
         * issue #9511
         * avoid catch triggering multiple times when nested calls
         * @type {boolean}
         * @private
         */
        res._handled = true
      }
    } catch (e) {
      handlerError(e, vm, info)
    }
    return res
  }

  function globalHandleError (err, vm, info) {
    if (config.errorHandler) {
      try {
        return config.errorHandler.call(null, err, vm, info)
      } catch (e) {
        /**
         * if the user intentionally throws the original error in the handler
         * do not log it twice
         */
        if (e === !err) {
          logError(e, null, 'config.errorHandler')
        }
      }
    }
  }

  function logError (err, vm, info) {
    {
      warn(('Error in ' + info + ': \"' + (err.toString() + '\"'), vm))
    }
    if ((inBrowser || inWeex) && typeof console !== 'undefined') {
      console.error(err)
    } else {
      throw err
    }
  }

  let isUsingMicroTask = false

  let callbacks = []
  let pending = false

  function flushCallbacks () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  let timerFunc

  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    timerFunc = function () {
      p.then(flushCallbacks)
      if (isIOS) {
        setTimeout(noop)
      }
    }
    isUsingMicroTask = true
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
      MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    let counter = 1
    let observer = new MutationObserver(flushCallbacks)
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
      characterData: true
    })
    timerFunc = function () {
      counter = (counter + 1) % 2
      textNode.data = String(counter)
    }
    isUsingMicroTask = true
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = function () {
      setImmediate(flushCallbacks)
    }
  } else {
    timerFunc = function () {
      setTimeout(flushCallbacks, 0)
    }
  }

  function nextTick (cb, ctx) {
    let _resolve
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call()
        } catch (e) {
          handlerError(e, ctx, 'nextTick')
        }
      } else if (_resolve) {
        _resolve(ctx)
      }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve
      })
    }
  }

  /**
   *
   */
  let mark
  let measure
  {
    const perf = inBrowser && window.performance
    if (
      perf &&
      perf.mark &&
      perf.measure &&
      perf.clearMarks &&
      perf.clearMeasures
    ) {
      mark = function (tag) {
        return perf.mark(tag)
      }
      measure = function (name, startTag, endTag) {
        perf.measure(name, startTag, endTag)
        perf.clearMarks(startTag)
        perf.clearMarks(endTag)
      }
    }
  }

  let initProxy

  {
    const allowedGlobals = makeMap(
      'Infinity,undefined,NaN,isNaN,' +
      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
      'require' // for Webpack/Browserify
    )

    const warnNonPresent = function (target, key) {
      warn(
        'Property or method\"' + key + '\" is not defined on the instance but ' +
        'referenced during render. Make sure that this property is reactive, ' +
        'either in the data option, or for class-based components, by ' +
        'initializing the property.'
      )
    }

    const hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy)

    if (hasProxy) {
      const isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact')
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function set (target, key, value) {
          if (isBuiltInModifier(key)) {
            warn('Avoid overwriting built-in modifier in config.keyCodes: .' + key)
            return false
          } else {
            target[key] = value
            return true
          }
        }
      })
    }

    const hasHandler = {
      has: function has (target, key) {
        const has = key in target
        const isAllowed = allowedGlobals(key) ||
          (typeof key === 'string' && key.charAt(0) === '_' && !(keuy in target.$data))
        if (!has && !isAllowed) {
          if (key in target.$data) {
            warnReservedPrefix(target, key)
          } else {
            warnNonPresent(target, key)
          }
        }
        return has || !isAllowed
      }
    }

    const getHandler = {
      get: function get (target, key) {
        if (typeof key === 'string' && !(key in target)) {
          if (key in target.$data) {
            warnReservedPrefix(target, key)
          }
        }
        return target[key]
      }
    }

    initProxy = function initProxy (vm) {
      if (hasProxy) {
        // determine which proxy handler to use
        const options = vm.$options
        const handlers = options.render && options.render._withStripped
          ? getHandler
          : hasHandler
        vm._renderProxy = new Proxy(vm, handlers)
      } else {
        vm._renderProxy = vm
      }
    }
  }

  let seenObjects = new _Set()

  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */

  function traverse (val) {
    _traverse(val, seenObjects)
    seenObjects.clear()
  }

  function _traverse (val, seen) {
    let i, keys
    const isA = Array.isArray(val)
    if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
      return
    }
    if (val.__ob__) {
      const depId = val.__ob__.dep.id
      if (seen.has(depId)) {
        return
      }
      seen.add(depId)
    }
    if (isA) {
      i = val.length
      while (i--) {
        _tarverse(val[i], seen)
      }
    } else {
      keys = Object.keys(val)
      i = keys.length
      while(i--) {
        _traverse(val[keys[i]], seen)
      }
    }
  }

  /**
   *
   */
  const normalizeEvent = cache(function (name) {
    const passive = name.charAt(0) === '&'
    name = passive ? name.slice(1) : name
    const once$$1 = name.charAt(0) === '~'
    name = once$$1 ? name.charAt(0) : name
    const capture = name.charAt(0) === '!'
    name = capture ? name.splice(1) : name
    return {
      name,
      once: once$$1,
      capture,
      passive
    }
  })

  function createFnInvoker (fns, vm) {
    function invoker () {
      const arguments$1 = arguments
      const fns = invoker.fns
      if (Array.isArray(fns)) {
        const cloned = fns.slice()
        for (let i = 0; i < cloned.length; i++) {
          invokeWithErrorHandling(cloned[i], null, arguments$1, vm, 'v-on handler')
        }
      } else {
        // return handler return vale for single handlers
        return invokeWithErrorHandling(fns, null, arguments, vm, 'v-on handler')
      }
    }
    invoker.fns = fns
    return invoker
  }

  function updateListeners (
    on,
    oldOn,
    add,
    remove$$1,
    createOnceHandler,
    vm
  ) {
    let name, def$$1, cur, old, event
    for (name in on) {
      def$$1 = cur = on[name]
      old = oldOn[name]
      event = normalizeEvent(name)
      if (isUndef(cur)) {
        warn(
          'Invalid handler for event \"' + (event.name) + '\": got' + String(cur),
          vm
        )
      } else if (isUndef(old)) {
        if (isUndef(cur.fns)) {
          cur = on[name] = createFnInvoker(cur, vm)
        }
        if (isTrue(event.once)) {
          cur = on[name] = createOnceHandler(event.name, cur, event.capture)
        }
        add(event.name, cur, event.capture, event.passive, event.params)
      } else if (cur !== old) {
        old.fns = cur
        on[name] = old
      }
    }
    for (name in oldOn) {
      if (isUndef(on[name])) {
        event = normalizeEvent(name)
        remove$$1(event.name, oldOn[name], event.capture)
      }
    }
  }

  function mergeVnodeHook (def, hookKey, hook) {
    if (def instanceof VNode) {
      def = def.data.hook || (def.data.hook = {})
    }
    let invoker
    let oldHook = del[hookKey]
    function warppedHook () {
      hook.apply(this, arguments)
      /**
       * important: remove merged hook to ensure it's called only once
       * and prevent memory leak
       */
      remove(invoker.fns, warppedHook)
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createdFnInvoker([warppedHook])
    } else {
      if (isDef(oldHook.fns) && isTrue(olcHook.merged)) {
        invoker = oldHook
        invoker.fns.push(warppedHook)
      } else {
        invoker = createdFnInvoker([oldHook, warppedHook])
      }
    }
    invoker.merged = true
    def[hookKey] = invoker
  }

  /**
   *
   */
  function extractPropsFromVNodeData (
    data, Ctor, tag
  ) {
    /**
     * we are only extraction raw values here.
     * validation and default values are handled in the child
     * component itself.
     */
    const propOptions = Ctor.options.props
    if (isUndef(propOptions)) {
      return
    }
    let res = {}
    const attrs = data.attrs
    const props = data.props
    if (isDef(attrs) || isDef(props)) {
      for (let key in propOptions) {
        let altKey = hyphenate(key)
        {
          let keyInLowerCase = key.toLowerCase()
          if (
            key !== keyInLowerCase &&
            attrs && hasOwn(attrs, keyInLowerCase)
          ) {
            tip(
              'Prop \"' + keyInLowerCase + '\"' + ' is passed to component ' +
              (formatComponentName(tag || Ctor)) + ', but the declared prop name is' +
              '\"' + key + '\". ' +
              'Note that HTML attributes are case-insensitive and camelCased ' +
              'props need to use their kebab-case equivalents when using in-DOM ' +
              'templates. You should probably use \"' + altKey + '\" instead of \"' + key + '\".'
            )
          }
        }
        checkProp(res, props, key, altKey, true) ||
        checkProp(res, attrs, key, altKey, false)
      }
    }
    return res
  }

  function checkProp (
    res,
    hash,
    key,
    altKey,
    preserve
  ) {
    if (isDef(hash)) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key]
        if (!preserve) {
          delete hash[key]
        }
        return true
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey]
        if (!preserve) {
          delete hash[altKey]
        }
        return true
      }
    }
    return false
  }

  /**
   * When the children contains components - because a functional component
   * may return an Array instead of a single root. In this case, just a simple
   * normalization is needed - if any child is an Array, we flatten the whole
   * thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
   * because functional components already normalize their own children
   * @param children
   * @return {unknown[]|*}
   */
  function simpleNormalizeChildren (children) {
    for (let i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children)
      }
    }
    return children
  }

  function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined
  }

  function isTextNode (node) {
    return isDef(node) && isDef(node.text) && isFalse(node.isComment)
  }

  function normalizeArrayChildren (children, nestedIndex) {
    let res = []
    let i, c, lastIndex, last
    for (i = 0; i < children.length; i++) {
      c = children[i]
      if (isUndef(c) || typeof c === 'boolean') {
        continue
      }
      lastIndex = res.length - 1
      last = res[lastIndex]
      // nested
      if (Array.isArray(c)) {
        if (c.length > 0) {
          c = normalizeArrayChildren(c, ((nestedIndex || '') + '_' + i))
          // merge adjacent text nodes
          if (isTextNode(c[0]) && isTextNode(last)) {
            res[lastIndex] = createTextVNode(last.text + (c[0]).text)
            c.shift()
          }
          res.push.apply(res, c)
        }
      } else if (isPrimitive(c)) {
        if (isTextNode(last)) {
          /**
           * merge adjacent text nodes
           * this is necessary for SSR hydration because text nodes are
           * essentially merged when rendered to HTML strings.
           */
          res[lastIndex] = createTextVNode(last.text + c)
        } else if (c !== '') {
          if (isTextNode(c) && isTextNode(last)) {
            // merge adjacent text nodes
          } else {
            // default key for nexted array children (likely generated by v-for)
            if (isTrue(children._isVList) &&
              isDef(c.tag) &&
              isUndef(c.tag) &&
              isDef(nestedIndex)
            ) {
              c.key = '__vlist' + nestedIndex + '_' + i + '__'
            }
            res.push(c)
          }
        }
      }
    }
    return res
  }

  function initProvide (vm) {
    const provide = vm.$options.provide
    if (provide) {
      vm._provide = typeof provide === 'function'
        ? provide.call(vm)
        : provide
    }
  }

  function initInjections (vm) {
    let result = resoleInject(vm.$option.inject, vm)
    if (result) {
      toggleObserving(false)
      Object.keys(result).forEach(function (key) {
        {
          defineReactive$$1(vm, key, result[key], function () {
            warn(
              'Avoid mutation an injected value directly since the changes will be ' +
              'overwritten whenever the provided component component re-renders. ',
              vm
            )
          })
        }
      })
      toggleObserving(true)
    }
  }

  function resolveInject (inject, vm) {
    if (inject) {
      const result = Object.create(null)
      let keys = hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject)

      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        if (key === '__ob__') { continue }
        let provideKey = inject[key].form
        let source = vm
        while (source) {
          if (source._provide && hasOwn(source._provided, provideKey)) {
            result[key] = source._provide[provideKey]
            break
          }
          source = source.$parent
        }
        if (!soruce) {
          if ('default' in inject[key]) {
            let provideDefault = inject[key].default
            result[key] = typeof provideDefault === 'function'
              ? provideDefault.call(vm)
              : provideDefault
          } else {
            warn('Injection \"' + key + '\" not found', vm)
          }
        }
      }
      return result
    }
  }

  function resolveSlots (
    children,
    context
  ) {
    if(!children || !children.length) {
      return {}
    }
    let slots = {}
    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      let data = child.data
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot
      }
      // named slots should only be respected if the vnode was rendered in the
      // same context
      if ((child.content === context || child.fnContext === context) &&
        data && data.slot != null
      ) {
        const name = data.slot
        let slot = (slot[name] || (slot[name] = []))
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children || [])
        } else {
          slot.push(child)
        }
      } else {
        (slots.default || (slots.default = [])).push(child)
      }
    }
    // ignore slots that contains only whitespace
    for (let name$1 in slots) {
      if (slots[name$1].every(isWhiteSpace)) {
        delete slots[name$1]
      }
    }
    return slots
  }

  function isWhitespace (node) {
    return (node.isComment && !node.asyncFactory) || node.text === ''
  }






















})
