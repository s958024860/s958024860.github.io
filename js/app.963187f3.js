(function(e){function t(t){for(var r,o,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)o=s[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function s(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d217e67":"6b1a10d2","chunk-2d226964":"5a48ea61","chunk-72034b37":"65287b56","chunk-a789c126":"77d908cc"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-72034b37":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d217e67":"31d6cfe0","chunk-2d226964":"31d6cfe0","chunk-72034b37":"54d08f4e","chunk-a789c126":"31d6cfe0"}[e]+".css",a=c.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===r||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],f.parentNode.removeChild(f),n(i)},f.href=a;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}a[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},"0379":function(e,t,n){"use strict";var r=n("d63b"),o=n.n(r);o.a},"1b93":function(e,t,n){"use strict";var r=n("c535"),o=n.n(r);o.a},"245a":function(e,t,n){n("99af"),n("4160"),n("4fad"),n("d3b7"),n("ac1f"),n("1276"),n("159b"),n("ddb0");var r=n("278c"),o=n("96eb");o.setup({timeout:"200-600"});var a=[],i=n("36ed");i.keys().forEach((function(e){"./index.js"!==e&&(a=a.concat(i(e).default))})),a.forEach((function(e){for(var t=0,n=Object.entries(e);t<n.length;t++){var a=r(n[t],2),i=a[0],s=a[1],c=i.split("|");o.mock(c[1],c[0],s)}}))},"281d":function(e,t,n){"use strict";var r=n("d658"),o=n.n(r);o.a},"36ed":function(e,t,n){var r={"./index.js":"245a","./keyList.js":"3b33"};function o(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="36ed"},"3b33":function(e,t,n){"use strict";n.r(t),t["default"]={"get|/key/list":{rows:[{id:"c53ac8F6-28aF-b7C0-C464-C5E426Bdee21",name:"曾伟",age:26,job:"前端工程师"},{id:"7FB1850C-690c-EeaC-f5eE-EFcEfFB9520C",name:"林娜",age:28,job:"后端工程师"},{id:"2E31fCAb-fE78-0c1F-BAfd-Dd8BEBbF390C",name:"白平",age:22,job:"UI工程师"},{id:"55875dd0-2A1F-26B3-4d4A-d7575eF69ca2",name:"沈娟",age:22,job:"后端工程师"},{id:"F1343bC5-C88e-adE1-612d-CAB3EbCFE2a2",name:"杨娜",age:26,job:"后端工程师"},{id:"202F47E5-2CcC-F6e6-c4B4-Bb6b0cCfEc18",name:"许平",age:24,job:"后端工程师"},{id:"0Debcdfc-E5CC-c095-A6A6-BE93B7c36d3A",name:"冯刚",age:23,job:"UI工程师"},{id:"46A5DfB2-99A7-6fe1-2c1a-EBbBff335Ca7",name:"廖超",age:23,job:"后端工程师"},{id:"C93BbCBc-1206-2D98-2f37-ADAde99994De",name:"姜洋",age:28,job:"测试工程师"},{id:"E394F6C6-Ad7D-7bE1-c573-FEFd6Be82A2f",name:"周秀兰",age:28,job:"测试工程师"}]}}},"44fd":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("a026"),o=n("5c96"),a=n.n(o),i=(n("0fae"),n("44fd"),n("d3b7"),n("8c4f")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"key-test"},[n("div",[e._v(" 操作下标："),n("el-input-number",{model:{value:e.targetIndex,callback:function(t){e.targetIndex=t},expression:"targetIndex"}}),n("el-button",{on:{click:e.insert}},[e._v("插入")]),n("el-button",{on:{click:e.del}},[e._v("删除")]),n("el-button",{on:{click:e.reset}},[e._v("重置")]),n("el-button",{on:{click:e.update}},[e._v("修改")])],1),e._l(e.keyList,(function(e){return n("KeyObject",{key:e.id,attrs:{"data-obj":e}})}))],2)},c=[],u=(n("a434"),n("a9e3"),n("2ef0")),l=n.n(u),d=n("ec26"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"key-object"},[n("span",[e._v("id: "+e._s(e.dataObj.id)+" | ")]),n("span",[e._v("name: "+e._s(e.dataObj.name)+" | ")]),n("span",[e._v("job: "+e._s(e.dataObj.job))])])},m=[],p={name:"KeyObject",props:{dataObj:{type:Object,default:function(){return{}}}},mounted:function(){console.log("mounted------".concat(this.dataObj.id))},updated:function(){console.log("updated------".concat(this.dataObj.id))}},b=p,h=n("2877"),g=Object(h["a"])(b,f,m,!1,null,"44b8afcf",null),v=g.exports,k=n("bc3a"),w=n.n(k),y=w.a.create({timeout:6e3,headers:{contentType:"application/json;charset=UTF-8"}});y.interceptors.response.use((function(e){var t=e.status,n=e.data;if(200!==t)return Promise.reject("error");var r=n.code,a=n.msg,i=n.data;return 200===Number(r)?i:(o["Message"].error(a||"error"),Promise.reject(a))}),(function(e){return Promise.reject(e)}));var x=y;function _(){return x.get("member/list")}function C(){return x.get("/key/list")}var j={name:"KeyTest",components:{KeyObject:v},data:function(){return{keyList:[],targetIndex:-1,initList:[]}},created:function(){this.getList()},methods:{getList:function(){var e=this;C().then((function(t){var n=t.data;e.keyList=n.rows,e.initList=l.a.cloneDeep(n.rows)}))},insert:function(){this.keyList.splice(Number(this.targetIndex),1)},del:function(){this.keyList.splice(Number(this.targetIndex),1)},reset:function(){this.keyList=l.a.cloneDeep(this.initList)},update:function(){var e={id:Object(d["a"])(),name:"sfz",age:30,job:"插入工程师"};this.keyList.splice(this.targetIndex,1,e)}}},O=j,N=Object(h["a"])(O,s,c,!1,null,"66b48ac2",null),E=N.exports,L=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form-table-test"},[n("FormTest")],1)},T=[],$=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"form-test"},[n("el-form",{ref:"form",staticClass:"form",attrs:{model:e.form,rules:e.rules}},[n("el-form-item",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.form.orderList,stripe:""}},[n("el-table-column",{attrs:{prop:"consigneeName",label:"收货人姓名"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-form-item",{attrs:{label:"",prop:"orderList."+t.$index+".consigneeName",rules:e.rules.orderList.consigneeName}},[n("el-popover",{attrs:{placement:"bottom-start",title:"",trigger:"manual",width:"800"},model:{value:t.row.visible,callback:function(n){e.$set(t.row,"visible",n)},expression:"scope.row.visible"}},[n("el-input",{ref:"member-input_"+t.$index,attrs:{slot:"reference",placeholder:"姓名"},nativeOn:{keydown:[function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"esc",27,n.key,["Esc","Escape"])?null:(n.stopPropagation(),n.preventDefault(),e.displayNoneMedicineList(t.row))},function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"tab",9,n.key,"Tab")?null:e.displayNoneMedicineList(t.row)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"])?null:(t.stopPropagation(),t.preventDefault(),e.navigateRow("next"))},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"])?null:(t.stopPropagation(),t.preventDefault(),e.navigateRow("prev"))}],keyup:[function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.memberSearch(t.row)},function(n){return function(n){e.debounceSearch(n,t.row)}(n)}],paste:function(n){return function(n){e.debounceSearch(n,t.row)}(n)}},slot:"reference",model:{value:t.row.consigneeName,callback:function(n){e.$set(t.row,"consigneeName",n)},expression:"scope.row.consigneeName"}}),n("Member",{attrs:{members:e.members,"current-row-index":e.currentRowIndex},on:{setMemberInfo:function(n){e.setMemberInfo(t.row,n)}}})],1)],1)]}}])}),n("el-table-column",{attrs:{prop:"consigneeSex",label:"收货人性别"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.consigneeSex||"--"))])]}}])}),n("el-table-column",{attrs:{prop:"consigneePhoneNo",label:"收货人电话"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.consigneePhoneNo||"--"))])]}}])}),n("el-table-column",{attrs:{prop:"consigneeAddr",label:"收货人地址"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.consigneeAddr||"--"))])]}}])}),n("el-table-column",{attrs:{prop:"consignorName",label:"发货人姓名"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.consignorName||"--"))])]}}])}),n("el-table-column",{attrs:{prop:"consignorPhoneNo",label:"发货人电话"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.consignorPhoneNo||"--"))])]}}])}),n("el-table-column",{attrs:{prop:"consignorAddr",label:"发货人地址"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.consignorAddr||"--"))])]}}])}),n("el-table-column",{attrs:{prop:"remark",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-input",{nativeOn:{keyup:function(n){return!n.type.indexOf("key")&&e._k(n.keyCode,"enter",13,n.key,"Enter")?null:e.enterRemark(t.$index)}},model:{value:t.row.remark,callback:function(n){e.$set(t.row,"remark",n)},expression:"scope.row.remark"}})]}}])}),n("el-table-column",{attrs:{prop:"operation",label:"",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(n){return e.delOrder(t.$index)}}})]}}])},[n("template",{slot:"header"},[n("i",{staticClass:"el-icon-circle-plus-outline",staticStyle:{cursor:"pointer"},on:{click:function(t){return e.addOrder()}}})])],2)],1)],1)],1),n("div",{staticClass:"operation"},[n("el-button",{attrs:{type:"primary"},on:{click:e.sendBatch}},[e._v("批量发货")])],1)],1)},R=[],S=(n("4de4"),n("caad"),n("b0c0"),n("2532"),n("96cf"),n("1da1")),A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"member"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.members,"highlight-current-row":"",height:"295","row-class-name":e.tableRowClassName},on:{"row-click":e.handleRowClick}},[n("el-table-column",{attrs:{prop:"name",label:"姓名","min-width":"80","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{prop:"sex",label:"性别","min-width":"80","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{prop:"phoneNo",label:"手机号","min-width":"120","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{prop:"address",label:"住址","min-width":"80","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{prop:"firstOrderTime",label:"首次订单时间","min-width":"150","show-overflow-tooltip":""}}),n("el-table-column",{attrs:{prop:"recentOrderTime",label:"最近订单时间","min-width":"150","show-overflow-tooltip":""}})],1)],1)},I=[],P={name:"Member",props:{members:{type:Array,default:function(){return[]}},currentRowIndex:{type:Number,default:-1}},methods:{tableRowClassName:function(e){var t=e.rowIndex;return t===this.currentRowIndex?"active-row":""},handleRowClick:function(e){e&&this.$emit("setMemberInfo",e)}}},B=P,F=(n("281d"),Object(h["a"])(B,A,I,!1,null,null,null)),D=F.exports,M={originConsigneeName:"",consigneeCode:"",consigneeName:"",consigneeSex:"",consigneePhoneNo:"",consigneeAddr:"",consignorName:"Nancy",consignorPhoneNo:"12345678923",consignorAddr:"安道尔",remark:"",visible:!1},U={name:"FormTest",components:{Member:D},data:function(){return{members:[],currentRowIndex:-1,form:{orderList:[l.a.cloneDeep(M)]},rules:{orderList:{consigneeName:[{required:!0,message:"收货人不能为空",trigger:"blur"}],remark:[]}}}},methods:{sendBatch:function(){var e=this;this.$refs["form"].validate((function(t){t?e.$message.success("成功发送".concat(e.form.orderList.length,"条订单")):e.$message.error("请检查表单项")}))},enterRemark:function(e){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e!==t.form.orderList.length-1){n.next=5;break}return n.next=3,t.addOrder();case 3:n.next=9;break;case 5:return n.next=7,t.$nextTick();case 7:return n.next=9,t.focusConsigneeNameName(e+1);case 9:case"end":return n.stop()}}),n)})))()},addOrder:function(){this.form.orderList.push(l.a.cloneDeep(M)),this.focusConsigneeNameName(this.form.orderList.length-1)},focusConsigneeNameName:function(e){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$nextTick();case 2:t.$refs["member-input_".concat(e)].focus();case 3:case"end":return n.stop()}}),n)})))()},delOrder:function(e){1!==this.form.orderList.length?this.form.orderList.splice(e,1):this.$message.info("至少保存一条订单")},setMemberInfo:function(e,t){var n=this;return Object(S["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n.displayNoneMedicineList(e),n.$set(e,"consigneeName",t.name),n.$set(e,"originConsigneeName",t.name),n.$set(e,"consigneeCode",t.id),n.$set(e,"consigneeSex",t.sex),n.$set(e,"consigneePhoneNo",t.phoneNo),n.$set(e,"consigneeAddr",t.address),r.next=9,n.$nextTick();case 9:n.clearValidate();case 10:case"end":return r.stop()}}),r)})))()},displayNoneMedicineList:function(e){var t=this;this.$set(e,"consigneeName",e.consigneeCode?e.originConsigneeName:""),setTimeout((function(){t.members=[],t.currentRowIndex=-1,t.$set(e,"visible",!1)}),250)},navigateRow:function(e){var t;(null===(t=this.members)||void 0===t?void 0:t.length)&&("next"===e?(this.currentRowIndex+=1,this.currentRowIndex===this.members.length&&(this.currentRowIndex=0)):(this.currentRowIndex-=1,this.currentRowIndex<0&&(this.currentRowIndex=this.members.length-1)))},debounceSearch:function(e,t){[37,38,39,40,9,13,27].includes(e.keyCode)||this.memberSearch(t)},memberSearch:function(e){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!(e.visible&&t.currentRowIndex<t.members.length&&t.currentRowIndex>-1)){n.next=5;break}return n.next=3,t.setMemberInfo(e,t.members[t.currentRowIndex]);case 3:n.next=13;break;case 5:if(!e.consigneeName){n.next=13;break}return t.$set(e,"visible",!0),n.next=9,_();case 9:r=n.sent,console.log(r),t.members=r.filter((function(t){return t.name.includes(e.consigneeName)})),t.currentRowIndex=-1;case 13:case"end":return n.stop()}}),n)})))()},clearValidate:function(){this.$refs["form"].clearValidate()}}},K=U,V=(n("1b93"),Object(h["a"])(K,$,R,!1,null,"388d604d",null)),Y=V.exports,q={name:"FormTableTest",components:{FormTest:Y}},X=q,H=(n("0379"),Object(h["a"])(X,L,T,!1,null,"ae9fd218",null)),J=H.exports,z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("ul",[n("li",[n("router-link",{attrs:{to:"/test"}},[e._v("测试")])],1),n("li",[n("router-link",{attrs:{to:"/formTableTest"}},[e._v("表格嵌套表单")])],1),n("li",[n("router-link",{attrs:{to:"/keyTest"}},[e._v("key值测试")])],1),n("li",[n("router-link",{attrs:{to:"/video-tee3"}},[e._v("tee3音视频测试")])],1),n("li",[n("router-link",{attrs:{to:"/touch-scale"}},[e._v("双指缩放图片")])],1),n("li",[n("router-link",{attrs:{to:"/component-name-test"}},[e._v("组件命名测试")])],1),n("li",[n("router-link",{attrs:{to:"/css-var"}},[e._v("css变量交互")])],1)])])},G=[],Q={name:"Home"},W=Q,Z=Object(h["a"])(W,z,G,!1,null,"fd8b9cbe",null),ee=Z.exports;r["default"].use(i["a"]);var te=[{path:"/",redirect:"/home"},{path:"/home",name:"home",component:ee},{path:"/test",name:"test",component:function(){return n.e("chunk-2d217e67").then(n.bind(null,"c961"))}},{path:"/formTableTest",name:"formTableTest",component:J},{path:"/keyTest",name:"keyTest",component:E},{path:"/touch-scale",name:"touchScale",component:function(){return n.e("chunk-a789c126").then(n.bind(null,"08b2"))}},{path:"/component-name-test",name:"ComponentNameTest",component:function(){return n.e("chunk-2d226964").then(n.bind(null,"e8fa"))}},{path:"/css-var",name:"cssVar",component:function(){return n.e("chunk-72034b37").then(n.bind(null,"6f56"))}}],ne=new i["a"]({mode:"hash",routes:te}),re=ne,oe=(n("245a"),n("48cd")),ae=n.n(oe),ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},se=[],ce={name:"App",created:function(){document.addEventListener("mousedown",(function(e){console.log(e.pageX,e.pageY);var t=document.body;t.style.setProperty("--pageX",e.pageX),t.style.setProperty("--pageY",e.pageY)}))}},ue=ce,le=(n("034f"),Object(h["a"])(ue,ie,se,!1,null,null,null)),de=le.exports;r["default"].component("ButtonCounter",{data:function(){return{count:0}},template:'<button v-on:click="count++">You clicked me {{ count }} times.</button>'}),r["default"].use(ae.a),r["default"].use(a.a),r["default"].config.productionTip=!1,r["default"].prototype.axios=x,new r["default"]({router:re,render:function(e){return e(de)}}).$mount("#app")},"85ec":function(e,t,n){},c535:function(e,t,n){},d63b:function(e,t,n){},d658:function(e,t,n){}});
//# sourceMappingURL=app.963187f3.js.map