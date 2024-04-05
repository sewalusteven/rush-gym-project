import AuthLayout from '@/layout/AuthLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/auth/Login.vue";
import MainLayout from "@/layout/MainLayout.vue";
import Dashboard from "@/pages/portal/Dashboard.vue";
import Members from "@/pages/portal/Members.vue";
import Sales from "@/pages/portal/Sales.vue";
import Reports from "@/pages/portal/Reports.vue";
import Services from "@/pages/portal/settings/Services.vue";
import MembershipPlans from "@/pages/portal/settings/MembershipPlans.vue";
import PaymentMethods from "@/pages/portal/settings/PaymentMethods.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      redirect: '/auth'
    },
    {
      path: "/auth",
      component: AuthLayout,
      children:[
        {
          path:"",
          name:"login",
          component: Login
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component:MainLayout,
      children: [
        {
          path: "",
          name: "dashboard",
          component: Dashboard
        },
        {
          path: "members",
          name: "members",
          component: Members
        },
        {
          path: "sales",
          name: "sales",
          component: Sales
        },
        {
          path: "reports",
          name: "reports",
          component: Reports
        },
        {
          path: "services",
          name: "services",
          component: Services
        },
        {
          path: "plans",
          name: "plans",
          component: MembershipPlans
        },
        {
          path: "payment-methods",
          name: "payment methods",
          component: PaymentMethods
        },
      ]
    }
    
  ]
})

export default router
