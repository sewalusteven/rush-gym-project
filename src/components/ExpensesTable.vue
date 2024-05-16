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
import {useSaleStore} from "@/stores/sales.js";
import {useExpenseStore} from "@/stores/expenses.js";
const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const searchQuery = ref("")
const store = useExpenseStore()

const expenses = ref([])
const expensesData = computed(() => store.expensesData)

watch(expensesData, (value) => {
  if(value !== null){

    expenses.value = value.data
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
})
</script>

<template>
  <div class="w-full p-4 flex flex-col gap-3">
    <MazTable v-show="expensesData"
              size="sm"
              color="primary"
              hoverable
              background-even
              v-model:search-query="searchQuery"
              search
              no-search-by
              :headers="[
                { label:'Ref.' },
               { label: 'Narration' },
                { label: 'Amount' },
                { label: 'User' },
                { label: 'Created At'}
                ]">
      <MazTableRow  v-for="expense in expenses" :key="expense.id">
        <MazTableCell>
          {{ expense.transaction.id }}
        </MazTableCell>
        <MazTableCell>
          {{ expense.narration }}
        </MazTableCell>
        <MazTableCell class="flex gap-2">
          {{ number(expense.amount ,'en-UG') }} UGX
        </MazTableCell>
        <MazTableCell>
          {{ expense.user ? expense.user.name : 'UNKNOWN' }}
        </MazTableCell>

        <MazTableCell>
          {{ dateFormat(expense.createdAt.toString(), "dS mmmm , yyyy") }}
        </MazTableCell>


      </MazTableRow>
    </MazTable>
    <div class="flex flex-row justify-between mt-3">
      <div v-if="expensesData" class="flex flex-row gap-2 text-xs">
        <span class="font-medium">{{ expenses.length }} of {{ expensesData.meta.total }} Expenses</span>
      </div>
      <MazPagination size="sm" v-if="expensesData" :results-size="pageSize" :total-pages="totalPages" active-color="primary" v-model="page" />
    </div>

  </div>
</template>

<style scoped>

</style>