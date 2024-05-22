<script setup>

</script>

<template>
  <div class="w-full h-full min-h-screen bg-indigo-950 justify-center items-center container-full flex flex-col">
    <img src="/logo.png" alt="logo" width="250" height="250"/>
    <div class="bg-white container mx-auto lg:w-4/12 min-h-32 rounded-md  shadow">
      <RouterView />
    </div>

  </div>
</template>

<style scoped>

</style>