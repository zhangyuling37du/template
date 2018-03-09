 
import fetch from '../utils/fetch.js'
// 商品信息关键字查询
export function querykeyWordsList(keyWords,a,b,c){
    return fetch({
        url:'/goods/querykeyWordsList?keyWords='+keyWords+'&pageNumber='+a+'&pageSize='+b+'&goodStatus='+c,
        method:'get'
    })
}

// 获取商品属性列名-展示页
export function queryColumnName( ){
    return fetch({
        url:'/goods/queryColumnName',
        method:'get'
    })
}
// 获取商品管理列表
export function queryList(a,b){
    return fetch({
        url:'/goods/queryList?pageNumber='+a+'&pageSize='+b,
        method:'get'
    })
}
// 获取商品详情
export function queryByGoodCode(goodCode) { 
    return fetch({
        url: '/goods/queryByGoodCode?goodCode='+goodCode,
        method: 'get'
    })
}
// 获取商品属性列名-详情页
export function queryAllColumnName() {
    return fetch({
        url: '/goods/queryAllColumnName',
        method: 'get'
    })
}
// 新增商品
 export function addNewGood(data) {
    return fetch({
        url: '/goods/addNewGood',
        method:'post',
        data
    })
}
//  点击选择模板接口
export function getTemplets(tagId) {
    return fetch({
        url: '/goods/getTemplets?tagId='+tagId,
        method: 'get'
    })
}

//  商品绑定
 export function goodBindTag(data) {
    return fetch({
        url: '/goods/goodBindTag',
        method: 'post',
        data
    })
}
//   更新商品
 export function updateGoodInfo(data) {
    return fetch({
        url: '/goods/updateGoodInfo',
        method: 'post',
        data
    })
}
//    解除绑定
 export function unBindTag(data) {
    return fetch({
        url: '/goods/unBindTag',
        method: 'post',
        data
    })
}
//   商品删除
 export function deleteGoodInfo(data) {
    return fetch({
        url: '/goods/deleteGoodInfo',
        method: 'post',
        data
    })
}
//  商品解绑-根据商品ID解绑所有该商品绑定标签
 export function unBindTagByGoodCode(data) {
    return fetch({
        url: '/goods/unBindTagByGoodCode',
        method: 'post',
        data
    })
}
//POST /goods/addNewGoodtest 商品批量删除
 export function deleteGoodList(data) {
    return fetch({
        url: '/goods/addNewGoodtest',
        method: 'post',
        data
    })
}