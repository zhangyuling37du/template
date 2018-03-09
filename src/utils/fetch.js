import store from '../vuex'
import axios from 'axios'
import { Message } from 'element-ui';
// import router from 'router'
import qs from 'qs'
// let requertURL = process.env.BASE_API ;
let baseURL = store.getters.baseUrl;
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 5000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});
// requert拦截器
/*service.interceptors.request.use(config => {
  // console.log("myToken====>" + store.getters.token);
   if(config.headers['Content-Type'] && config.headers['Content-Type']==="application/x-www-form-urlencoded"){
       config.data = qs.stringify(config.data);
   }
  if (store.getters.token) {
    config.headers['AccountToken'] = store.getters.token; // 让每个请求携带token
  }
  return config
}, error => {
  console.log("拦截器===>" + error);
  Promise.reject(error);
});*/

service.interceptors.response.use(response => {
  let code = response.data.status;
  setTimeout(() => {
     store.commit('SET_LOADING',false);
  }, 1000);
  if (code == 4000 || code == 4001) {
    Message({
      message: response.data.msg,
      type: 'error',
      duration: 5 * 1000
    });
    // 登出操作
    // router.push({name: "login"});
  } else if (code == 4003) {
    Message({
      message: response.data.msg,
      type: 'error',
      duration: 5 * 1000
    });
    return response.data
  } else {
    if (!response.data.resultStatus) {
      let _urls = response.config.url.split('/');
      let _url = _urls[_urls.length - 1];
      console.log("失败链接==>" + _url);
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      });
    }
    return response.data
  }
}, err => {
  console.log('err====>' + err);
  // store.commit('SET_LOADING',false);
  Message({
    message: err.message,
    type: 'error',
    duration: 5 * 1000
  });
  return Promise.reject(err);
});
export default service
