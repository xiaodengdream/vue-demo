import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/Login.vue')
const Main = () => import('../views/Main.vue')
const FindPassword = () => import('../components/FindPassword.vue')
const EmployeeManage = () => import('../views/Employee/EmployeeManage.vue')
const Salary = () => import('../views/Employee/Salary.vue')
const InfoManage = () => import('../views/Employee/InfoManage.vue')
const PersonManage = () => import('../views/Employee/PersonManage.vue')
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: 'login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/main', name: 'Main', component: Main, children: [
      { path: 'salary', name: 'salary', component: Salary },
      { path: 'infoManage', name: 'infoManage', component: InfoManage },
      { path: 'employeeManage', name: 'employeeManage', component: EmployeeManage },
      { path: 'personManage', name: 'personManage', component: PersonManage },
      { path: 'findPassword', name: 'findPassword', component: FindPassword },
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
