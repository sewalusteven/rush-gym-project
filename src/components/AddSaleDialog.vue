<script setup>
import MazSpinner from "maz-ui/components/MazSpinner";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/vue";
import {onMounted, ref, computed, watch} from "vue";
import DropDownSelect from "@/components/DropDownSelect.vue";
import {useUtilities} from "@/composables/useUtilities.js";
import {useMemberStore} from "@/stores/members.js";
import {useServiceStore} from "@/stores/services.js";
import {usePaymentMethodStore} from "@/stores/payment-methods.js";
import {useSaleStore} from "@/stores/sales.js";
import MazInputPrice from 'maz-ui/components/MazInputPrice'
import MazSwitch from 'maz-ui/components/MazSwitch'
import {useTransactionStore} from "@/stores/transactions.js";

const {  showNotification, validateEmail } =  useUtilities()

const emit = defineEmits(['closeDialog'])
const props =  defineProps({
  dialogOpen: {
    type: Boolean,
    default: false
  }
})

const closeDialog = () => {
  emit("closeDialog");
}


const form =  ref({
  amount:0,
  serviceId: "",
  paymentMethodId: "",
  memberId: null,
  narration: ""
})
const isLoading =  ref(false)

const reset =  () => {
  form.value = {
    amount:0,
    serviceId: "",
    paymentMethodId: "",
    memberId: null,
    narration: ""
  }
}



const close = () => {
  emit("closeDialog")
}


const services = computed(() => serviceStore.serviceItems)
const members = computed(() => memberStore.memberItems)
const paymentMethods = computed(() => paymentMethodStore.methodItems)

const serviceStore =  useServiceStore();
const memberStore = useMemberStore()
const paymentMethodStore =  usePaymentMethodStore()
const store = useSaleStore()
const transactionStore =  useTransactionStore()

onMounted(() => {
  serviceStore.fetch()
  memberStore.fetchMembers()
  paymentMethodStore.fetch()
})

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
const memberExists = ref(false)

watch(memberExists, (val) => {
  if(!val){
    form.value.memberId = null
  }
})

</script>

<template>
  <Dialog :open="dialogOpen" @close="close" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-1/2 mx-auto rounded bg-white p-4">
        <DialogTitle class="pb-3 border-b mb-3 flex justify-between">
          <span class="font-bold">Add Sale</span>
          <XMarkIcon class="w-5 h-5 cursor-pointer" @click="closeDialog" />
        </DialogTitle>

        <div class="p-2 mt-4 w-full grid grid-cols-2 gap-2">
          <div class="flex flex-col gap-1">

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
              <span class="font-medium capitalize">Payment Method</span>
              <DropDownSelect :default-value="form.paymentMethodId" default-type="Payment Method" :items="paymentMethods" @chosen-item="(value) => { form.paymentMethodId = value }" />
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Existing Member ?</span>
              <MazSwitch
                  v-model="memberExists"
                  color="primary"
                  name="primary"
                  key="primary"
              />
            </div>


          </div>
          <div class="flex flex-col gap-2">
            <div v-if="memberExists" class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Members</span>
              <DropDownSelect :default-value="form.memberId" default-type="Members" :items="members" @chosen-item="(value) => { form.memberId = value }" />
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Service</span>
              <DropDownSelect :default-value="form.serviceId" default-type="Services" :items="services" @chosen-item="(value) => { form.serviceId = value }" />
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Narration</span>
              <textarea  v-model="form.narration"  class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none"></textarea>
            </div>

            <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>
          </div>

        </div>

      </DialogPanel>
    </div>
  </Dialog>

</template>

<style scoped>

</style>