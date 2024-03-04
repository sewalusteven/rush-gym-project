<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {usePlansStore} from "@/stores/plans";
import {useRoute} from "vue-router";
import {computed, onMounted, ref} from "vue";
import MazTable from 'maz-ui/components/MazTable'
import MazSpinner from "maz-ui/components/MazSpinner";
import MazInputPrice from 'maz-ui/components/MazInputPrice'
import dateFormat from "dateformat";
import {number} from "maz-ui";
const route = useRoute()

const planStore = usePlansStore()
const page = ref(1)
const pageSize = ref(10)
const isLoading =  ref(false)

const plans = computed(() => planStore.plans)
const form = ref({
  name: "",
  amount: "",
  duration: ""
})
const formattedPrice = ref()

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
      <div class="w-full lg:w-4/6 flex flex-col bg-white rounded-sm shadow ">
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
      <div class="w-full lg:w-2/6 h-fit  flex flex-col bg-white rounded-sm shadow">
        <span class=" font-medium p-4 uppercase">Add Membership Plan</span>
        <div class="border "></div>
        <div class="w-full p-4 flex flex-col">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Plan</span>
            <input  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Amount</span>
            <MazInputPrice
                v-model="form.amount"
                label="Enter Amount"
                currency="UGX"
                locale="en-US"
                :min="500"
                :max="1000000"
                @formatted="formattedPrice = $event"
            />
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize p-2">Duration</span>
            <div class="flex items-center gap-3 w-full px-2 uppercase">
              <span class="text-gray-500">
                <input type="radio" class="w-5 h-5" value="daily" v-model="form.duration"> <span class="capitalize">Daily</span>
              </span>
              <span class="capitalize text-gray-500">
                <input type="radio" class="w-5 h-5" value="weekly" v-model="form.duration"> <span class="capitalize">Weekly</span>
              </span>
              <span class="capitalize text-gray-500">
                <input type="radio" class="w-5 h-5" value="monthly" v-model="form.duration"> <span class="capitalize">Monthly</span>
              </span>
              <span class="capitalize text-gray-500">
                <input type="radio" class="w-5 h-5" value="yearly" v-model="form.duration"> <span class="capitalize">Yearly</span>
              </span>

            </div>
          </div>

          <button class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>


        </div>
      </div>
    </div>



  </div>
</template>

<style scoped>

</style>