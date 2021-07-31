import Vue from 'vue'
import VueRouter from 'vue-router'

import EmployeeList from '../view/dictionary/employee/EmployeeList.vue'
import CustomerList from '../view/dictionary/customer/CustomerList.vue'

Vue.use(VueRouter);
const routes = [
  {
    path: '/dic/employee',
    name: "Employee",
    component: EmployeeList,
    meta: { title: "Nhân viên" }
  },
  {
    path: '/dic/customer',
    name: "Customer",
    component: CustomerList,
    meta: { title: "Khách hàng" }
  },
  {
    path: '/dic/overview',
    name: "Overview",
    component: CustomerList,
    meta: { title: "Tổng quan" }
  },
  {
    path: '/dic/report',
    name: "Report",
    component: CustomerList,
    meta: { title: "Báo cáo" }
  },
  {
    path: '/dic/setting',
    name: "Setting",
    component: CustomerList,
    meta: { title: "Thiết lập hệ thống" }
  },
  {
    path: '/dic/purchase',
    name: "Setting",
    component: CustomerList,
    meta: { title: "Mua hàng" }
  }
]

const router = new VueRouter({
  mode : 'history',
  routes
});
router.beforeEach((to,from,next)=>{
  document.title = to.meta.title;
  next()
})

export default router