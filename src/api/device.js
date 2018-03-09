 
import fetch from '../utils/fetch.js'
//  设备管理-查询设备数量
export function queryDevSumNum(){
    return fetch({
        url: '/dev/queryDevSumNum',
        method: 'get'
    })
}

/*标签关键字查询*/
export function queryList(keyWords,a,b,c,d){
    return fetch({
        url: '/tag/queryList?keyWords='+keyWords+'&pageNumber='+a+'&pageSize='+b+'&bindStatus='+c+'&tagStatus='+d,
        method: 'get'
    })
}

/*批量删除标签*/  
export function deleteByTagIdList(data) {
    return fetch({
        url:'/tag/deleteByTagIdList',
        method:'post',
        data
    })
}
/*标签管理-查询标签详细信息*/

export function query(id){
    return fetch({
        url:'/tag/query?id='+id,
        method: 'get'
    })
}
/*标签管理-删除标签*/
export function deleteById(data){
    return fetch({
        url:'/tag/deleteById',
        method:'post',
         data
    })
}
// 标签状态筛选  
export function queryByTagStatus(bindStatus,tagStatus,a,b){
    return fetch({
        url: '/tag/queryByTagStatus?bindStatus='+bindStatus+'&tagStatus='+tagStatus+'&pageNumber='+a+'&pageSize='+b,
        method: 'get'
    })
}
// 基站管理-查询基站下标签信息
export function queryByTagBase(tagBase,a,b){
    return fetch({
        url: '/tag/queryByTagBase?tagBase='+tagBase+'&pageNumber='+a+'&pageSize='+b,
        method: 'get'
    })
}


/*基站关键字查询*/
 /*GET */
 export function BaseQueryList(a,b){
    return fetch({
        url:'/dev/base/list?pageNumber='+a+'&pageSize='+b,
        method: 'get'
    })
}
export function imageInfo(tagId,deviceId){
    console.log('/user/imageInfo/'+tagId+'/' +deviceId)
    return fetch({
        url:'/user/imageInfo/'+tagId+'/' +deviceId,
        method: 'get',
    }) 
}
//  DELETE 开发完成  基站管理-删除基站 
  export function  BaseDelete(data) {
   return fetch({
     url: '/dev/base/delete',
     method: 'delete',
     data
   })
 }
// GET 基站管理-根据基站id查询基站信息
export function BaseId(baseId){
    return fetch({
        url:'/dev/base/'+baseId,
        method: 'get',
    }) 
}
// PUT 基站管理-修改基站信息
 export function BaseUpdate(data) {
   return fetch({
     url: '/dev/base/update',
     method:'put',
     data
   })
 }
/* 手持机管理-分页列表查询*/
 export function handsetlist(a,b) {
   return fetch({
     url: '/dev/handset/list?pageNumber='+a+'&pageSize='+b,
     method:'get',
   })
 }
 /* 手持机管理-新增手持机*/
  export function  handsetAdd(data) {
   return fetch({
     url: '/dev/handset/add',
     method: 'post',
     data
   })
 }
 /* 手持机管理-手持机授权*/
  export function  handsetAuthorized(data) {
   return fetch({
     url: '/dev/handset/authorized',
     method:'put',
     data
   })
 }
 /*手持机管理-删除手持机*/
  export function  handsetDelete(data) {
   return fetch({
     url: '/dev/handset/delete ',
     method: 'post',
     data
   })
 }


