<script setup>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import TransactionsTable from "@/components/TransactionsTable.vue";
import {PlusIcon, MinusIcon, XMarkIcon} from "@heroicons/vue/24/outline";
import AddSaleDialog from "@/components/AddSaleDialog.vue";
import {computed, onMounted, ref, watch} from "vue";
import TransactionDialog from "@/components/TransactionDialog.vue";
import ExpensesTable from "@/components/ExpensesTable.vue";
import {useUtilities} from "@/composables/useUtilities.js";
import {useExpenseStore} from "@/stores/expenses.js";
import {useTransactionStore} from "@/stores/transactions.js";
import MazInputPrice   from "maz-ui/components/MazInputPrice";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazPicker from "maz-ui/components/MazPicker";
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
  expenseDialogOpen.value = true
}

const paymentMethodStore =  usePaymentMethodStore()
const {  showNotification, validateEmail } =  useUtilities()


const form =  ref({
  amount:0,
  narration: "",
  paymentDate: "",
  paymentMethodId: ""
})
const isLoading =  ref(false)
const paymentMethods = computed(() => paymentMethodStore.methodItems)

const reset =  () => {
  form.value ={
    amount:0,
    narration: "",
    paymentDate: "",
    paymentMethodId: ""
  }
}

const store = useExpenseStore()
const transactionStore =  useTransactionStore()


const submit = () => {
  isLoading.value =  true;
  store.save(form.value)
}

const response =  computed(() => store.response);
const error =  computed(() => store.errResponse);

watch(response, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Success","Transaction Added Successfully", "success")
    transactionStore.fetch(1,10)
    reset()
  }
})

watch(error, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Error","Transaction not added, Contact Support", "error")
    reset()
  }
})
const formattedPrice = ref()

onMounted(() => {
  paymentMethodStore.fetch()
})

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <div id="head" class="flex flex-row items-center justify-between py-4 px-5">
        <span class=" font-medium uppercase">{{ route.name }}</span>
        <button @click="openDialog"  class="bg-red-950 text-white p-2 px-3 shadow rounded-lg flex flex-row items-center gap-2 ">
          <span class="uppercase text-sm font-bold">Add Expense</span>
          <MinusIcon class="w-5 h-5" />
        </button>
      </div>
      <div class="border "></div>
      <div class="w-full p-2">
        <ExpensesTable />
      </div>
    </div>
  </div>
  <TransactionDialog :open="expenseDialogOpen">
    <template #header>
      <span class="font-bold">Add Expense</span>
      <XMarkIcon class="w-5 h-5 cursor-pointer" @click="closeDialog" />
    </template>

    <template #body>
      <div class="p-2 mt-4 w-full flex flex-col gap-2">
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">Amount</span>
          <MazInputPrice
              v-model="form.amount"
              label="Enter Amount"
              currency="UGX"
              locale="en-US"
              @formatted="formattedPrice = $event"
          />
        </div>
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">Payment Method</span>
          <DropDownSelect :default-value="form.paymentMethodId" default-type="Payment Method" :items="paymentMethods" @chosen-item="(value) => { form.paymentMethodId = value }" />
        </div>
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize"> Date</span>
          <MazPicker
              v-model="form.paymentDate"
              label="Transaction Date"
              color="primary"
          />
        </div>
        <div class="mb-4 flex flex-col gap-1">
          <span class="font-medium capitalize">Narration</span>
          <textarea  v-model="form.narration"  class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"></textarea>
        </div>
        <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>
      </div>
    </template>

  </TransactionDialog>
</template>

<style scoped>

</style>