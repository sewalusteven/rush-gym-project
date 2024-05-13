<script setup>
import { UsersIcon, CurrencyDollarIcon, BanknotesIcon, UserPlusIcon } from "@heroicons/vue/24/outline"
import StatCard from "@/components/StatCard.vue";
import MembersTable from "@/components/MembersTable.vue";
import SaleRecord from "@/components/SaleRecord.vue";
import AddMemberDialog from "@/components/AddMemberDialog.vue";
import {onMounted, ref} from "vue";
import {useSaleStore} from "@/stores/sales.js";
import TransactionsTable from "@/components/TransactionsTable.vue";

const dialogOpen =  ref(false);
const salesStore =  useSaleStore()

const closeDialog = () => {
  dialogOpen.value = false
}

onMounted(() => {
  salesStore.fetch();
})
</script>

<template>
<div class="container-md p-2 mx-auto flex flex-col gap-4">
  <span class="uppercase font-bold">Dashboard</span>
  <div class="grid grid-cols-4 gap-4">
    <StatCard title="No. Transactions Today" stat="250" :icon="CurrencyDollarIcon" from="from-indigo-950" to="to-gray-800" />
    <StatCard title="Sales Today" stat="250,000,000 UGX" :icon="BanknotesIcon" from="from-red-950" to="to-gray-800" />
    <StatCard title="New Members" stat="25" :icon="UsersIcon" from="from-yellow-950" to="to-gray-800" />
    <StatCard title="Total Members" stat="250" :icon="UsersIcon" from="from-purple-950" to="to-gray-800" />
  </div>
  <div class="flex flex-col lg:flex-row gap-4">
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <div id="head" class="flex flex-row items-center justify-between py-4 px-5">
        <span class=" font-medium capitalize">Rush Gym Transactions</span>
        <button @click="dialogOpen = !dialogOpen" class="bg-indigo-950 text-white p-2 px-3 shadow rounded-lg flex flex-row items-center gap-2 ">
          <span class="uppercase text-sm font-bold">Add Member</span>
          <UserPlusIcon class="w-5 h-5" />
        </button>
      </div>
      <div class="border "></div>
      <div class="w-full p-2 ">
        <TransactionsTable />
      </div>
    </div>
  </div>

</div>
  <AddMemberDialog :dialog-open="dialogOpen" @closeDialog="closeDialog" />
</template>

<style scoped>

</style>