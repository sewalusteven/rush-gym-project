import AuthLayout from '@/layout/AuthLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/auth/Login.vue";
import MainLayout from "@/layout/MainLayout.vue";
import Dashboard from "@/pages/portal/Dashboard.vue";

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
      component:MainLayout,
      children: [
        {
          path: "",
          name: "dashboard",
          component: Dashboard
        }
      ]
    }
    
  ]
})

export default router
