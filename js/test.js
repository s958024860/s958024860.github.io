/**
 * @Author: fzsong3
 * @Date: 2020/9/2 9:07
 * @Description:
 */
const arr = [ '其他', 1, 3, 4, 5, 6, 7 ]

let index = arr.indexOf('其他')

~index && arr.splice(index, 1) && arr.push('其他11')
