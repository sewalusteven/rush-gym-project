<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useServiceStore} from "@/stores/services";
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

const serviceStore = useServiceStore()
const page = ref(1)
const pageSize = ref(10)
const isLoading =  ref(false)
const actionType =  ref("add")

const services = computed(() => serviceStore.services)
const form = ref({
  service: "",
  price: "",
  description: ""
})
const formattedPrice = ref()
const { showNotification } =  useUtilities()

onMounted(() => {
  serviceStore.fetch()
})

const reset = () => {
  form.value =  {
    service: "",
    price: "",
    description: ""
  }
}

const response =  computed(() => serviceStore.response);
const error =  computed(() => serviceStore.errResponse);

watch(response, (value) => {
  if(value !== null){
    isLoading.value =  false;
    switch (actionType.value){
      case 'add':
        showNotification("Success","Service Added Successfully", "success")
        reset()
        break;
      case 'remove':
        showNotification("Success","Service Removed Successfully", "success")
        reset()
        break;
    }
    serviceStore.fetch()
  }
})

watch(error, (value) => {
  if(value !== null){
    isLoading.value =  false;
    switch (actionType.value){
      case 'add':
        showNotification("Error","Service not added, Contact Support", "error")
        reset()
        break;
      case 'remove':
        showNotification("Error","Service not removed, Contact Support", "error")
        reset()
        break;
    }

  }
})

const submit =  () => {
  isLoading.value =  true;
  actionType.value = "add";

  if(form.value.service === ""){
    showNotification("Invalid Service","please insert a service", "error")
    isLoading.value =  false;
    return;
  }

  if(form.value.price === ""){
    showNotification("Invalid Amount","please insert a plan amount", "error")
    isLoading.value =  false;
    return;
  }

  serviceStore.save(form.value)

}

const removeService =  (id) => {
  actionType.value = "remove";
  serviceStore.remove(id);
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
                { label:'Service', key:'service' },
                { label: 'Price', key:'price'},
                { label: 'Sales', key:'sales'},
                { label: 'Created', key:'createdAt' },
                { label: 'Action'},
                ]">
            <MazTableRow v-if="services.length !== 0"  v-for="service in services" :key="service.id">
              <MazTableCell>
                {{ service.id }}
              </MazTableCell>
              <MazTableCell>
                {{ service.service }}
              </MazTableCell>

              <MazTableCell class="flex gap-2">
                {{ number(service.price,'en-UG') }} UGX
              </MazTableCell>
              <MazTableCell >
                {{ service.sales.length }}
              </MazTableCell>
              <MazTableCell>
                {{ dateFormat(service.createdAt, "dS mmmm , yyyy") }}
              </MazTableCell>
              <MazTableCell class="flex flex-row gap-2">
                <button @click="removeService(service.id)" class="bg-red-800 p-2 text-white rounded-full" title="approve">
                  <TrashIcon class="w-4 h-4" />
                </button>
              </MazTableCell>
            </MazTableRow>
          </MazTable>
        </div>
      </div>
      <div class="w-full lg:w-2/6 h-fit  flex flex-col bg-white rounded-sm shadow">
        <span class=" font-medium p-4 uppercase">Add Service</span>
        <div class="border "></div>
        <div class="w-full p-4 flex flex-col">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Service</span>
            <input v-model="form.service"  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Amount</span>
            <MazInputPrice
                v-model="form.price"
                label="Enter Amount"
                currency="UGX"
                locale="en-US"
                :min="0"
                :max="1000000000"
                @formatted="formattedPrice = $event"
            />
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize p-2">Description</span>
            <textarea v-model="form.description" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"></textarea>
          </div>

          <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>


        </div>
      </div>
    </div>



  </div>
</template>

<style scoped>

</style>