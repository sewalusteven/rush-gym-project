<script setup>

import PasswordMeter from "vue-simple-password-meter";
import MazSpinner from "maz-ui/components/MazSpinner";
import {computed, reactive, ref, watch} from "vue";
import {useUtilities} from "@/composables/useUtilities.js";
import {useAuthStore} from "@/stores/auth.js";
import {passwordStrength} from "check-password-strength";

const { showNotification } =  useUtilities()
const store = useAuthStore()
const isLoading =  ref(false)

const response =  computed(() => store.response);
const error =  computed(() => store.errResponse);

watch(response, (value) => {
  if(value !== null && value.message){
    isLoading.value =  false;
    showNotification("Success",value.message, "success")
    store.fetchUsers()
    reset()
  }
})

watch(error, (value) => {
  if(value !== null && value.message){
    isLoading.value =  false;
    showNotification("Error",value.message, "error")
    reset()
  }
})

const form =  reactive({
  password: "",
  confirmPassword: "",
  oldPassword: ""
})

const reset = () => {
  form.password = ""
  form.confirmPassword = ""
  form.oldPassword = ""
}

const submit =  () => {
  isLoading.value = true;

  if(passwordStrength(form.password).value === "Weak" || passwordStrength(form.password).value === "Too weak"){
    isLoading.value =  false;
    form.password = ""
    form.confirmPassword = ""
    form.oldPassword = ""
    showNotification("Error","Password is "+passwordStrength(form.password).value ,"error")
    return;
  }

  if(form.password !== form.confirmPassword){
    isLoading.value =  false;
    form.password = ""
    form.confirmPassword = ""
    form.oldPassword = ""
    showNotification("Error","Password mismatch " ,"error")
    return;
  }

  store.changePassword(form);
}

</script>

<template>
  <div class="w-full p-4 flex flex-col">

    <div class="mb-4 flex flex-col gap-1">
      <span class="font-medium capitalize">Old Password</span>
      <input type="password" v-model="form.oldPassword" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
    </div>
    <div class="mb-4 flex flex-col gap-1">
      <span class="font-medium capitalize">Password</span>
      <input type="password" v-model="form.password" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
      <password-meter :password="form.password"/>
    </div>
    <div class="mb-4 flex flex-col gap-1">
      <span class="font-medium capitalize">Confirm Password</span>
      <input type="password" v-model="form.confirmPassword" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
    </div>

    <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>
  </div>
</template>

<style scoped>

</style>