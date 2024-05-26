<script setup>
import {
  ChevronRightIcon,
  ArrowLeftIcon, Bars3Icon,HomeIcon,
  CurrencyDollarIcon,
  QueueListIcon,
  CreditCardIcon,
  UserGroupIcon,
    UsersIcon,
  EnvelopeIcon,
  BanknotesIcon,
  PowerIcon,
  UserIcon, XMarkIcon, PlusCircleIcon
} from "@heroicons/vue/24/outline";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";

const isMinified =  ref(false)
const isPhoneOpen =  ref(false)

const activeTab =  ref('dashboard')
const activeSubMenuItem =  ref('')
const route =  useRoute()
const toggle =  ref(false)
const authStore =  useAuthStore()

const getActiveTab = () => {
  let path = route.path;
  if (route.fullPath === '/admin') {
    activeTab.value = 'dashboard'
  }

  if (path.includes('services') || path.includes('plans')  || path.includes('payment-methods') || path.includes('users') ) {
   activeTab.value ='settings'
    if (path.includes('services')) {
      activeSubMenuItem.value = `services`
    }
    if (path.includes('plans')) {
      activeSubMenuItem.value = `plans`
    }
    if (path.includes('payment-methods')) {
      activeSubMenuItem.value = `methods`
    }
    if (path.includes('users')) {
      activeSubMenuItem.value = `users`
    }
  }

  if (path.includes('members')) {
    activeTab.value = 'members'
  }

  if (path.includes('reports')) {
    activeTab.value = 'reports'
  }

  if (path.includes('transactions')) {
    activeTab.value = 'transactions'
  }

  if (path.includes('sales')) {
    activeTab.value = 'sales'
  }

  if (path.includes('expenses')) {
    activeTab.value = 'expenses'
  }


  if (path.includes('account')) {
    activeTab.value = ''
    activeSubMenuItem.value = ''
  }

}

watch(route, () => {
  getActiveTab()
})
const router =  useRouter()

const logout = () => {
  authStore.logout()
}

const parseSessionUser = () => {
  const user = localStorage.getItem('user');
  return user !== null ? JSON.parse(user) : null;
}

const user = computed(parseSessionUser);

onMounted(() => {
  getActiveTab()
})
</script>

<template>
  <div id="side-menu" :class="`bg-indigo-950 flex flex-col relative p-4 justify-between lg:min-h-screen h-full duration-500 ${isMinified ? 'lg:w-20': 'lg:w-72'} `">
    <ArrowLeftIcon
        class="bg-white invisible lg:visible font-bold text-indigo-950-950  text-3xl w-5 h-5 rounded-full absolute -right-2 top-6 z-50  cursor-pointer"
        :class="isMinified && 'rotate-180'" @click="isMinified = !isMinified"/>
    <Bars3Icon v-if="isPhoneOpen"
               class="text-white visible lg:invisible font-bold  text-3xl w-8 h-8  absolute right-2 top-3  cursor-pointer"
               :class="!isPhoneOpen && 'rotate-180'" @click="isPhoneOpen = !isPhoneOpen"/>
    <XMarkIcon v-if="!isPhoneOpen"
               class="text-white visible lg:invisible font-bold  text-3xl w-8 h-8  absolute right-2 top-3  cursor-pointer"
               :class="!isPhoneOpen && 'rotate-180'" @click="isPhoneOpen = !isPhoneOpen"/>


    <div id="top-menu" class="text-white flex flex-col">
      <span :class="`font-bold hover:rotate-[360deg] duration-300 text-lg uppercase hidden lg:block ${isMinified && 'hidden'}`"><img src="/logo.png" alt="logo" width="200" height="200"></span>
      <span :class="`font-bold hover:rotate-[360deg] duration-300 text-lg uppercase lg:hidden`">Rush Fitness Center</span>

      <div :class="`pt-2 mt-9 duration-300 ${!isPhoneOpen && 'hidden lg:block'}`">

        <RouterLink to="/admin" :class="`text-gray-300 ${isMinified && 'justify-center'} duration-500 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'dashboard' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <HomeIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/>
        </span>
          <span :class="`text-base flex-1 duration-200 ${isMinified && 'hidden'}`">Dashboard</span>
        </RouterLink>

        <RouterLink to="/admin/members" :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'members' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <UsersIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Members</span>
        </RouterLink>

        <RouterLink to="/admin/transactions" :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'transactions' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <BanknotesIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Transactions</span>
        </RouterLink>
        <RouterLink to="/admin/sales" :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'sales' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <CurrencyDollarIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Sales</span>
        </RouterLink>
        <RouterLink to="/admin/expenses" :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'expenses' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <CreditCardIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Expenses</span>
        </RouterLink>

