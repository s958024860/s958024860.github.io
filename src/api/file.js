/**
 * @Author: fzsong3
 * @Date: 2020/10/10 9:21
 * @Description: 文件处理
 */
import httpInstance from './httpInstance'

/**
 * 获取文件流
 * @param fileName 文件名
 * @return {Promise<AxiosResponse<any>>}
 */
export function fileBlob (fileName) {
  return httpInstance.post(
    '/fileBlob',
    { fileName },
    {
      responseType: 'blob',
      // headers: { 'content-type': 'application/x-www-form-urlencoded' } // todo
    })
}
