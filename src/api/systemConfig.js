import fetch from '../utils/fetch.js'
/*获取商品属性列表*/

 export function queryList(a,b) {
   return fetch({
     url: 'sys/sysSetup/queryList?pageNumber='+a+'&pageSize='+b ,
     method: 'get'
   })
 }
//  设置商品属性不启用
 export function setIsstart(data) {
   return fetch({
     url: '/sys/sysSetup/setIsstart',
     method: 'post',
     data
   })
 }
 //  更新商品属性
  export function updata(data) {
   return fetch({
     url: '/sys/sysSetup/update',
     method: 'post',
     data
   })
 }
//GET /sys/sysSetup/addAttribute 商品配置-新增属性
 export function addAttribute(id) {
   return fetch({
     url: '/sys/sysSetup/addAttribute?id='+id,
     method:'get',
   })
 }
 // 新增基站设置
   export function  configAdd(data) {
   return fetch({
     url: '/sys/sysSetup/baseConfig/add',
     method: 'post',
     data
   })
 }
 // 新增基站修改
 export function  configUpdate(data) {
   return fetch({
     url: '/sys/sysSetup/baseConfig/update',
     method:'put',
     data
   })
 }
//  新增基站删除
export function  configDelete(data) {
   return fetch({
     url: '/sys/sysSetup/baseConfig/delete',
     method:'delete',
     data
   })
 }

  // 新增基站分页查询
  export function configlist(a,b) {
   return fetch({
     url: '/sys/sysSetup/baseConfig/list?pageNumber='+a+'&pageSize='+b,
     method:'get',
   })
 }
 /* 用户管理-用户登录*/
  export function sysLogin(data) {
   return fetch({
     url: '/sys/user/sysLogin',
     method: 'post',
     data
   })
 }
 //数据同步
 //POST    基站配置-数据同步-测试连接
 export function checkConnection(data) {
   return fetch({
     url: '/sys/sysSetup/dataSync/checkConnection',
     method: 'post',
     data
   })
 }
 //  基站配置-数据同步-测试sql查询
  export function checkSql(data) {
   return fetch({
     url: '/sys/sysSetup/dataSync/checkSql',
     method: 'post',
     data
   })
 }
 //  基站配置-数据同步-保存配置
 export function saveConfig(data) {
   return fetch({
     url: '/sys/sysSetup/dataSync/saveConfig',
     method: 'post',
     data
   })
 }