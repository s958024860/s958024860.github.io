/**
 * @Author: fzsong3
 * @Date: 2020/6/22 9:48
 * @Description:
 */
import axios from 'axios'

const instance = axios.create({
  timeout: 6000,
  headers: { 'contentType': 'application/json;charset=UTF-8' }
})

// todo
// axios.interceptors.request.use(config => {
//   return config
// })

// todo
// axios.interceptors.response.use(
//   response => {
//   },
//   error => {
//   }
// )

export default instance
