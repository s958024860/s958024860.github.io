/**
 * @Author: fzsong3
 * @Date: 2020/6/22 9:55
 * @Description:
 */
import httpInstance from './httpInstance'
export * from './member'

export function getKeyList () {
  return httpInstance.get('/key/list')
}
