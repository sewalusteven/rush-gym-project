<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
const route = useRoute()
</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-between items-center gap-2 w-full p-2">
      <span class=" text-gray-700 uppercase font-bold">{{ route.name }}</span>
      <Breadcrumbs />
    </div>


  </div>
</template>

<style scoped>

</style>