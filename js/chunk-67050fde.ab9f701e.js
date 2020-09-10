(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67050fde"],{"08b2":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"touch-scale"},[n("span",[e._v("缩放图片")]),n("img",{attrs:{id:"img",src:a("ba5e")}}),n("span",[e._v("源码展示")]),n("markdown-it-vue",{staticClass:"md-body",attrs:{id:"write",content:e.content}})],1)},o=[],s=(a("4057"),a("9d3e")),r=a.n(s),i={name:"TouchScale",data:function(){return{content:r.a,fileList:[]}},mounted:function(){var e=document.querySelector("#image"),t={scale:1};document.addEventListener("touchstart",(function(e){var a=e.touches,n=a[0],o=a[1];t.pageX=n.pageX,t.pageY=n.pageY,e.preventDefault(),o&&(t.pageX2=o.pageX,t.pageY2=o.pageY),t.moveable=!0})),document.addEventListener("touchmove",(function(a){if(t.moveable){a.preventDefault();var n=a.touches,o=n[0],s=n[1];if(s){t.pageX2||(t.pageX2=s.pageX),t.pageY2||(t.pageY2=s.pageY);var r=function(e,t){return Math.hypot(t.x-e.x,t.y-e.y)},i=r({x:o.pageX,y:o.pageY},{x:s.pageX,y:s.pageY})/r({x:t.pageX,y:t.pageY},{x:t.pageX2,y:t.pageY2}),c=t.originScale*i;c>3&&(c=3),t.scale=c,e.style.transform="scale("+c+")"}}})),document.addEventListener("touchend",(function(){t.moveable=!1,delete t.pageX2,delete t.pageY2})),document.addEventListener("touchcancel",(function(){t.moveable=!1,delete t.pageX2,delete t.pageY2}))},methods:{}},c=i,l=a("2877"),p=Object(l["a"])(c,n,o,!1,null,"3273a14a",null);t["default"]=p.exports},4057:function(e,t,a){var n=a("23e7"),o=Math.hypot,s=Math.abs,r=Math.sqrt,i=!!o&&o(1/0,NaN)!==1/0;n({target:"Math",stat:!0,forced:i},{hypot:function(e,t){var a,n,o=0,i=0,c=arguments.length,l=0;while(i<c)a=s(arguments[i++]),l<a?(n=l/a,o=o*n*n+1,l=a):a>0?(n=a/l,o+=n*n):o+=a;return l===1/0?1/0:l*r(o)}})},4719:function(e,t,a){"use strict";e.exports=function(e,t){return t||(t={}),e=e&&e.__esModule?e.default:e,"string"!==typeof e?e:(t.hash&&(e+=t.hash),t.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(e)?'"'.concat(e,'"'):e)}},"9d3e":function(e,t,a){var n=a("4719"),o=a("ba5e"),s=n(o),r="## 源代码 `<img id=img src="+s+" />` ```ecmascript 6 const eleImg = document.querySelector('#image') const store = { scale: 1 } // 缩放事件处理 start 获取第一个指头的信息 document.addEventListener('touchstart', function(event) { const touches = event.touches const event1 = touches[0] const event2 = touches[1] store.pageX = event1.pageX store.pageY = event1.pageY event.preventDefault() if (event2) { store.pageX2 = event2.pageX store.pageY2 = event2.pageY } store.moveable = true }) document.addEventListener('touchmove', function (event) { if (!store.moveable) { return; } event.preventDefault(); const touches = event.touches; const events = touches[0]; const events2 = touches[1]; // 双指移动 if (events2) { // 第2个指头坐标在touchmove时候获取 if (!store.pageX2) { store.pageX2 = events2.pageX; } if (!store.pageY2) { store.pageY2 = events2.pageY; } // 获取坐标之间的举例 const getDistance = function (start, stop) { return Math.hypot(stop.x - start.x, stop.y - start.y); }; // 双指缩放比例计算 const zoom = getDistance({ x: events.pageX, y: events.pageY }, { x: events2.pageX, y: events2.pageY }) / getDistance({ x: store.pageX, y: store.pageY }, { x: store.pageX2, y: store.pageY2 }); // 应用在元素上的缩放比例 let newScale = store.originScale * zoom; // 最大缩放比例限制 if (newScale > 3) { newScale = 3; } // 记住使用的缩放值 store.scale = newScale; // 图像应用缩放效果 eleImg.style.transform = 'scale('+ newScale +')'; } }); document.addEventListener('touchend', function () { store.moveable = false; delete store.pageX2; delete store.pageY2; }); document.addEventListener('touchcancel', function () { store.moveable = false; delete store.pageX2; delete store.pageY2; }); ``` ";e.exports=r},ba5e:function(e,t){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=chunk-67050fde.ab9f701e.js.map