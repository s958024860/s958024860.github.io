/**
 * @Author: fzsong3
 * @Date: 2020/6/22 9:34
 * @Description:
 */
const Mock = require('mockjs')

Mock.setup({
  timeout: '200-600'
})

let configArray = []

const files = require.context('.', true, /\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  configArray = configArray.concat(files(key).default)
})

configArray.forEach(el => {
  for (let [ path, target ] of Object.entries(el)) {
    let protocol = path.split('|')
    Mock.mock(protocol[1], protocol[0], target)
  }
})
