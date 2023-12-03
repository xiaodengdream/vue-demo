//user.js模块
export default {
    namespaced: true,//namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接
    state: {
        userInfo: '',
        //console.log(this.$store.state.loginModule.userInfo) 拿到userInfo
    },
    mutations: {
        setUser(state, data) {//设置用户信息
            state.userInfo = data
        }
    },
    actions: {},
    getters: {}
}
