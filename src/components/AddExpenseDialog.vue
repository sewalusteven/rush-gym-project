<script setup>
import MazSpinner from "maz-ui/components/MazSpinner";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/vue";
import { ref, computed, watch} from "vue";
import {useUtilities} from "@/composables/useUtilities.js";
import MazInputPrice from 'maz-ui/components/MazInputPrice'
import {useTransactionStore} from "@/stores/transactions.js";
import {useExpenseStore} from "@/stores/expenses.js";

const {  showNotification, validateEmail } =  useUtilities()

const emit = defineEmits(['closeDialog'])
const props =  defineProps({
  dialogOpen: {
    type: Boolean,
    default: false
  }
})


const form =  ref({
  amount:0,
  narration: ""
})
const isLoading =  ref(false)

const reset =  () => {
  form.value ={
    amount:0,
    narration: ""
  }
}



const close = () => {
  emit("closeDialog")
}

const store = useExpenseStore()
const transactionStore =  useTransactionStore()


const submit = () => {
  isLoading.value =  true;
  store.save(form.value)
}

const response =  computed(() => store.response);
const error =  computed(() => store.errResponse);

watch(response, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Success","Transaction Added Successfully", "success")
    transactionStore.fetch(1,10)
    reset()
    emit('closeDialog')
  }
})

watch(error, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Error","Transaction not added, Contact Support", "error")
    reset()
  }
})
const formattedPrice = ref()


</script>

<template>
  <Dialog :open="dialogOpen" @close="close" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-1/2 mx-auto rounded bg-white p-4">
        <DialogTitle class="pb-3 border-b mb-3 flex justify-between">
          <span class="font-bold">Add Expense</span>
          <XMarkIcon class="w-5 h-5 cursor-pointer" @click="dialogOpen = false" />
        </DialogTitle>

        <div class="p-2 mt-4 w-full flex flex-col gap-2">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Amount</span>
            <MazInputPrice
                v-model="form.amount"
                label="Enter Amount"
                currency="UGX"
                locale="en-US"
                @formatted="formattedPrice = $event"
            />
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Narration</span>
            <textarea  v-model="form.narration"  class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"></textarea>
          </div>
          <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>


        </div>

      </DialogPanel>
    </div>
  </Dialog>

</template>

<style scoped>

</style>