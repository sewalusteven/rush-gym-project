<script setup>

import MazTableCell from "maz-ui/components/MazTableCell";
import MazTable from "maz-ui/components/MazTable";
import MazTableRow from "maz-ui/components/MazTableRow";
import MazPagination from 'maz-ui/components/MazPagination'
import dateFormat from "dateformat";
import {computed, onMounted, ref, watch} from "vue";
import {useTransactionStore} from "@/stores/transactions.js";
import {EyeIcon, XMarkIcon, TrashIcon, PencilIcon} from "@heroicons/vue/24/outline/index.js";
import {number} from "maz-ui";
import TransactionDialog from "@/components/TransactionDialog.vue";
import {useUtilities} from "@/composables/useUtilities.js";

import MazInputPrice from "maz-ui/components/MazInputPrice";
import MazSpinner from "maz-ui/components/MazSpinner";


const page = ref(1)
const pageSize = ref(20)
const totalPages = ref(1)
const isLoading = ref(false)
const searchQuery = ref("")
const transactionStore = useTransactionStore()
const {showNotification} = useUtilities()

const transactions = ref([])
const transactionsData = computed(() => transactionStore.transactionsData)
const response = computed(() => transactionStore.response)
const err = computed(() => transactionStore.errResponse)

watch(response, (val) => {
  if(val !== null){
    showNotification("Success","Transaction Successful", "success")
    transactionStore.fetch(1,10)
    editDialog.value = false
    selectedTransaction.value = null
    isLoading.value = false
  }
})
watch(err, (val) => {
  if(val !== null){
    showNotification("Success","Transaction Unsuccessful", "error")
    transactionStore.fetch(1,10)
    editDialog.value = false
    selectedTransaction.value = null
    isLoading.value = false
  }
})

watch(transactionsData, (value) => {
  if(value !== null){
    transactions.value = value.data
    totalPages.value = value.meta.last_page
  }
})

watch(searchQuery, (qry) => {
  transactionStore.fetch(page.value, pageSize.value, qry)
})

watch(page, function (value) {
  transactionStore.fetch(value, pageSize.value)
})


onMounted(() => {
  transactionStore.fetch(page.value, pageSize.value)
})

const dialog = ref(false)
const editDialog = ref(false)
const selectedTransaction = ref()

const findTransaction = (id) => {
  return transactions.value.find(t => t.id === id)
}

const openDetails = (id) => {
  selectedTransaction.value = findTransaction(id)
  dialog.value = true
}
const openEditModal = (id) => {
  selectedTransaction.value = findTransaction(id)
  editForm.value = {
    amount: selectedTransaction.value.amount,
    narration: selectedTransaction.value.narration
  }
  editDialog.value = true
}

const deleteTransaction = (id) => {
  transactionStore.remove(id)
}

const editForm = ref({
  amount: 0,
  narration: ""
})

const update = () => {
  isLoading.value = true
  transactionStore.update(selectedTransaction.value.id, editForm.value)
}

const formattedPrice = ref()
</script>

