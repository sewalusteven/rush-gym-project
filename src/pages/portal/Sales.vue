<script setup>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import TransactionsTable from "@/components/TransactionsTable.vue";
import {PlusIcon, MinusIcon} from "@heroicons/vue/24/outline/index.js";
import AddSaleDialog from "@/components/AddSaleDialog.vue";
import {ref} from "vue";
import AddExpenseDialog from "@/components/AddExpenseDialog.vue";
import SalesTable from "@/components/SalesTable.vue";

const route = useRoute()
const dialogOpen =  ref(false);
const expenseDialogOpen =  ref(false);

const closeDialog = () => {
  dialogOpen.value = false
  expenseDialogOpen.value = false
}

const openDialog = () => {
  dialogOpen.value = true
  expenseDialogOpen.value = true
}

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <div id="head" class="flex flex-row items-center justify-between py-4 px-5">
        <span class=" font-medium uppercase">{{ route.name }}</span>
        <button @click="openDialog" class="bg-blue-950 text-white p-2 px-3 shadow rounded-lg flex flex-row items-center gap-2 ">
          <span class="uppercase text-sm font-bold">Add Sale</span>
          <PlusIcon class="w-5 h-5" />
        </button>
      </div>
      <div class="border "></div>
      <div class="w-full p-2">
        <SalesTable />
      </div>
    </div>
  </div>
  <AddSaleDialog :dialog-open="dialogOpen" @closeDialog="closeDialog"  />
</template>

<style scoped>

</style>