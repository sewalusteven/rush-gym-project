<script setup>
import {computed, ref} from "vue";
import {useAuthStore} from "@/stores/auth.js";

const isOpen = ref(false)
const authStore =  useAuthStore()

const parseSessionUser = () => {
  const user = localStorage.getItem('user');
  return user !== null ? JSON.parse(user) : null;
}

const user = computed(parseSessionUser);

const photoUrl =  computed(()=> {
  return (user.value && user.value.profilePhoto)? import.meta.env.VITE_BACKEND_URL + user.value.profilePhoto : 'https://picsum.photos/200/200'
})

</script>

<template>
  <div id="navbar" class="bg-white h-14 w-full p-3 flex flex-row lg:justify-end items-center sticky top- shadow">
    <div @click="isOpen = !isOpen" class="flex relative gap-2 w-72 items-center lg:justify-end  px-3 p-1  cursor-pointer">
      <span class="text-sm capitalize">{{ user.name }}</span>
      <img :src="photoUrl" :alt="user.name" class="w-8 h-8 rounded-full border-2 border-indigo-900 shadow-sm">
      <div v-show="isOpen" class="absolute z-50 w-full duration-300 rounded-b shadow-md text-xs font-medium  flex flex-col bg-white top-11 right-0">
        <router-link to="/admin/account" class="border-t p-2 text-start  hover:text-indigo-600 hover:font-bold">Account Settings</router-link>
        <button @click="authStore.logout()"  class="border-t p-2 text-start hover:text-indigo-600 hover:font-bold">Logout</button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>