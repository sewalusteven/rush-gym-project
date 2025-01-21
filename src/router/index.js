import AuthLayout from '@/layout/AuthLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/auth/Login.vue";
import MainLayout from "@/layout/MainLayout.vue";
import Dashboard from "@/pages/portal/Dashboard.vue";
import Members from "@/pages/portal/Members.vue";
import Reports from "@/pages/portal/Reports.vue";
import Services from "@/pages/portal/settings/Services.vue";
import MembershipPlans from "@/pages/portal/settings/MembershipPlans.vue";
import PaymentMethods from "@/pages/portal/settings/PaymentMethods.vue";
import {useAuthStore} from "@/stores/auth.js";
import Transactions from "@/pages/portal/Transactions.vue";
import Sales from "@/pages/portal/Sales.vue";
import Expenses from "@/pages/portal/Expenses.vue";
import Users from "@/pages/portal/settings/Users.vue";
import Account from "@/pages/portal/settings/Account.vue";
import ActivePlans from "@/pages/portal/ActivePlans.vue";

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
      beforeEnter: (to, from, next) => {
        const accessToken =  localStorage.getItem('token')
        if(accessToken){
          next("/admin")
        }else {
          next();
        }
      },
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
      meta: {
        requiresAuth: true,
      },
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
          path: "transactions",
          name: "transactions",
          component: Transactions
        },
        {
          path: "active-plans",
          name: "active plans",
          component: ActivePlans
        },
        {
          path: "sales",
          name: "sales",
          component: Sales
        },
        {
          path: "expenses",
          name: "expenses",
          component: Expenses
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
          path: "users",
          name: "users",
          component: Users
        },
        {
          path: "account",
          name: "account",
          component: Account
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

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token =  localStorage.getItem('token')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      authStore.returnUrl = to.fullPath;
      next('/auth');
    } else {
      try {
        next();
      } catch (error) {
        next('/auth'); // Redirect to login if refresh fails
      }
    }
  } else {
    next();
  }
});

export default router
