import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './css/global.css'
import service from './service'
import store from './store/index'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.service = service
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
