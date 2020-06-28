/**
 * @Author: fzsong3
 * @Date: 2020/6/28 16:51
 * @Description:
 */
import httpInstance from './httpInstance'

export function getMemberList () {
  return httpInstance.get('member/list')
}
