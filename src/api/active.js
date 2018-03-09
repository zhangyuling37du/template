 
import fetch from '../utils/fetch.js'
/*新增活动*/
export function addAction(data) {
    return fetch({
        url: '/web/actionManage/addAction',
        method:'post',
        data
    })
}
// 活动概览关键字查询
export function activeTest(keyWords,a,b,c,d){
    return fetch({
        url:'/web/actionManage/querykeyWordsList?keyWords='+keyWords+'&pageNumber='+a+'&pageSize='+b+'&actionStart='+c+'&actionEnd='+d,
        method:'get'
    })
}

//   查询活动详情
export function queryByActionId(actionId){
    return fetch({
        url:'/web/actionManage/queryByActionId?actionId='+actionId,
        method:'get'
    })
}
//   删除活动
export function deleteActionInfo(data) {
    return fetch({
        url: '/web/actionManage/deleteActionInfo',
        method:'post',
        data
    })
}
// POST  修改活动
export function updateActionInfo(data) {
    return fetch({
        url: '/web/actionManage/updateActionInfo',
        method:'post',
        data
    })
}
//  根据标签类型获取模板缩略图
export function getTempletPic(a,b){
    return fetch({
        url:'/web/actionManage/getTempletPic?actionTagtype='+a+'&actionScrtype='+b,
        method:'get'
    })
}