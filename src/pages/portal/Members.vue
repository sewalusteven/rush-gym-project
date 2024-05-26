<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import MembersTable from "@/components/MembersTable.vue";
import AddMemberDialog from "@/components/AddMemberDialog.vue";
import {ref} from "vue";
import {UserPlusIcon} from "@heroicons/vue/24/outline";

const route = useRoute()
const dialogOpen =  ref(false);

const closeDialog = () => {
  dialogOpen.value = false
}
const openDialog = () => {
  dialogOpen.value = true
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
        <button @click="openDialog" class="bg-indigo-950 text-white p-2 px-3 shadow rounded-lg flex flex-row items-center gap-2 ">
          <span class="uppercase text-sm font-bold">Add Member</span>
          <UserPlusIcon class="w-5 h-5" />
        </button>
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