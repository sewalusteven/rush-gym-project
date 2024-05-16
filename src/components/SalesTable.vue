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
const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const searchQuery = ref("")
const store = useSaleStore()

const sales = ref([])
const salesData = computed(() => store.salesData)

watch(salesData, (value) => {
  if(value !== null){

    sales.value = value.data
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
    <MazTable v-show="salesData"
              size="sm"
              color="primary"
              hoverable
              background-even
              v-model:search-query="searchQuery"
              search
              no-search-by
              :headers="[
                { label:'Ref.' },
                { label: 'Service'},
                { label: 'Amount' },
                { label: 'Payment Method' },
                { label: 'Member' },
                { label: 'Narration' },
                { label: 'Created At'}
                ]">
      <MazTableRow  v-for="sale in sales" :key="sale.id">
        <MazTableCell>
          {{ sale.transaction.id }}
        </MazTableCell>
        <MazTableCell>
          {{ sale.service.service}}
        </MazTableCell>
        <MazTableCell class="flex gap-2">
          {{ number(sale.amount ,'en-UG') }} UGX
        </MazTableCell>
        <MazTableCell>
          {{ sale.paymentMethod.method.toUpperCase() }}
        </MazTableCell>
        <MazTableCell>
          {{ sale.member ? sale.member.name : 'UNKNOWN' }}
        </MazTableCell>
        <MazTableCell>
          {{ sale.narration }}
        </MazTableCell>
        <MazTableCell>
          {{ dateFormat(sale.createdAt.toString(), "dS mmmm , yyyy") }}
        </MazTableCell>

      </MazTableRow>
    </MazTable>
    <div class="flex flex-row justify-between mt-3">
      <div v-if="salesData" class="flex flex-row gap-2 text-xs">
        <span class="font-medium">{{ sales.length }} of {{ salesData.meta.total }} Sales</span>
      </div>
      <MazPagination size="sm" v-if="salesData" :results-size="pageSize" :total-pages="totalPages" active-color="primary" v-model="page" />
    </div>

  </div>
</template>

<style scoped>

</style>