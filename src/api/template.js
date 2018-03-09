import fetch from '../utils/fetch.js'
import store from '../vuex'
// 系统配置 获取标签类型
export function queryTagType() {
  return fetch({
    url: '/sys/sysSetup/queryTagType',
    method: 'get'
  })
}
//新增模板
export function addTemplet(data) {
  return fetch({
    url: '/templet/addTemplet',
    method: 'post',
    data
  })
}
//模板预览图关键子查询
export function queryTempletPicList(keyWords, a, b, c, d) {
  return fetch({
    url: '/templet/queryTempletPicList?keyWords=' + keyWords + '&pageNumber=' + a + '&pageSize=' + b + '&tagTypeId=' + c + '&scrTypeId=' + d,
    method: 'get'
  })
}
//模板修改
export function queryTempletInfo(data) {
  return fetch({
    url: '/templet/queryTempletInfo',
    method: 'post',
    data
  })
}
//删除模板
export function deleteTemplet(data) {
  return fetch({
    url: '/templet/deleteTemplet',
    method: 'post',
    data
  })
}
 
//獲取文本圖片
export function queryTextPic(data) {
  return fetch({
    url: '/templet/queryTextPic',
    method: 'get',
    params:data
  })
}
//图片上传
export function uploadPic() {
  return  store.getters.baseUrl+'/templet/uploadPic'
}
//获取服务器字体
//GET 
export function queryFont() {
  return fetch({
    url: '/templet/queryFont',
    method: 'get'
  })
}
// 获取用户上传的图片
export function queryUploadpicUrl() {
  return fetch({
    url: '/templet/queryUploadpicUrl',
    method: 'get'
  })
}
//获取自定义图片
export function queryPicPic(data) {
  return fetch({
    url: '/templet/queryPicPic',
    method: 'get',
     params:data
  })
}
// 删除用户已上传图片
export function deleteUploadpicUrl(data) {
  return fetch({
    url: '/templet/deleteUploadpicUrl',
    method: 'post',
      data
  })
}

export function queryDecimalpricePic(data) {
  return fetch({
    url: '/templet/queryDecimalpricePic',
    methods: 'get',
    params:data
  })
}
//价格获取屏幕属性类型''
export function queryDbAttribute() {
  return fetch({
    url: '/templet/queryDbAttribute',
    methods: 'get'
  })
}

// 获取二维码图片
export function queryBarcodePic(data) {
  return fetch({
    url: '/templet/queryBarcodePic',
    methods: 'get',
    params:data
  })
}
//获取矩形图片
export function queryRectanglePic(data) {
  return fetch({
    url: '/templet/queryRectanglePic',
    method: 'get',
    params:data
  })
}

//修改模板保存
  
export function updateTemplet(data) {
  return fetch({
    url: '/templet/updateTemplet',
    method: 'post',
    data
  })
}
//获取标签类型商品
  export function queryTagtypecom() {
   return fetch({
     url:'/templet/queryTagtype',
     method:'get',
   })
 }