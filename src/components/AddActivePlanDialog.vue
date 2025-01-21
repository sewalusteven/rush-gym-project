<script setup>
import MazSpinner from "maz-ui/components/MazSpinner";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/vue";
import {onMounted, ref, computed, watch, watchEffect} from "vue";
import DropDownSelect from "@/components/DropDownSelect.vue";
import {useUtilities} from "@/composables/useUtilities.js";
import {useMemberStore} from "@/stores/members.js";

import {usePaymentMethodStore} from "@/stores/payment-methods.js";

import MazInputPrice from 'maz-ui/components/MazInputPrice'

import MazPicker from "maz-ui/components/MazPicker";
import {usePlansStore} from "@/stores/plans.js";
import {useActivePlanStore} from "@/stores/active-plans.js";

const {  showNotification, validateEmail } =  useUtilities()
const form =  ref({
  deposit:0,
  planId: "",
  paymentMethodId: "",
  memberId: "",
  paymentDate: "",
  startDate: ""
})


const emit = defineEmits(['closeDialog'])

const props = defineProps({
  activePlan: {
    type: Object,
    default: () => ({})
  },
})

watchEffect(() => {
  if(props.activePlan && props.activePlan.member && props.activePlan.membershipPlan){
    form.value.memberId = props.activePlan.member.id
    form.value.planId = props.activePlan.membershipPlan.id
  }
})




const isLoading =  ref(false)

const reset =  () => {
  form.value = {
    deposit:0,
    planId: "",
    paymentMethodId: "",
    memberId: "",
    paymentDate: "",
    startDate: ""
  }
}



const close = () => {
  emit("closeDialog")
}


const memberStore = useMemberStore()
const paymentMethodStore =  usePaymentMethodStore()
const planStore =  usePlansStore();
const store =  useActivePlanStore();

const planItems = computed(() => planStore.planItems)
const members = computed(() => memberStore.memberItems)
const paymentMethods = computed(() => paymentMethodStore.methodItems)



const submit = () => {
  isLoading.value =  true;
  store.save(form.value)
}

const response =  computed(() => store.response);
const error =  computed(() => store.errResponse);

watch(response, (value) => {
  if(value && value.message){
    isLoading.value =  false;
    showNotification("Success",value.message, "success")
    store.fetch(1,20)
    reset()
    emit('closeDialog')
  }
})

watch(error, (value) => {
  if(value && value.message){
    isLoading.value =  false;
    showNotification("Error",value.message, "error")
    reset()
    emit('closeDialog')
  }
})

onMounted(() => {
  planStore.fetchPlans()
  memberStore.fetchMembers()
  paymentMethodStore.fetch()
})

const formattedPrice = ref()

</script>

<template>
  <Dialog :open="true" @close="() => false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-1/2 mx-auto rounded bg-white p-4">
        <DialogTitle class="pb-3 border-b mb-3 flex justify-between">
          <span class="font-bold">Add Active Plan</span>
          <XMarkIcon class="w-5 h-5 cursor-pointer" @click="emit('closeDialog')" />
        </DialogTitle>

        <div class="p-2 mt-4 w-full flex flex-col gap-2">

          <div v-if="activePlan.member"  class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Member</span>
            <input :value="activePlan.member.name"  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none disabled:bg-gray-200" disabled>
          </div>

          <div v-else  class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Members</span>
            <DropDownSelect :default-value="form.memberId" default-type="Members" :items="members" @chosen-item="(value) => { form.memberId = value }" />
          </div>

          <div v-if="activePlan.membershipPlan" class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Membership Plan</span>
            <input :value="activePlan.membershipPlan.name"  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none disabled:bg-gray-200" disabled>
          </div>

          <div v-else class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Membership Plan</span>
            <DropDownSelect :default-value="form.planId" default-type="Membership Plan" :items="planItems" @chosen-item="(value) => { form.planId = value }" />
          </div>

          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Start Date</span>
            <MazPicker
                v-model="form.startDate"
                label="Start Date"
                color="primary"
            />
          </div>

          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Payment Method</span>
            <DropDownSelect :default-value="form.paymentMethodId" default-type="Payment Method" :items="paymentMethods" @chosen-item="(value) => { form.paymentMethodId = value }" />
          </div>

          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Deposit</span>
            <MazInputPrice
                v-model="form.deposit"
                label="Enter Amount"
                currency="UGX"
                locale="en-US"
                @formatted="formattedPrice = $event"
            />
          </div>

          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Deposit Date</span>
            <MazPicker
                v-model="form.paymentDate"
                label="Transaction Date"
                color="primary"
            />
          </div>

          <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>

        </div>

      </DialogPanel>
    </div>
  </Dialog>
</template>

<style scoped>

</style>