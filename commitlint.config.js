/**
 * @Author: fzsong3
 * @Date: 2020/7/9 14:04
 * @Description: commitlint配置项
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules:{
    'type-enum': [
      2,
      'always',
      [
        'sfz',
        'chore', // 构建
        'merge', // 合并
        'add', // 新增
        'update', // 更新功能
        'delete', // 删除
        'feat', // 新功能
        'fix', // 修复BUG
        'docs', // 文档
        'style', // 样式
        'refactor', // 重构
        'test' // 测试
      ]
    ],
    'subject-case': [0,'never',['lower-case']]
  }
}
