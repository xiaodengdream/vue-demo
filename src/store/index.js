import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate  from 'vuex-persistedstate'
import loginModule from './modules/user'
// 2.挂载对象实例
Vue.use(Vuex);
// 3.创建store对象
const store = new Vuex.Store({
    state: {
        data: '',//用户信息
    },
    getters: {
        // state的计算属性
    },
    mutations: {// 更改state中状态的逻辑，同步操作
       /*  getInfo(state, data) {//员工工号
            state.data = data
        } */
    },
    actions: {
        // 提交mutation，异步操作
    },
    // 如果将store分成一个个的模块的话，则需要用到modules。
    //然后在每一个module中写state, getters, mutations, actions等。
    modules: {
        loginModule
        // a: moduleA,
        // b: moduleB,
        // ...
    },
    plugins:[
        createPersistedstate({
          key:'user',// 存数据的key名   自定义的  要有语义化
          //paths: ['loginModule'] // 要把那些模块加入缓存
        }) 
      ]
    
});

// 4.导出对象
export default store;