<script setup>
import { UsersIcon, CurrencyDollarIcon, BanknotesIcon, UserPlusIcon } from "@heroicons/vue/24/outline"
import StatCard from "@/components/StatCard.vue";
import MembersTable from "@/components/MembersTable.vue";
import SaleRecord from "@/components/SaleRecord.vue";
import MemberDialog from "@/components/MemberDialog.vue";
import {computed, onMounted, ref, watch} from "vue";
import {useSaleStore} from "@/stores/sales.js";
import TransactionsTable from "@/components/TransactionsTable.vue";
import {useCounterStore} from "@/stores/counter.js";
import {useUtilities} from "@/composables/useUtilities.js";
import {XMarkIcon} from "@heroicons/vue/24/outline/index.js";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import {usePlansStore} from "@/stores/plans.js";
import {useMemberStore} from "@/stores/members.js";

const dialogOpen =  ref(false);
const store =  useCounterStore()
const { getCurrentDate, showNotification, validateEmail } =  useUtilities()

const currDate = computed(() => getCurrentDate())

const closeDialog = () => {
  dialogOpen.value = false
}
const openDialog = () => {
  dialogOpen.value = true
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


const form =  ref({
  name:"",
  email: "",
  phone: "",

})
const isLoading =  ref(false)

const reset =  () => {
  form.value = {
    name:"",
    email: "",
    phone: "",
  }
}


const phoneObj = ref({isValid: false})


const planStore =  usePlansStore();
const planItems = computed(() => planStore.planItems)



const memberStore =  useMemberStore();
const submit = () => {
  isLoading.value =  true;

  if(form.value.email !== "" && !validateEmail(form.value.email)){
    form.value.email = "";
    showNotification("Invalid Email","This is a wrong email", "error")
    isLoading.value =  false;
    return;
  }

  if(form.value.phone && !phoneObj.value.isValid){
    form.value.phone= "";
    showNotification("Invalid Phone","This is a wrong phone number", "error")
    isLoading.value =  false;
    return;
  }

  if(form.value.name === ""){
    showNotification("Invalid Name","Please Insert a Name", "error")
    isLoading.value =  false;
    return;
  }
  form.value.phone  =  phoneObj.value.formatNational
  memberStore.save(form.value)
}

const response =  computed(() => memberStore.response);
const error =  computed(() => memberStore.errResponse);

watch(response, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Success","Member Added Successfully", "success")
    memberStore.fetchMembers()
    reset()
  }
})

watch(error, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Error","Member not added, Contact Support", "error")
    reset()
  }
})

onMounted(() => {
  store.fetchTransactionStats();
  store.fetchSalesStats();
  store.fetchExpensesStats();
  store.fetchMemberStats();
  planStore.fetchPlans();
  form.value.start = getCurrentDate()
})
</script>

<template>
<div class="container-md p-2 mx-auto flex flex-col gap-4">
  <span class="uppercase font-bold">Dashboard</span>
  <div class="grid lg:grid-cols-4 gap-4">
    <StatCard title="No. Transactions Today" :stat="transactionsToday" :icon="CurrencyDollarIcon" from="from-indigo-950" to="to-gray-800" />
    <StatCard title="Sales Today" :stat="`${salesValueToday} UGX`" :icon="BanknotesIcon" from="from-red-950" to="to-gray-800" />
    <StatCard title="New Members" :stat="membersThisMonth" :icon="UsersIcon" from="from-yellow-950" to="to-gray-800" />
    <StatCard title="Total Members" :stat="totalMembers" :icon="UsersIcon" from="from-purple-950" to="to-gray-800" />
  </div>
  <div class="flex flex-col lg:flex-row gap-4">
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <div id="head" class="flex flex-row items-center justify-between py-4 px-5">
        <span class=" font-medium capitalize">Rush Gym Transactions</span>
        <button @click="openDialog" class="bg-indigo-950 text-white p-2 px-3 shadow rounded-lg flex flex-row items-center gap-2 ">
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
  <MemberDialog v-if="dialogOpen">
    <template #header>
      <span class="font-bold">Member Registration</span>
      <XMarkIcon class="w-5 h-5 cursor-pointer" @click="closeDialog" />
    </template>
    <template #body>
      <div class="p-2 mt-4 w-full flex flex-col gap-2">
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">FullName</span>
          <input v-model="form.name"  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
        </div>
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">Email</span>
          <input v-model="form.email"  type="email" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
        </div>
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">Phone</span>
          <MazPhoneNumberInput
              v-model="form.phone"
              show-code-on-list
              color="info"
              :preferred-countries="['UG', 'KE']"
              :default-country-code="`UG`"
              @update="phoneObj = $event"
              :success="phoneObj?.isValid"
          />
        </div>
        <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>

      </div>
    </template>
  </MemberDialog>
</template>

<style scoped>

</style>