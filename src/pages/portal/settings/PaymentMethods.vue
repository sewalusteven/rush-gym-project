<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {usePaymentMethodStore} from "@/stores/payment-methods";
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

const store = usePaymentMethodStore()
const page = ref(1)
const pageSize = ref(10)
const isLoading =  ref(false)
const actionType =  ref("add")

const methods = computed(() => store.methods)
const form = ref({
  method: "",
  details: ""
})
const formattedPrice = ref()
const { showNotification } =  useUtilities()

onMounted(() => {
  store.fetch()
})

const reset = () => {
  form.value =  {
    method: "",
    details: ""
  }
}

const response =  computed(() => store.response);
const error =  computed(() => store.errResponse);

watch(response, (value) => {
  if(value !== null){
    isLoading.value =  false;
    switch (actionType.value){
      case 'add':
        showNotification("Success","Payment Method Added Successfully", "success")
        reset()
        break;
      case 'remove':
        showNotification("Success","Payment Method Removed Successfully", "success")
        reset()
        break;
    }
    store.fetch()
  }
})

watch(error, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Error","Payment Method not added, Contact Support", "error")
    reset()
  }
})

const submit =  () => {
  isLoading.value =  true;
  actionType.value = "add";

  if(form.value.method === ""){
    showNotification("Invalid Payment Method","please insert a payment method", "error")
    isLoading.value =  false;
    return;
  }

  store.save(form.value)

}

const removeMethod =  (id) => {
  actionType.value = "remove";
  store.remove(id);
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
                { label:'Method', key:'method' },
                { label: 'Details', key:'details'},
                { label: 'Sales', key:'sales'},
                { label: 'Created', key:'createdAt' },
                { label: 'Action'},
                ]">
            <MazTableRow v-if="methods.length !== 0"  v-for="method in methods" :key="method.id">
              <MazTableCell>
                {{ method.id }}
              </MazTableCell>
              <MazTableCell>
                {{ method.method }}
              </MazTableCell>

              <MazTableCell class="flex gap-2 lowercase text-xs">
                {{ method.details }}
              </MazTableCell>
              <MazTableCell >
                {{ method.sales.length }}
              </MazTableCell>
              <MazTableCell>
                {{ dateFormat(method.createdAt, "dS mmmm , yyyy") }}
              </MazTableCell>
              <MazTableCell class="flex flex-row gap-2">
                <button @click="removeMethod(method.id)" class="bg-red-800 p-2 text-white rounded-full" title="approve">
                  <TrashIcon class="w-4 h-4" />
                </button>
              </MazTableCell>
            </MazTableRow>
          </MazTable>
        </div>
      </div>
      <div class="w-full lg:w-2/6 h-fit  flex flex-col bg-white rounded-sm shadow">
        <span class=" font-medium p-4 uppercase">Add Payment Method</span>
        <div class="border "></div>
        <div class="w-full p-4 flex flex-col">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Payment Method</span>
            <input v-model="form.method"  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize p-2">Details</span>
            <textarea v-model="form.details" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"></textarea>
          </div>

          <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>


        </div>
      </div>
    </div>



  </div>
</template>

<style scoped>

</style>