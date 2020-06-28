/**
 * @Author: fzsong3
 * @Date: 2020/6/22 9:48
 * @Description:
 */
import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
  timeout: 6000,
  headers: { 'contentType': 'application/json;charset=UTF-8' }
})

// todo
// instance.interceptors.request.use(config => {
//   return config
// })

instance.interceptors.response.use(
  response => {
    const status = response.status
    const resData = response.data
    if (status !== 200) {
      return Promise.reject('error')
    } else {
      const { code, msg, data } = resData
      if (Number(code) === 200) {
        return data
      } else {
        // 错误消息统一处理
        Message.error(msg || 'error')
        return Promise.reject(msg)
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
