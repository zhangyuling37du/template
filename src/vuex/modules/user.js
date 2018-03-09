import cookie from 'js-cookie'
// export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
// export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录
const user = {
  state: {
    templateAdd: sessionStorage.getItem('templateAdd'), //参数跟actions一样。
    deletID: sessionStorage.getItem('deletID'),
    scrType: sessionStorage.getItem('scrType'),
    baseUrl: localStorage.getItem('baseUrl'),
    userInfo: sessionStorage.getItem('userInfo'),
     loading: false,
  },
  //处理方法
  mutations: {
    SET_TEMPLATEADD: (state, templateAdd) => {
      sessionStorage.setItem("templateAdd", templateAdd);
      state.templateAdd = templateAdd
    },
    SET_TEMSCRTYPE: (state, scrType) => {
      sessionStorage.setItem("scrType", scrType);
      state.scrType = scrType
    },
    SET_INDEX: (state, deletID) => {
      state.deletID = deletID
    },
    SET_BASEURL: (state, baseUrl) => {
      localStorage.setItem("_baseUrl", baseUrl);
      state.baseUrl = baseUrl;
    },
    USER_SIGNIN: (state, userInfo) => {
      localStorage.setItem("userInfo", userInfo);
      state.userInfo= userInfo
    },
     SET_LOADING: (state, loading) => {
      state.loading = loading;
    },
    // USER_SIGNOUT: (state, userAccount) => {
    //   sessionStorage.removeItem('userAccount')
    //   state.keys(state).forEach(k => Vue.delete(state, k))
    // }
  },
  actions: { //actions里面全是方法，与mutations区别只有这儿的方法可以使用异步操作，mutations方法使用异步，调试会混乱。
    //   fn({commit, state},templateAdd){  //{{commit,state}}写法是es6语法，简写，state是默认传参，就是上面的state，就算写aaa也是指向state。n为组件传过来的参数。
    //     alert(1)
    //     commit('SET_TEMPLATEADD')
    //     commit('SET_PHOTOADD')
    //   },    //fn执行结束后，再执行mutations 中的SET_TEMPLATEADD(){}。必须如此，否则，组件使用时收不到数据。
    //    fn({commit, state},photoAdd){  //{{commit,state}}写法是es6语法，简写，state是默认传参，就是上面的state，就算写aaa也是指向state。n为组件传过来的参数。
    //     alert(1)
    //     commit('SET_PHOTOADD')
    //   },
    //    fn({commit, state},barcodeAdd){  //{{commit,state}}写法是es6语法，简写，state是默认传参，就是上面的state，就算写aaa也是指向state。n为组件传过来的参数。
    //     alert(1)
    //     commit('SET_BARCODEADD')
    //   },
    // USER_SIGNIN({ commit, state }, userAccount) {
    //   commit(USER_SIGNIN, userAccount)
    // },
    // USER_SIGNOUT({ commit }) {
    //   commit(USER_SIGNOUT)
    // }
  }

};
export default user;
