## html

```html
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
```

## scss
```scss
$box-width: 300px;
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
```
