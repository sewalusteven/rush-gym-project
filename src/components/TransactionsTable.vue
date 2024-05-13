<script setup>

import MazTableCell from "maz-ui/components/MazTableCell";
import MazTable from "maz-ui/components/MazTable";
import MazTableRow from "maz-ui/components/MazTableRow";
import MazPagination from 'maz-ui/components/MazPagination'
import dateFormat from "dateformat";
import {computed, onMounted, ref, watch} from "vue";
import {useTransactionStore} from "@/stores/transactions.js";
import {EyeIcon} from "@heroicons/vue/24/outline/index.js";
import {number} from "maz-ui";
const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const searchQuery = ref("")
const transactionStore = useTransactionStore()

const transactions = ref([])
const transactionsData = computed(() => transactionStore.transactionsData)

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
</script>

<template>
  <div class="w-full p-4 flex flex-col gap-3">
    <MazTable v-show="transactionsData"
              size="sm"
              color="primary"
              hoverable
              background-even
              v-model:search-query="searchQuery"
              search
              no-search-by
              :headers="[
                { label:'Ref.' },
                { label: 'Narration'},
                { label: 'Amount' },
                { label: 'Type' },
                { label: 'Created At'},
                { label: 'Actions' }
                ]">
      <MazTableRow  v-for="transaction in transactions" :key="transaction.id.toString()">
        <MazTableCell>
          {{ transaction.id }}
        </MazTableCell>
        <MazTableCell>
          {{ transaction.narration }}
        </MazTableCell>
        <MazTableCell class="flex gap-2">
          {{ number(transaction.amount ,'en-UG') }} UGX
        </MazTableCell>
        <MazTableCell>
          <span :class="transaction.type === 'credit'? 'bg-blue-50 rounded text-blue-700 border-blue-600': 'bg-red-50 rounded text-red-700 border-red-600' " class="text-center p-1 text-xs  border uppercase">{{ transaction.type}}</span>
        </MazTableCell>

        <MazTableCell>
          {{ dateFormat(transaction.createdAt.toString(), "dS mmmm , yyyy") }}
        </MazTableCell>

        <MazTableCell>
          <button  class="bg-indigo-800 p-2 text-white rounded-md" >
            <EyeIcon class="w-4 h-4" />
          </button>
        </MazTableCell>

      </MazTableRow>
    </MazTable>
    <div class="flex flex-row justify-between mt-3">
      <div v-if="transactionsData" class="flex flex-row gap-2 text-xs">
        <span class="font-medium">{{ pageSize }} of {{ transactionsData.meta.total }} Transactions</span>
      </div>
      <MazPagination size="sm" v-if="transactionsData" :results-size="pageSize" :total-pages="totalPages" active-color="primary" v-model="page" />
    </div>

  </div>
</template>

<style scoped>

</style>