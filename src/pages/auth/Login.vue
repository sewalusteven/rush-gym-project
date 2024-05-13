<script setup>
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.js";
import {computed, ref, watch} from "vue";
import {useUtilities} from "@/composables/useUtilities.js";

const router = useRouter()

const authStore =  useAuthStore()
const {showNotification, validateEmail } =  useUtilities()

const payload = ref({
  email: "",
  password: ""
})
const isLoading =  ref(false);

const response = computed(() => {
  return authStore.response;
})

const error = computed(() => {
  return authStore.errResponse ? authStore.errResponse : null;
})

watch(response, (val) => {
  isLoading.value =  false;
  location.reload()


})

watch(error, () => {
  isLoading.value =  false;
  if(error.value){
    showNotification("Error", error.value.message, "error")
  }

})


const submit =  () => {
  isLoading.value =  true;
  if(!validateEmail(payload.value.email)){
    payload.value.email = "";
    showNotification("Invalid Email","This is a wrong email", "error")
    isLoading.value =  false;
    return;
  }

  authStore.login(payload.value)
}

</script>

<template>
<div class="flex flex-col">
  <span class="font-bold text-xl text-indigo-950 text-center uppercase pl-4 pt-3">Rush Gym Login</span>
  <span class="text-center text-indigo-950 font-medium text-xs pb-3">Admin Panel</span>
  <div class="border w-full"></div>
  <div class="flex-col flex gap-2 p-2 px-4 mb-4">
    <span class="capitalize font-medium text-sm ">Email</span>
    <input type="email" v-model="payload.email"  class="border rounded-md p-2 focus:outline-none mb-2">
    <span class="capitalize font-medium text-sm ">Password</span>
    <input type="password" v-model="payload.password"  class="border rounded-md p-2 focus:outline-none mb-2">
    <button @click="submit" class="bg-indigo-900 shadow-md hover:bg-indigo-950 hover:font-bold text-white flex flex-row justify-center w-full py-2 rounded-md "><span>Login</span></button>
  </div>
</div>
</template>

<style scoped>

</style>