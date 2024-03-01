<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {usePlansStore} from "@/stores/plans";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import MazTable from 'maz-ui/components/MazTable'
import MazTableRow from 'maz-ui/components/MazTableRow'
import MazTableCell from 'maz-ui/components/MazTableCell'
import dateFormat from "dateformat";
import {number} from "maz-ui";
const route = useRoute()

const planStore = usePlansStore()
const page = ref(1)
const pageSize = ref(10)

const plans = computed(() => planStore.plans)

onMounted(() => {
  planStore.fetchPlans()
})
</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>
    <div class="flex lg:flex-row flex-col gap-3">
      <div class="w-4/6 flex flex-col bg-white rounded-sm shadow ">
        <span class=" font-medium p-4 uppercase">{{ route.name }}</span>
        <div class="border "></div>
        <div class="w-full p-4 uppercase">
          <MazTable
              size="sm"
              v-model:page="page"
              v-model:page-size="pageSize"
              :rows="plans"

              color="primary"
              hoverable
              background-even
              :headers="[
                { label:'Id', key:'id' },
                { label:'Duration', key:'duration' },
                { label: 'Price', key:'price'},
                { label: 'Created', key:'createdAt' }
                ]">
            <template #cell-createdAt="{value}">
              {{ dateFormat(value, "dS mmmm , yyyy") }}
            </template>
            <template #cell-price="{value}">
              {{ number(value,'en-UG') }} UGX
            </template>

          </MazTable>
        </div>
      </div>
      <div class="w-2/6 h-fit  flex flex-col bg-white rounded-sm shadow">
        <span class=" font-medium p-4 uppercase">Add Membership Plan</span>
        <div class="border "></div>
        <div class="w-full p-4 flex flex-col">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Station</span>
            <input  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Code</span>
            <input  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Type</span>
            <input  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Region</span>
            <input  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <button class="bg-primary text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>


        </div>
      </div>
    </div>



  </div>
</template>

<style scoped>

</style>