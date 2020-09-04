/**
 * @Author: fzsong3
 * @Date: 2020/8/5 15:00
 * @Description: count
 */

// 输出 0 1 2 3 4 5

// for (var i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(new Date(), i)
//   }, 1000)
// }


// for (var i = 0; i < 5; i++) {
//   (function (i) {
//     setTimeout(() => {
//       console.log(new Date(), i)
//     }, 1000)
//   })(i)
// }

// function f (i) {
//   setTimeout(() => {
//     console.log(new Date(), i)
//   }, 1000)
// }
//
// for (var i = 0; i < 5; i++) {
//   f(i)
// }

// for (let i = 0; i < 5; i++) {
//   setTimeout(() => {
//     console.log(new Date(), i)
//   }, 1000 * i)
// }

// function f(i) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(new Date(), i)
//       resolve()
//     }, 1000)
//   })
// }
//
// (async function () {
//   for (var i = 0; i < 5; i++) {
//     await f(i)
//   }
// })()


// const arr = [1,2,4,5,6,7]
// for (var i = 0, arrlen = arr.length; i < arrlen; i++) {
//   console.log(arr[i])
// }

// const obj = {
//   name: 'sfz',
//   age: 18
// }
//
// console.log('name' in obj)

// const arr = [1,2,4,5,6,7]
// console.log(arr.slice(-1))
// console.log(arr)

// const arr = [1,2,4,5,6,7]
// // arr.splice(3)
// arr.length = 3
// console.log(arr)

// const arr = [1,2,4,5,6,7]
// const arr5 = arr[5]
// console.log(arr5)
// arr[5] = 10
// console.log(arr)

function getScreen (e) {
  let t = null
  return (t = 5), t
}

console.log(getScreen(5))
