<script setup>

</script>

<template>
<div class="flex flex-col">
  <span class="font-bold text-xl text-indigo-950 text-center uppercase pl-4 pt-3">Rush Gym Login</span>
  <span class="text-center text-indigo-950 font-medium text-xs pb-3">Admin Panel</span>
  <div class="border w-full"></div>
  <div class="flex-col flex gap-2 p-2 mb-4">
    <span class="capitalize font-medium text-sm ">Email</span>
    <input type="email"  class="border rounded-md p-2 focus:outline-none mb-2">
    <span class="capitalize font-medium text-sm ">Password</span>
    <input type="password"  class="border rounded-md p-2 focus:outline-none mb-2">
    <button class="bg-indigo-900 shadow-md hover:bg-indigo-950 hover:font-bold text-white flex flex-row justify-center w-full py-2 rounded-md "><span>Login</span></button>
  </div>
</div>
</template>

<style scoped>

</style>