<script setup>

import SideMenu from "@/pages/layouts/SideMenu.vue";
import Navbar from "@/pages/layouts/Navbar.vue";
</script>

<template>
  <div class="w-full h-full min-h-screen flex lg:flex-row flex-col bg-gray-200">
    <SideMenu />
    <div class="flex flex-col w-full">
      <Navbar />
      <div id="main-content" class="p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>