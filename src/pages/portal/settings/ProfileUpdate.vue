<script setup>

import MazSwitch from "maz-ui/components/MazSwitch";
import MazSpinner from "maz-ui/components/MazSpinner";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import {useUtilities} from "@/composables/useUtilities.js";

const form =  reactive({
  name: "",
  email: "",
})
const selectedFile =  ref(null)
const isAdmin =  ref(false)
const isLoading =  ref(false)

const store = useAuthStore()
const { showNotification, validateEmail } =  useUtilities()

const response =  computed(() => store.response);
const error =  computed(() => store.errResponse);

watch(response, (value) => {
  if(value !== null && value.message){
    isLoading.value =  false;
    showNotification("Success",value.message, "success")
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

const reset = () => {
  form.name = ""
  form.email = ""
  isAdmin.value =  false
}

const parseSessionUser = () => {
  const user = localStorage.getItem('user');
  return user !== null ? JSON.parse(user) : null;
}

const user = computed(parseSessionUser);


function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
}

const submit =  () => {
  const formData = new FormData();
  isLoading.value = true;

  if(!validateEmail(form.email)){
    form.email = "";
    showNotification("Invalid Email","This is a wrong email", "error")
    isLoading.value =  false;
    return;
  }

  if (selectedFile.value) {
    showNotification("")
    formData.append('image', selectedFile.value);
  }

  if(isAdmin.value){
    formData.append('role', 'admin');
  }else {
    formData.append('role', 'guest');
  }

  formData.append('name', form.name);
  formData.append('email', form.email);


  store.updateProfile(formData);
}

const setDefaults = (u) => {
  isAdmin.value = u.role === "admin";
  form.email = u.email;
  form.name =  u.name
}

onMounted(() => {
if(user.value){
  setDefaults(user.value)
}
})


</script>

<template>
  <div class="w-full p-4 flex flex-col">
    <div class="mb-4 flex flex-col gap-1">
      <span class="font-medium capitalize">Full Name</span>
      <input v-model="form.name" type="text" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
    </div>
    <div class="mb-4 flex flex-col gap-1">
      <span class="font-medium capitalize">Email</span>
      <input type="email" v-model="form.email" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
    </div>
    <div class="mb-4 flex flex-col gap-1">
      <span class="font-medium capitalize">Profile Photo</span>
      <input type="file" ref="fileInput" @change="handleFileChange" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
      <span class="text-gray-600 italic text-xs">resolution should be 300px by 300px minimum</span>
    </div>

    <div class="mb-4 flex flex-col gap-1 mt-3">
      <span class="font-medium capitalize">Is Administrator?</span>
      <MazSwitch
          v-model="isAdmin"
          color="primary"
          name="primary"
          key="primary"
      />
    </div>

    <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>
  </div>
</template>

<style scoped>

</style>