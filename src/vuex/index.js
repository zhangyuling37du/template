import Vue from 'vue';
import Vuex from 'vuex';
//引入 modules 里面的方法
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters';
import computed from './modules/computed';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        permission,
        computed
    },
    getters,
});
export default store