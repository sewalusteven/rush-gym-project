<script setup>
import {
  ChevronRightIcon,
  ArrowLeftIcon, Bars3Icon,HomeIcon,
  CogIcon, ListBulletIcon,
  TruckIcon,
  InboxIcon,
  PaperAirplaneIcon,
  EnvelopeIcon,
  BanknotesIcon,
  PowerIcon,
  UserIcon, XMarkIcon, PlusCircleIcon
} from "@heroicons/vue/24/outline";
import {ref} from "vue";

const isMinified =  ref(false)
const isPhoneOpen =  ref(false)

const activeTab =  ref('dashboard')
</script>

<template>
  <div id="side-menu" :class="`bg-indigo-950 flex flex-col relative p-4 justify-between lg:min-h-screen h-full duration-500 ${isMinified ? 'lg:w-20': 'lg:w-72'} `">
    <ArrowLeftIcon
        class="bg-white invisible lg:visible font-bold text-indigo-950-950  text-3xl w-5 h-5 rounded-full absolute -right-2 top-6 z-50  cursor-pointer"
        :class="isMinified && 'rotate-180'" @click="isMinified = !isMinified"/>
    <Bars3Icon v-if="isPhoneOpen"
               class="text-white visible lg:invisible font-bold  text-3xl w-8 h-8  absolute right-2 top-5  cursor-pointer"
               :class="!isPhoneOpen && 'rotate-180'" @click="isPhoneOpen = !isPhoneOpen"/>
    <XMarkIcon v-if="!isPhoneOpen"
               class="text-white visible lg:invisible font-bold  text-3xl w-8 h-8  absolute right-2 top-5  cursor-pointer"
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

        <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 ${activeTab === 'profile' && 'font-bold text-white bg-indigo-500'}`">
        <span class="text-2xl block float-left">
         <UserIcon class="w-5 h-5 "/>
        </span>
          <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Profile</span>
        </div>

      </div>
    </div>
    <div :class="`text-gray-300 ${isMinified && 'justify-center'} text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:font-bold hover:text-white rounded-md mt-2 font-bold  bg-purple-700`">
        <span class="text-2xl block float-left">
         <PowerIcon class="w-5 h-5 "/>
        </span>
      <span :class="`text-base font-medium flex-1 duration-200 ${isMinified && 'hidden'}`">Logout</span>
    </div>

  </div>
</template>

<style scoped>

</style>