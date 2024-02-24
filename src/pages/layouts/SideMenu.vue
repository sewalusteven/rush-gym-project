<script setup>
import {
  ChevronRightIcon,
  ArrowLeftIcon, Bars3Icon,HomeIcon,
  CogIcon, ListBulletIcon,
  QueueListIcon,
  InboxIcon,
  ChartBarIcon,
    UsersIcon,
  EnvelopeIcon,
  BanknotesIcon,
  PowerIcon,
  UserIcon, XMarkIcon, PlusCircleIcon
} from "@heroicons/vue/24/outline";
import {ref} from "vue";

const isMinified =  ref(false)
const isPhoneOpen =  ref(false)

const activeTab =  ref('dashboard')
const toggle =  ref(false)
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
      <span :class="`font-bold text-xl uppercase ${isMinified && 'hidden'}`">Rush Gym Panel</span>

      <div :class="`pt-2 mt-9 duration-300 ${!isPhoneOpen && 'hidden lg:block'}`">

        <div :class="`text-gray-300 ${isMinified && 'justify-center'} duration-500 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'dashboard' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <HomeIcon class="w-5 h-5 "/>
        </span>
          <span :class="`text-base flex-1 duration-200 ${isMinified && 'hidden'}`">Dashboard</span>
        </div>

        <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'settings' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <UsersIcon class="w-5 h-5 "/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Members</span>
        </div>

        <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'settings' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <BanknotesIcon class="w-5 h-5 "/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Sales</span>
        </div>

        <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'settings' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <ChartBarIcon class="w-5 h-5 "/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Reports</span>
        </div>

        <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'settings' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <EnvelopeIcon class="w-5 h-5 "/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Notifications</span>
        </div>


        <div :class="`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold rounded-md mt-2 ${activeTab === 'settings' && 'text-white font-bold'}`" @click="toggle = !toggle">
          <span :class="`text-2xl block float-left`"><ChevronRightIcon :class="`w-5 h-5 duration-300 ${toggle && 'rotate-90'}`"/></span>
          <span :class="`text-sm capitalize font-medium flex-1 duration-200 ${isMinified && 'hidden'}`"> Advanced Settings </span>

        </div>
        <div v-show="toggle">
          <div :class="` text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:font-bold hover:text-white rounded-md`">
            <span class="text-2xl block float-left"><QueueListIcon class="w-5 h-5"/></span>
            <span :class="`${isMinified && 'hidden'}`">Services</span>
          </div>
          <div :class="`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:font-bold hover:text-white rounded-md`">
            <span class="text-2xl block float-left"><UsersIcon class="w-5 h-5"/></span>
            <span :class="`${isMinified && 'hidden'}`">Memberships</span>
          </div>
        </div>

        <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'profile' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <UserIcon class="w-5 h-5 "/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Profile</span>
        </div>

      </div>
    </div>
    <div :class="`text-gray-300 ${isMinified && 'justify-center'} ${!isPhoneOpen && 'hidden lg:block'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 font-bold  bg-purple-700`">
        <span class="text-2xl block float-left">
         <PowerIcon class="w-5 h-5 "/>
        </span>
      <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Logout</span>
    </div>

  </div>
</template>

<style scoped>

</style>