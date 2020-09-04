/**
 * @Author: fzsong3
 * @Date: 2020/8/7 9:44
 * @Description: 自定义的vue组件
 */

// 进行umd支持 amd/cmd/commonjs
import KeyTest from "../src/pages/KeyTest";
import {merge} from "less/lib/less/utils";

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
        merge(toVal, fromVal)
      }
    }
  }







})
