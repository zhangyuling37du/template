/**
 * 模态框组件
 */

import Vue from 'vue'
import EslRightBox from '../components/common/EslRightBox.vue'
import ModalDialog from '../components/common/ModalDialog.vue'
import VueLazyLoad from 'vue-lazyload'

const EslConfig = {
  pageSize: 15, //表格总页数
  maxPageSize: 20,
};
 
Vue.use(VueLazyLoad,{
  error:'./static/404_error.png',
  loading:'./static/loading.png'
})
// vue文件中将需要懒加载的图片绑定 v-bind:src 修改为 v-lazy 
// <img class="item-pic" v-lazy="newItem.picUrl"/>

export default {
  install(Vue) {
    Vue.prototype.$EslConfig = EslConfig;
    Vue.component('EslRightBox', EslRightBox);
    Vue.component('ModalDialog', ModalDialog);
  }
};
//一般导出模块或者说文件使用 module.exports
//一般导出一个属性或者对象用 export default
