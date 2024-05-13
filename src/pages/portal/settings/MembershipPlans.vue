<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {usePlansStore} from "@/stores/plans";
import {useRoute} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import MazTableCell from "maz-ui/components/MazTableCell";
import MazTable from "maz-ui/components/MazTable";
import MazTableRow from "maz-ui/components/MazTableRow";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazInputPrice from 'maz-ui/components/MazInputPrice'
import dateFormat from "dateformat";
import {number} from "maz-ui";
import {useUtilities} from "@/composables/useUtilities";
import { TrashIcon } from "@heroicons/vue/24/outline"
const route = useRoute()

const planStore = usePlansStore()
const page = ref(1)
const pageSize = ref(10)
const isLoading =  ref(false)
const actionType =  ref("add")

const plans = computed(() => planStore.plans)
const form = ref({
  name: "",
  price: "",
  duration: "daily"
})
const formattedPrice = ref()
const { showNotification } =  useUtilities()

onMounted(() => {
  planStore.fetchPlans()
})

const reset = () => {
  form.value =  {
    name: "",
    price: "",
    duration: "daily"
  }
}

const response =  computed(() => planStore.response);
const error =  computed(() => planStore.errResponse);

watch(response, (value) => {
  if(value !== null){
    isLoading.value =  false;
    switch (actionType.value){
      case 'add':
        showNotification("Success","Plan Added Successfully", "success")
        reset()
          break;
      case 'remove':
        showNotification("Success","Plan Removed Successfully", "success")
        reset()
          break;
    }
    planStore.fetchPlans()
  }
})

watch(error, (value) => {
  if(value !== null){
    isLoading.value =  false;
    switch (actionType.value){
      case 'add':
        showNotification("Error","Plan not added, Contact Support", "error")
        reset()
        break;
      case 'remove':
        showNotification("Error","Plan not removed, Contact Support", "error")
        reset()
        break;
    }

  }
})

const submit =  () => {
  isLoading.value =  true;
  actionType.value = "add";

  if(form.value.name === ""){
    showNotification("Invalid Name","please insert a plan name", "error")
    isLoading.value =  false;
    return;
  }

  if(form.value.price === ""){
    showNotification("Invalid Amount","please insert a plan amount", "error")
    isLoading.value =  false;
    return;
  }

  planStore.save(form.value)

}

const removePlan =  (id) => {
  actionType.value = "remove";
  planStore.remove(id);
}
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
              color="primary"
              hoverable
              background-even
              :headers="[
                { label:'Id', key:'id' },
                { label:'Duration', key:'duration' },
                { label: 'Price', key:'price'},
                { label: 'Members', key:'members'},
                { label: 'Created', key:'createdAt' },
                { label: 'Action'},
                ]">
            <MazTableRow v-if="plans.length !== 0"  v-for="plan in plans" :key="plan.id">
              <MazTableCell>
                {{ plan.id }}
              </MazTableCell>
              <MazTableCell>
                <span class="text-center p-1 text-xs bg-blue-50 rounded text-blue-700 border border-blue-600">{{ plan.duration.split("_").join(" ") }}</span>
              </MazTableCell>
              <MazTableCell class="flex gap-2">
                {{ number(plan.price,'en-UG') }} UGX
              </MazTableCell>
              <MazTableCell >
                {{ plan.members.length }}
              </MazTableCell>
              <MazTableCell>
                {{ dateFormat(plan.createdAt, "dS mmmm , yyyy") }}
              </MazTableCell>
              <MazTableCell class="flex flex-row gap-2">
                <button @click="removePlan(plan.id)" class="bg-red-800 p-2 text-white rounded-full" title="approve">
                  <TrashIcon class="w-4 h-4" />
                </button>
              </MazTableCell>
            </MazTableRow>
          </MazTable>
        </div>
      </div>
      <div class="w-full lg:w-2/6 h-fit  flex flex-col bg-white rounded-sm shadow">
        <span class=" font-medium p-4 uppercase">Add Membership Plan</span>
        <div class="border "></div>
        <div class="w-full p-4 flex flex-col">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Plan</span>
            <input v-model="form.name"  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Amount</span>
            <MazInputPrice
                v-model="form.price"
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

          <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>


        </div>
      </div>
    </div>



  </div>
</template>

<style scoped>

</style>