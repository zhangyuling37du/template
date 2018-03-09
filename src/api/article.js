
import fetch from '../utils/fetch.js'

/*标签概览信息查询*/
export function queryTagstatus() {
    return fetch({
        url: '/web/sysOverview/queryTagstatus',
        method: 'get',
        
    })
}
/*基站概览信息查询*/
export function queryBasestatus() {
    return fetch({
        url: '/web/sysOverview/queryBasestatus',
        method: 'get',
        
    })
}
/*商品概览信息查询*/
export function queryGoodsstatus() {
    return fetch({
        url: '/web/sysOverview/queryGoodsstatus',
        method: 'get',
    })
}
  /*活动概览信息查询*/
export function queryActionstatus() {
    return fetch({
        url: '/web/sysOverview/queryActionstatus',
        method: 'get',
    })
}
// 系统资源概览
export function dashboard(){
    return fetch({
        url:'/web/sysOverview/dashboard',
        method:'get'
    })
}
//实时通知 
  export function logs() {
   return fetch({
     url: '/web/sysOverview/logs',
     method:'get',
   })
 }