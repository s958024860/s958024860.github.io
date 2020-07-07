## 源代码

`<img id="image" src="1.png">`

```ecmascript 6
const eleImg = document.querySelector('#image')
const store = { scale: 1 }

// 缩放事件处理 start 获取第一个指头的信息
document.addEventListener('touchstart', function(event) {
  const touches = event.touches
  
  const event1 = touches[0]
  const event2 = touches[1]
  store.pageX = event1.pageX
  store.pageY = event1.pageY

  event.preventDefault()
  
  if (event2) {
    store.pageX2 = event2.pageX    
    store.pageY2 = event2.pageY    
  }
  
  store.moveable = true

})

document.addEventListener('touchmove', function (event) {
    if (!store.moveable) {
        return;
    }

    event.preventDefault();

    const touches = event.touches;
    const events = touches[0];
    const events2 = touches[1];
    // 双指移动
    if (events2) {
        // 第2个指头坐标在touchmove时候获取
        if (!store.pageX2) {
            store.pageX2 = events2.pageX;
        }
        if (!store.pageY2) {
            store.pageY2 = events2.pageY;
        }

        // 获取坐标之间的举例
        const getDistance = function (start, stop) {
            return Math.hypot(stop.x - start.x, stop.y - start.y);
        };
        // 双指缩放比例计算
        const zoom = getDistance({
            x: events.pageX,
            y: events.pageY
        }, {
            x: events2.pageX,
            y: events2.pageY
        }) /
        getDistance({
            x: store.pageX,
            y: store.pageY
        }, {
            x: store.pageX2,
            y: store.pageY2
        });
        // 应用在元素上的缩放比例
        let newScale = store.originScale * zoom;
        // 最大缩放比例限制
        if (newScale > 3) {
            newScale = 3;
        }
        // 记住使用的缩放值
        store.scale = newScale;
        // 图像应用缩放效果
        eleImg.style.transform = 'scale('+ newScale +')';
    }
});

document.addEventListener('touchend', function () {
    store.moveable = false;

    delete store.pageX2;
    delete store.pageY2;
});
document.addEventListener('touchcancel', function () {
    store.moveable = false;

    delete store.pageX2;
    delete store.pageY2;
});
```