<template>
  <div class="w-full p-4 flex flex-col gap-3 overflow-x-auto">
    <MazTable v-show="transactionsData"
              size="sm"
              color="primary"
              hoverable
              background-even
              v-model:search-query="searchQuery"
              search

              no-search-by
              :headers="[
                { label: 'Ref'},
                { label: 'Narration'},
                { label: 'Amount' },
                { label: 'Type' },
                 { label: 'Payment Method'},
                 { label: 'Category'},
                { label: 'Transaction Date'},
                { label: 'Actions' }
                ]">
      <MazTableRow  v-for="transaction in transactions" :key="transaction.id.toString()">
        <MazTableCell>
          {{ transaction.id }}
        </MazTableCell>
        <MazTableCell>
          <div class="w-[200px] text-wrap">
            {{ transaction.narration }}
          </div>
        </MazTableCell>
        <MazTableCell class="flex gap-2">
          {{ number(transaction.amount ,'en-UG') }} UGX
        </MazTableCell>
        <MazTableCell>
          <span :class="transaction.type === 'credit'? 'bg-blue-50 rounded text-blue-700 border-blue-600': 'bg-red-50 rounded text-red-700 border-red-600' " class="text-center p-1 text-xs  border uppercase">{{ transaction.type}}</span>
        </MazTableCell>
        <MazTableCell>
          {{ transaction.paymentMethod.method.toUpperCase() }}
        </MazTableCell>
        <MazTableCell>
          {{ transaction.category.split("_").join(" ") }}
        </MazTableCell>
        <MazTableCell>
          {{ dateFormat(transaction.transactionDate.toString(), "dS mmmm , yyyy") }}
        </MazTableCell>
        <MazTableCell>
          <div class="flex flex-row gap-1">
            <button @click="openDetails(transaction.id)" class="bg-blue-800 p-2 text-white rounded-full" title="View Details">
              <EyeIcon class="w-4 h-4 " />
            </button>
            <button @click="openEditModal(transaction.id)" class="bg-gray-800 p-2 text-white rounded-full" title="Edit">
              <PencilIcon class="w-4 h-4 " />
            </button>
            <button @click="deleteTransaction(transaction.id)" class="bg-red-800 p-2 text-white rounded-full" title="Delete">
              <TrashIcon class="w-4 h-4 " />
            </button>
          </div>

        </MazTableCell>

      </MazTableRow>
    </MazTable>
    <div class="flex flex-row justify-between mt-3">
      <div v-if="transactionsData" class="flex flex-row gap-2 text-xs">
        <span class="font-medium">{{ transactions.length }} of {{ transactionsData.meta.total }} Transactions</span>
      </div>
      <MazPagination size="sm" v-if="transactionsData" :results-size="pageSize" :total-pages="totalPages" active-color="primary" v-model="page" />
    </div>

    <TransactionDialog v-if="dialog" >
      <template #header>
        <span class="font-bold text-xs">Transaction Details</span>
        <XMarkIcon class="w-5 h-5 cursor-pointer" @click="() => dialog = false" />
      </template>
      <template #body>
        <div v-if="selectedTransaction" class="w-full grid lg:grid-cols-2  p-4 text-xs">
          <div class="flex flex-col gap-2">

            <div class="flex items-center pb-3 border-b gap-1">
              <span>Ref:</span>
              <span class="font-bold"> {{ selectedTransaction.id }}</span>
            </div>
            <div class="flex items-center border-b pb-3 gap-1">
              <span>Amount:</span>
              <span class="font-bold">  {{ number(selectedTransaction.amount ,'en-UG') }} UGX</span>
            </div>
            <div class="flex items-center border-b pb-3 gap-1">
              <span>Category:</span>
              <span class="font-bold">  {{ selectedTransaction.category.replace("_"," ") }} </span>
            </div>
            <div class="flex items-center border-b pb-3 gap-1">
              <span>Type:</span>
              <span  class=" font-bold uppercase">{{ selectedTransaction.type}}</span>
            </div>
            <div class="flex items-center border-b pb-3 gap-1">
              <span>Transaction Date:</span>
              <span class="font-bold">  {{ dateFormat(selectedTransaction.createdAt.toString(), "dS mmmm , yyyy")}} </span>
            </div>

          </div>

          <div class="flex flex-col gap-2" v-if="selectedTransaction.sale">
            <div class="flex items-center border-b pb-3 gap-1">
              <span>Payment Method:</span>
              <span class="font-bold">  {{ selectedTransaction.paymentMethod.method.replace("_"," ") }} </span>
            </div>

            <div class="flex items-center border-b pb-3 gap-1" v-if="selectedTransaction.sale.service">
              <span>Service:</span>
              <span class="font-bold"> {{ selectedTransaction.sale.service.name }}</span>
            </div>

            <div class="flex items-center border-b pb-3 gap-1" v-if="selectedTransaction.sale.member">
              <span>Member:</span>
              <span class="font-bold"> {{ selectedTransaction.sale.member.name }}</span>
            </div>

            <div class="flex items-center border-b pb-3 gap-1" v-if="selectedTransaction.sale.member">
              <span>Phone Number:</span>
              <span class="font-bold"> {{ selectedTransaction.sale.member.phoneNumber ?? 'N/A' }}</span>
            </div>

          </div>

          <div class="flex flex-col gap-2" v-if="selectedTransaction.expense">
            <div class="flex items-center border-b pb-3 gap-1" v-if="selectedTransaction.expense.narration">
              <span>Expense:</span>
              <span class="font-bold"> {{ selectedTransaction.expense.narration }}</span>
            </div>

          </div>


        </div>
      </template>
    </TransactionDialog>

    <TransactionDialog v-if="editDialog">
      <template #header>
        <span class="font-bold">Edit Transaction</span>
        <XMarkIcon class="w-5 h-5 cursor-pointer" @click="() => { editDialog = false }" />
      </template>

      <template #body>
        <div class="p-2 mt-4 w-full flex flex-col gap-2">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Amount</span>
            <MazInputPrice
                v-model="editForm.amount"
                label="Enter Amount"
                currency="UGX"
                locale="en-US"
                @formatted="formattedPrice = $event"
            />
          </div>

          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Narration</span>
            <textarea  v-model="editForm.narration"  class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"></textarea>
          </div>
          <button @click="update" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>
        </div>
      </template>
    </TransactionDialog>

  </div>
</template>

<style scoped>

</style>