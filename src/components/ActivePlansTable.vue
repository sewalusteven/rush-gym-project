<script setup>

import MazTableCell from "maz-ui/components/MazTableCell";
import MazTable from "maz-ui/components/MazTable";
import MazTableRow from "maz-ui/components/MazTableRow";
import MazPagination from 'maz-ui/components/MazPagination'
import dateFormat from "dateformat";
import {computed, onMounted, ref, watch} from "vue";
import {UserMinusIcon, BanknotesIcon, ArrowPathIcon, XMarkIcon} from "@heroicons/vue/24/outline/index.js";
import {number} from "maz-ui";
import {useActivePlanStore} from "@/stores/active-plans.js";
import AddActivePlanDialog from "@/components/AddActivePlanDialog.vue";
import TransactionDialog from "@/components/TransactionDialog.vue";
import {useUtilities} from "@/composables/useUtilities.js";
import {usePaymentMethodStore} from "@/stores/payment-methods.js";
import DropDownSelect from "@/components/DropDownSelect.vue";
import MazInputPrice from "maz-ui/components/MazInputPrice";
import MazPicker from "maz-ui/components/MazPicker";
import MazSpinner from "maz-ui/components/MazSpinner";

const page = ref(1)
const pageSize = ref(20)
const totalPages = ref(1)
const searchQuery = ref("")
const store = useActivePlanStore()
const paymentMethodStore =  usePaymentMethodStore()

const activePlans = ref([])
const activePlansData = computed(() => store.activePlansData)
const paymentMethods = computed(() => paymentMethodStore.methodItems)
const {  showNotification } =  useUtilities()

watch(activePlansData, (value) => {
  if(value !== null){
    activePlans.value = value.data
    totalPages.value = value.meta.last_page
  }
})

watch(searchQuery, (qry) => {
  store.fetch(page.value, pageSize.value, qry)
})

watch(page, function (value) {
  store.fetch(value, pageSize.value)
})


onMounted(() => {
  store.fetch(page.value, pageSize.value)
  paymentMethodStore.fetch()
})

const dialog = ref(false)
const selectedActivePlan = ref()

const findActivePlan = (id) => {
  return activePlans.value.find(t => t.id === id)
}

const openDetails = (id) => {
  selectedActivePlan.value = findActivePlan(id)
  dialog.value = true
}

const verifyPayment = (total, paid) => {
  return parseFloat(total) <= parseFloat(paid);
}
const balance = (total, paid) => {
  return parseFloat(total) - parseFloat(paid);
}

const renewModal = ref(false)
const depositModal = ref(false)
const cancelModal = ref(false)
const isLoading = ref(false)


const reset = () => {
  depositForm.value = {
    amount: 0,
    paymentMethodId: "",
    paymentDate: ""
  }
  depositModal.value = false
  cancelModal.value = false
  renewModal.value = false
  selectedActivePlan.value = null
  isLoading.value = false
}


const openRenewModal = (plan) => {
  selectedActivePlan.value = plan
  renewModal.value = true
}

const openDepositModal = (plan) => {
  selectedActivePlan.value = plan
  depositModal.value = true
}

const openCancelModal = (plan) => {
  selectedActivePlan.value = plan
  cancelModal.value = true
}

const depositForm = ref({
  amount: 0,
  paymentMethodId: "",
  paymentDate: ""
})

const depositOnPlan = () => {
  isLoading.value = true
  if(!selectedActivePlan.value) {
    reset()
    showNotification("Error", "Please select a plan", "error")
    return;
  }

  store.deposit(selectedActivePlan.value.id, depositForm.value)
}

const cancelOnPlan = () => {
  isLoading.value = true
  if(!selectedActivePlan.value) {
    reset()
    showNotification("Error", "Please select a plan", "error")
    return;
  }
  store.remove(selectedActivePlan.value.id)
}

const response =  computed(() => store.response);
const error =  computed(() => store.errResponse);

watch(response, (value) => {
  if(value && value.message){
    isLoading.value =  false;
    showNotification("Success",value.message, "success")
    store.fetch(page.value, pageSize.value)
    reset()

  }
})

watch(error, (value) => {
  if(value && value.message){
    isLoading.value =  false;
    showNotification("Error",value.message, "error")
    reset()
  }
})

const formattedPrice = ref()

</script>

