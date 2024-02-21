import AuthLayout from '@/layout/AuthLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/auth/Login.vue";

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
    }
    
  ]
})

export default router
