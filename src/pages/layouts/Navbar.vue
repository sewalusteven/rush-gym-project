<script setup>
import {ref} from "vue";

const isOpen = ref(false)

</script>

<template>
  <div id="navbar" class="bg-white h-14 w-full p-3 flex flex-row lg:justify-end items-center sticky top- shadow">
    <div @click="isOpen = !isOpen" class="flex relative gap-2 w-52 items-center lg:justify-end  px-3 p-1  cursor-pointer">
      <span class="text-sm capitalize">Sewalu</span>
      <img src="https://picsum.photos/200/200" alt="smstoroc" class="w-8 h-8 rounded-full border-2 border-indigo-900 shadow-sm">
      <div v-show="isOpen" class="absolute z-50 w-full duration-300 rounded-b shadow-md text-xs font-medium  flex flex-col bg-white top-11 right-0">
        <button class="border-t p-2 text-start  hover:text-indigo-600 hover:font-bold">Account Settings</button>
        <button class="border-t p-2 text-start  hover:text-indigo-600 hover:font-bold">Profile</button>
        <button  class="border-t p-2 text-start hover:text-indigo-600 hover:font-bold">Logout</button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>