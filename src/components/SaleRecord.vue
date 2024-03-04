<script setup>

import MazSpinner from "maz-ui/components/MazSpinner";
import MazInputPrice from "maz-ui/components/MazInputPrice";
import {ref} from "vue";

const formattedPrice = ref()
const isLoading =  ref(false)


const form = ref({
  name: "",
  amount: "",
  duration: ""
})
</script>

<template>
  <div class="w-full p-4 flex flex-col">
    <div class="mb-4 flex flex-col gap-1">
      <span class="font-medium capitalize">Service</span>
      <input  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
    </div>
    <div class="mb-4 flex flex-col gap-1">
      <span class="font-medium capitalize">Narration</span>
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

    <button class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>


  </div>
</template>

<style scoped>

</style>