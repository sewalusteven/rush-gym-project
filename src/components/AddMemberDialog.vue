<script setup>
import MazSpinner from "maz-ui/components/MazSpinner";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/vue";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import {onMounted, ref, computed, watch} from "vue";
import {usePlansStore} from "@/stores/plans.js";
import DropDownSelect from "@/components/DropDownSelect.vue";
import MazPicker from "maz-ui/components/MazPicker"
import {useUtilities} from "@/composables/useUtilities.js";
import {useMemberStore} from "@/stores/members.js";

const { getCurrentDate, showNotification, validateEmail } =  useUtilities()

const emit = defineEmits(['closeDialog'])
const store =  useMemberStore()
const props =  defineProps({
  dialogOpen: {
    type: Boolean,
    default: false
  }
})


const form =  ref({
  name:"",
  email: "",
  phone: "",
  planId: "",
  start: ""
})
const isLoading =  ref(false)

const reset =  () => {
  form.value = {
    name:"",
    email: "",
    phone: "",
    planId: "",
    start: getCurrentDate()
  }
}


const phoneObj = ref({isValid: false})

const close = () => {
  emit("closeDialog")
}

const planStore =  usePlansStore();
const planItems = computed(() => planStore.planItems)

onMounted(() => {
  planStore.fetchPlans();
  form.value.start = getCurrentDate()
})

const submit = () => {
  isLoading.value =  true;

  if(!validateEmail(form.value.email)){
    form.value.email = "";
    showNotification("Invalid Email","This is a wrong email", "error")
    isLoading.value =  false;
    return;
  }

  if(!phoneObj.value.isValid){
    form.value.phone= "";
    showNotification("Invalid Phone","This is a wrong phone number", "error")
    isLoading.value =  false;
    return;
  }

  if(form.value.name === ""){
    showNotification("Invalid Name","Please Insert a Name", "error")
    isLoading.value =  false;
    return;
  }
  form.value.phone  =  phoneObj.value.formatNational
  store.save(form.value)
}

const response =  computed(() => store.response);
const error =  computed(() => store.errResponse);

watch(response, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Success","Member Added Successfully", "success")
    store.fetchMembers()
    reset()
    emit('closeDialog')
  }
})

watch(error, (value) => {
  if(value !== null){
    isLoading.value =  false;
    showNotification("Error","Member not added, Contact Support", "error")
    reset()
  }
})

</script>

<template>
  <Dialog :open="dialogOpen" @close="close" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-1/2 mx-auto rounded bg-white p-4">
        <DialogTitle class="pb-3 border-b mb-3 flex justify-between">
          <span class="font-bold">Member Registration</span>
          <XMarkIcon class="w-5 h-5 cursor-pointer" @click="dialogOpen = false" />
        </DialogTitle>

        <div class="p-2 mt-4 w-full grid grid-cols-2 gap-2">
          <div class="flex flex-col gap-1">

            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">FullName</span>
              <input v-model="form.name"  type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Email</span>
              <input v-model="form.email"  type="email" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Phone</span>
              <MazPhoneNumberInput
                  v-model="form.phone"
                  show-code-on-list
                  color="info"
                  :preferred-countries="['UG', 'KE']"
                  :default-country-code="`UG`"
                  @update="phoneObj = $event"
                  :success="phoneObj?.isValid"
              />
            </div>

          </div>
          <div class="flex flex-col gap-2">
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Membership Plan</span>
              <DropDownSelect :default-value="form.planId" default-type="Membership Plan" :items="planItems" @chosen-item="(value) => { form.planId = value }" />
            </div>
            <div class="mb-4 flex flex-col gap-1">
              <span class="font-medium capitalize">Start Date</span>
              <MazPicker
                  v-model="form.start"
                  label="Select Start date"
                  color="primary"
              />
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