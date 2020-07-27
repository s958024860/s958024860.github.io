<!--
 * @Author: fzsong3
 * @Date: 2020/7/24 15:55
 * @Description:
-->
<template>
  <div class="css-var">
    <ul class="tip">
      vue 中 通过 js 控制css样式 一般两种  style、class
      <li>用过模板字符串的方式写在style里 如 <strong class="primary">:style="`height: ${height}`;"</strong> </li>
      <li>通过变量状态控制class： 如 <strong class="primary">:class="{ read: isRead }"</strong></li>
    </ul>
    <ul>
      <markdown-it-vue class="md-body" :content="content"></markdown-it-vue>
      如今有了一种css变量的支持丰富增加了js交互，使之更加灵活
      <div :style="`--textHeight: ${height};`" class="test-box">test-height</div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CssVar',
  data () {
    return {
      height: 40,
      content: '<div :style="`--textHeight: ${height};`" class="test-box">test-height</div>'
    }
  },
}
</script>

<style lang="scss" scoped>
  .primary {
    color: red;
  }
  .css-var {
    background-color: #ffffff;
  }
  .test-box {
    height: calc(var(--textHeight) * 1px);
    line-height: calc(var(--textHeight) * 1px);
    background-color: bisque;
  }
</style>
