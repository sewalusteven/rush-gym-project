<script setup>
import { UsersIcon, CurrencyDollarIcon, BanknotesIcon, UserPlusIcon } from "@heroicons/vue/24/outline"
import StatCard from "@/components/StatCard.vue";
import MembersTable from "@/components/MembersTable.vue";
import SaleRecord from "@/components/SaleRecord.vue";
import AddMemberDialog from "@/components/AddMemberDialog.vue";
import {computed, onMounted, ref} from "vue";
import {useSaleStore} from "@/stores/sales.js";
import TransactionsTable from "@/components/TransactionsTable.vue";
import {useCounterStore} from "@/stores/counter.js";
import {useUtilities} from "@/composables/useUtilities.js";

const dialogOpen =  ref(false);
const store =  useCounterStore()
const { getCurrentDate } =  useUtilities()

const currDate = computed(() => getCurrentDate())

const closeDialog = () => {
  dialogOpen.value = false
}

function isToday(dateString) {
  const inputDate = new Date(dateString);

  // Get today's date components
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  // Format today's date as YYYY-MM-DD
  const formattedToday = `${year}-${month}-${day}`;

  // Compare the input date with today's date
  return formattedToday === dateString && !isNaN(inputDate);
}

function isCurrentMonth(year, month) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // Months are 0-indexed in JavaScript

  return year === currentYear && month === currentMonth;
}

const transactionsToday = computed(() => {
  let transactions = 0;
  if(store.transactionsData){
    store.transactionsData.daily.forEach(t => {
      if(isToday(t.date)){
        transactions += parseInt(t.transactions)
      }
    })

    return transactions;
  }
  return transactions;
})

const salesValueToday = computed(() => {
  let amount = 0;
  if(store.salesData){
    store.salesData.daily.forEach(s => {
      if(isToday(s.date)){
        amount += parseInt(s.total_amount)
      }
    })

    return amount;
  }
  return amount;
})

const membersThisMonth = computed(() => {
  let members =  0;
  if(store.membersData){

    store.membersData.monthly.forEach(c => {
      if(isCurrentMonth(c.year, c.month)){
        members += parseInt(c.members)
      }
    })

    return members;
  }
  return members;
})

const totalMembers =  computed(() => {
  return (store.membersData)? store.membersData.total: 0;
})

onMounted(() => {
  store.fetchTransactionStats();
  store.fetchSalesStats();
  store.fetchExpensesStats();
  store.fetchMemberStats();
})
</script>

<template>
<div class="container-md p-2 mx-auto flex flex-col gap-4">
  <span class="uppercase font-bold">Dashboard</span>
  <div class="grid grid-cols-4 gap-4">
    <StatCard title="No. Transactions Today" :stat="transactionsToday" :icon="CurrencyDollarIcon" from="from-indigo-950" to="to-gray-800" />
    <StatCard title="Sales Today" :stat="`${salesValueToday} UGX`" :icon="BanknotesIcon" from="from-red-950" to="to-gray-800" />
    <StatCard title="New Members" :stat="membersThisMonth" :icon="UsersIcon" from="from-yellow-950" to="to-gray-800" />
    <StatCard title="Total Members" :stat="totalMembers" :icon="UsersIcon" from="from-purple-950" to="to-gray-800" />
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