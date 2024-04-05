<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import MembersTable from "@/components/MembersTable.vue";
import AddMemberDialog from "@/components/AddMemberDialog.vue";
import {ref} from "vue";

const route = useRoute()
const dialogOpen =  ref(false);

const closeDialog = () => {
  dialogOpen.value = false
}

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <div id="head" class="flex flex-row items-center justify-between p-2 px-3">
        <span class=" font-medium uppercase">{{ route.name }}</span>
        <button @click="dialogOpen = !dialogOpen" class="bg-indigo-950 text-white px-4 py-3 rounded-sm shadow">Add Member</button>
      </div>
      <div class="border "></div>
      <div class="w-full p-4">
       <MembersTable />
      </div>
    </div>
  </div>
  <AddMemberDialog :dialog-open="dialogOpen" @closeDialog="closeDialog" />
</template>

<style scoped>

</style>