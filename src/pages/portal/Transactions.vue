<script setup>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import TransactionsTable from "@/components/TransactionsTable.vue";
import {PlusIcon, MinusIcon, XMarkIcon} from "@heroicons/vue/24/outline";
import AddSaleDialog from "@/components/AddSaleDialog.vue";
import {computed, onMounted, ref, watch} from "vue";
import TransactionDialog from "@/components/TransactionDialog.vue";
import MazInputPrice from "maz-ui/components/MazInputPrice";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazPicker from "maz-ui/components/MazPicker";
import {useUtilities} from "@/composables/useUtilities.js";
import {useExpenseStore} from "@/stores/expenses.js";
import {useTransactionStore} from "@/stores/transactions.js";
import {usePaymentMethodStore} from "@/stores/payment-methods.js";
import DropDownSelect from "@/components/DropDownSelect.vue";

const route = useRoute()
const dialogOpen =  ref(false);
const expenseDialogOpen =  ref(false);

const closeDialog = () => {
  dialogOpen.value = false
  expenseDialogOpen.value = false
}

const openDialog = () => {
  dialogOpen.value = true
}


const openExpenseDialog = () => {
  expenseDialogOpen.value = true
}

const {  showNotification, validateEmail } =  useUtilities()
const expenseForm =  ref({
  amount:0,
  narration: "",
  paymentDate: "",
  paymentMethodId: ""
})
const isLoading =  ref(false)
const paymentMethods = computed(() => paymentMethodStore.methodItems)

const reset =  () => {
  expenseDialogOpen.value = false;
  expenseForm.value ={
    amount:0,
    narration: "",
    paymentDate: "",
    paymentMethodId: ""
  }
}

const expenseStore = useExpenseStore()
const transactionStore =  useTransactionStore()
const paymentMethodStore =  usePaymentMethodStore()


const submitExpense = () => {
  isLoading.value =  true;
  expenseStore.save(expenseForm.value)
}

const expenseResponse =  computed(() => expenseStore.response);
const expenseError =  computed(() => expenseStore.errResponse);

watch(expenseResponse, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Success","Expense Added Successfully", "success")
    transactionStore.fetch(1,10)
    reset()
  }
})

watch(expenseError, (value) => {
  if(value && value.message){
    isLoading.value =  false;
    showNotification("Error",value.message, "error")
    reset()
  }
})
onMounted(() => {
  paymentMethodStore.fetch()
})
const formattedPrice = ref()
</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <div id="head" class="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 px-5">
        <span class=" font-medium uppercase">{{ route.name }}</span>
        <div class="flex flex-col lg:flex-row gap-2">
          <button @click="openDialog" class="bg-blue-950 text-white p-2 px-3 shadow rounded-lg flex flex-row items-center gap-2 ">
            <span class="uppercase text-sm font-bold">Add Sale</span>
            <PlusIcon class="w-5 h-5" />
          </button>
          <button @click="openExpenseDialog"  class="bg-red-950 text-white p-2 px-3 shadow rounded-lg flex flex-row items-center gap-2 ">
            <span class="uppercase text-sm font-bold">Add Expense</span>
            <MinusIcon class="w-5 h-5" />
          </button>

        </div>
      </div>
      <div class="border "></div>
      <div class="w-full p-2">
        <TransactionsTable />
      </div>
    </div>
  </div>
  <AddSaleDialog v-if="dialogOpen" @closeDialog="closeDialog"  />
  <TransactionDialog v-if="expenseDialogOpen">
    <template #header>
      <span class="font-bold">Add Expense</span>
      <XMarkIcon class="w-5 h-5 cursor-pointer" @click="closeDialog" />
    </template>

    <template #body>
      <div class="p-2 mt-4 w-full flex flex-col gap-2">
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">Amount</span>
          <MazInputPrice
              v-model="expenseForm.amount"
              label="Enter Amount"
              currency="UGX"
              locale="en-US"
              @formatted="formattedPrice = $event"
          />
        </div>
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">Payment Method</span>
          <DropDownSelect :default-value="expenseForm.paymentMethodId" default-type="Payment Method" :items="paymentMethods" @chosen-item="(value) => { expenseForm.paymentMethodId = value }" />
        </div>
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize"> Date</span>
          <MazPicker
              v-model="expenseForm.paymentDate"
              label="Transaction Date"
              color="primary"
          />
        </div>
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">Narration</span>
          <textarea  v-model="expenseForm.narration"  class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"></textarea>
        </div>
        <button @click="submitExpense" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>
      </div>
    </template>
  </TransactionDialog>
</template>

<style scoped>

</style>