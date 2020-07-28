<!--
 * @Author: fzsong3
 * @Date: 2020/7/28 9:59
 * @Description:
-->
<template>
  <div class="text-overflow">
    <p>方案一： 添加hover状态的title，超出部分实现...</p>
    <p>方案二： 添加hover状态的title，超出部分hover状态下实现滚动动画</p>
    <p>demo</p>
    <div class="text-box" title="你好，我是一个正经的多文字，超出的部分我会省略，鼠标放上去会显示全文字。">
      <span class="text ellipsis">
        你好，我是一个正经的多文字，超出的部分我会省略，鼠标放上去会显示全文字。
      </span>
    </div>
    <div class="text-box" title="你好，我是一个正经的多文字，超出的部分我会滚动，不信鼠标放上去你看看。">
      <span class="text scroll">
        你好，我是一个正经的多文字，超出的部分我会滚动，不信鼠标放上去你看看。
      </span>
    </div>
    <markdown-it-vue style="margin-top: 50px;" class="markdown-body" :content="content"></markdown-it-vue>
  </div>
</template>

<script>

import textOverflow from '../assets/markdown/text-overflow.md'

export default {
  name: 'TextOverflow',
  data () {
    return {
      content: textOverflow,
    }
  },
}
</script>

<style lang="scss" scoped>

  $box-width: 300px;

  .text-overflow {
    margin: 100px 0 0 100px;
    .text-box {
      width: $box-width;
      line-height: 30px;
      color: #a5cee1;
      overflow: hidden;
      margin: 50px 0 0 50px;
      background-color: #2B3A42;
      cursor: pointer;
      position: relative;
      .text {
        white-space: nowrap;
        &.ellipsis {
          display: block;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &.scroll {
          display: inline-block;
          &:hover {
            animation: move 2.5s infinite alternate linear;
          }
        }
      }
    }

    @keyframes move {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(calc(-100% + #{$box-width}), 0);
      }
    }
  }

</style>