<!--        <RouterLink to="/admin/reports" :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'reports' && 'font-bold text-white bg-indigo-500'}`">-->
<!--        <span class="text-2xl block float-left">-->
<!--         <ChartBarIcon class="w-5 h-5 "/>-->
<!--        </span>-->
<!--          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Reports</span>-->
<!--        </RouterLink>-->

<!--        <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'notifications' && 'font-bold text-white bg-indigo-500'}`">-->
<!--        <span class="text-2xl block float-left">-->
<!--         <EnvelopeIcon class="w-5 h-5 "/>-->
<!--        </span>-->
<!--          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Notifications</span>-->
<!--        </div>-->


        <div :class="`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold rounded-md mt-2 ${activeTab === 'settings' && 'text-white font-bold bg-indigo-500'}`" @click="toggle = !toggle">
          <span :class="`text-2xl block float-left`"><ChevronRightIcon :class="`w-5 h-5 duration-300 ${toggle && 'rotate-90'}`"/></span>
          <span :class="`text-sm capitalize font-medium flex-1 duration-200 ${isMinified && 'hidden'}`"> Advanced Settings </span>

        </div>
        <div v-show="toggle">
          <RouterLink to="/admin/services" :class="`${activeSubMenuItem === 'services' && 'text-white font-bold'} text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:font-bold hover:text-white rounded-md`">
            <span class="text-2xl block float-left"><QueueListIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/></span>
            <span :class="`${isMinified && 'hidden'}`">Services</span>
          </RouterLink>
          <RouterLink to="/admin/plans" :class="`${activeSubMenuItem === 'plans' && 'text-white font-bold'} text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:font-bold hover:text-white rounded-md`">
            <span class="text-2xl block float-left"><UsersIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/></span>
            <span :class="`${isMinified && 'hidden'}`">Memberships</span>
          </RouterLink>
          <RouterLink to="/admin/payment-methods" :class="`${activeSubMenuItem === 'methods' && 'text-white font-bold'} text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:font-bold hover:text-white rounded-md`">
            <span class="text-2xl block float-left"><BanknotesIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/></span>
            <span :class="`${isMinified && 'hidden'}`">Payment Methods</span>
          </RouterLink>
          <RouterLink to="/admin/users" v-if="user.role === 'admin'" :class="`${activeSubMenuItem === 'users' && 'text-white font-bold'} text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:font-bold hover:text-white rounded-md`">
            <span class="text-2xl block float-left"><UserGroupIcon class="w-5 h-5 hover:rotate-[360deg] duration-300"/></span>
            <span :class="`${isMinified && 'hidden'}`">User Management</span>
          </RouterLink>
        </div>

<!--        <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'profile' && 'font-bold text-white bg-indigo-500'}`">-->
<!--        <span class="text-2xl block float-left">-->
<!--         <UserIcon class="w-5 h-5 "/>-->
<!--        </span>-->
<!--          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Profile</span>-->
<!--        </div>-->

      </div>
    </div>
    <div @click="logout" :class="`text-gray-300 ${isMinified && 'justify-center'} ${!isPhoneOpen && 'hidden lg:block'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 font-bold  bg-purple-700`">
        <span class="text-2xl block float-left">
         <PowerIcon class="w-5 h-5 mr-2 hover:rotate-[360deg] duration-300"/>
        </span>
      <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Logout</span>
    </div>

  </div>
</template>

<style scoped>

</style>