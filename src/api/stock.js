 import fetch from '../utils/fetch.js'
 //  设备管理-查询设备数量
 export function queryDevSumNum() {
   return fetch({
     url: '/dev/queryDevSumNum',
     method: 'get'
   })
 }

 /*标签关键字查询*/
 export function queryList(keyWords, a, b) {
   return fetch({
     url: '/tag/queryList?keyWords=' + keyWords + '&pageNumber=' + a + '&pageSize=' + b,
     method: 'get'
   })
 }
 /*批量删除标签*/
 export function deleteByTagIdList(data) {
   return fetch({
     url: '/tag/deleteByTagIdList',
     method: 'post',
     data
   })
 }
 /*标签管理-查询标签详细信息*/

 export function query(id) {
   return fetch({
     url: '/tag/query?id=' + id,
     method: 'get'
   })
 }
 /*标签管理-删除标签*/

 export function deleteById(data) {
   return fetch({
     url: '/tag/deleteById',
     method: 'post'
     data
   })
 }
 /*基站关键字查询*/
 /*GET */
 export function BaseQueryList(keyWords, a, b) {
   return fetch({
     url: '/base/queryList?keyWords=' + keyWords + '&pageNumber=' + a + '&pageSize=' + b,
     method: 'get'
   })
 }
 /*基站详细信息*/
 export function BaseQuery(id) {
   return fetch({
     url: '/base/query?id=' + id,
     method: 'get'
   })
 }