<template>
  <div class="w-full p-4 flex flex-col gap-3 overflow-x-auto">
    <MazTable v-show="activePlansData"
              size="sm"
              color="primary"
              hoverable
              background-even
              v-model:search-query="searchQuery"
              search
              no-search-by
              :headers="[
                { label: 'Member'},
                { label: 'Phone' },
                { label: 'Membership' },
                { label: 'Balance' },
                 { label: 'Status'},
                { label: 'Start Date'},
                { label: 'End Date'},
                { label: 'Actions' }
                ]">
      <MazTableRow  v-for="plan in activePlans" :key="plan.id.toString()">
        <MazTableCell>
          {{ plan.member.name ?? 'N/A' }}
        </MazTableCell>
        <MazTableCell>
          {{ plan.member.phone ?? 'N/A' }}
        </MazTableCell>
        <MazTableCell>
          {{ plan.membershipPlan.name}}
        </MazTableCell>
        <MazTableCell class="flex gap-2">
          {{ number(balance(plan.totalAmount, plan.totalPaid) ,'en-UG') }} UGX
        </MazTableCell>
        <MazTableCell>
          <span :class="verifyPayment(plan.totalAmount, plan.totalPaid) ? 'bg-blue-50 rounded text-blue-700 border-blue-600': 'bg-red-50 rounded text-red-700 border-red-600' " class="text-center p-1 text-xs  border uppercase">{{ verifyPayment(plan.totalAmount, plan.totalPaid) ? 'Fully Paid': ' Pending' }}</span>
        </MazTableCell>
        <MazTableCell>
          {{ dateFormat(plan.startDate.toString(), "dS mmmm , yyyy") }}
        </MazTableCell>
        <MazTableCell>
          {{ dateFormat(plan.endDate.toString(), "dS mmmm , yyyy") }}
        </MazTableCell>
        <MazTableCell>
          <div class="flex flex-row gap-1">
            <button @click="openDepositModal(plan)" class="bg-blue-800 hover:bg-blue-700 flex gap-1 items-center p-2 text-white rounded" title="View Details">
              <BanknotesIcon class="w-4 h-4 " />
              <span class="text-xs">Deposit</span>
            </button>
            <button @click="openRenewModal(plan)" class="bg-green-800 hover:bg-green-700 flex gap-1 items-center p-2 text-white rounded" title="View Details">
              <ArrowPathIcon class="w-4 h-4 " />
              <span class="text-xs">Renew</span>
            </button>
            <button @click="openCancelModal(plan)" class="bg-red-800 hover:bg-red-700 flex gap-1 items-center p-2 text-white rounded" title="View Details">
              <UserMinusIcon class="w-4 h-4 " />
              <span class="text-xs">Cancel</span>
            </button>
          </div>
        </MazTableCell>

      </MazTableRow>
    </MazTable>
    <div class="flex flex-row justify-between mt-3">
      <div v-if="activePlansData" class="flex flex-row gap-2 text-xs">
        <span class="font-medium">{{ activePlans.length }} of {{ activePlansData.meta.total }} Plans</span>
      </div>
      <MazPagination size="sm" v-if="activePlansData" :results-size="pageSize" :total-pages="totalPages" active-color="primary" v-model="page" />
    </div>

    <AddActivePlanDialog v-if="renewModal" @closeDialog="() => {renewModal = false}" :active-plan="selectedActivePlan" />
    <TransactionDialog v-if="depositModal" >
      <template #header>
        <span class="font-bold text-xs">Plan Deposit</span>
        <XMarkIcon class="w-5 h-5 cursor-pointer" @click="() => depositModal = false" />
      </template>
      <template #body>
        <div class="p-2 mt-4 w-full flex flex-col gap-2">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Payment Method</span>
            <DropDownSelect :default-value="depositForm.paymentMethodId" default-type="Payment Method" :items="paymentMethods" @chosen-item="(value) => { depositForm.paymentMethodId = value }" />
          </div>

          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Deposit</span>
            <MazInputPrice
                v-model="depositForm.amount"
                label="Enter Amount"
                currency="UGX"
                locale="en-US"
                @formatted="formattedPrice = $event"
            />
          </div>

          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Deposit Date</span>
            <MazPicker
                v-model="depositForm.paymentDate"
                label="Transaction Date"
                color="primary"
            />
          </div>

          <button @click="depositOnPlan" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>

        </div>
      </template>
    </TransactionDialog>
    <TransactionDialog v-if="cancelModal" >
      <template #header>
        <span class="font-bold text-xs">Cancel Plan</span>
        <XMarkIcon class="w-5 h-5 cursor-pointer" @click="() => cancelModal = false" />
      </template>
      <template #body>
        <span> Are you sure you want to cancel {{ selectedActivePlan.member.name }}'s running membership plan permanently ?</span>
        <button @click="cancelOnPlan" class="bg-red-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white capitalize">Cancel</span></button>

      </template>
    </TransactionDialog>


  </div>
</template>

<style scoped>

</style>