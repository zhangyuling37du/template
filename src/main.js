// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './vuex'
import 'assets/theme/element-var.scss'
import 'assets/public/element.less'
import 'assets/public/element.less'
import './assets/fonts/Icons.css'
import drag from 'utils/vueDrag'
import $ from 'jquery'
import ESLConfig from "utils/commonSet.js" //自定义插件
import getServe from 'utils/getServe'

getServe().then(res => res).catch(err => err)

// router.beforeEach(({ meta, path }, from, next) => {
//   console.log(meta) //{}  var meta ={}
//   var { auth = true } = meta // es6 解构赋值var auth  =  meta.auth === undefined ? true : meta.auth
//    var isLogin = Boolean(store.state.user.userInfo ) //true 用户已登录， false 用户未登录
//    console.log(isLogin)
//   console.log(store.state.user.userInfo)
//   if (auth && !isLogin && path !== '/login') {
//     return next({ path: '/login' })
//   }
//   next()
// })

Vue.use(drag);
Vue.use(ESLConfig);

Vue.config.productionTip = false
Vue.prototype.HOST = '/api'
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// new Vue({ store, router }).$mount('#app')
