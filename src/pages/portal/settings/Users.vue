<script setup>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import {computed, onMounted, reactive, ref, watch} from "vue";
import MazTable from "maz-ui/components/MazTable";
import MazSpinner from "maz-ui/components/MazSpinner";
import dateFormat from "dateformat";
import {useUtilities} from "@/composables/useUtilities";
import { useAuthStore } from "@/stores/auth";
import MazSwitch from "maz-ui/components/MazSwitch";
import { passwordStrength } from 'check-password-strength'
import PasswordMeter from 'vue-simple-password-meter';

const route = useRoute()
const page = ref(1)
const pageSize = ref(10)
const searchQuery = ref("");
const store = useAuthStore()
const isLoading =  ref(false)

const users = computed(() => store.users)

const { showNotification, validateEmail } =  useUtilities()

onMounted(() => {
  store.fetchUsers()
})


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

const reset = () => {
  form.name = ""
  form.email = ""
  form.password = ""
  form.confirmPassword = ""
  isAdmin.value =  false
}

const selectedFile =  ref(null)
const isAdmin =  ref(false)

function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
}

const form =  reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
})


const submit =  () => {
  const formData = new FormData();
  isLoading.value = true;

  if(!validateEmail(form.email)){
    form.email = "";
    showNotification("Invalid Email","This is a wrong email", "error")
    isLoading.value =  false;
    return;
  }

  if(passwordStrength(form.password).value === "Weak" || passwordStrength(form.password).value === "Too weak"){
    isLoading.value =  false;
    form.password = ""
    form.confirmPassword = ""
    showNotification("Error","Password is "+passwordStrength(form.password).value ,"error")
    return;
  }

  if(form.password !== form.confirmPassword){
    isLoading.value =  false;
    form.password = ""
    form.confirmPassword = ""
    showNotification("Error","Password mismatch " ,"error")
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

  formData.append('password', form.password);
  formData.append('password_confirmation', form.confirmPassword);
  formData.append('name', form.name);
  formData.append('email', form.email);


  store.registerUser(formData);
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
        <div class="w-full p-4">
          <MazTable
              size="sm"
              v-model:page="page"
              v-model:page-size="pageSize"
              v-model:search-query="searchQuery"
              :rows="users"
              pagination
              color="primary"
              hoverable
              noSearchBy
              search
              background-even
              :headers="[
                { label:'Name', key:'name' },
                { label:'Email', key:'email' },
                { label: 'Role', key:'role'},
                { label: 'Created', key:'createdAt' }
                ]">
            <template #cell-createdAt="{value}">
              {{ dateFormat(value, "dS mmmm , yyyy") }}
            </template>
            <template #cell-role="{value}">
              {{ value.toUpperCase() }}
            </template>

          </MazTable>

        </div>
      </div>
      <div class="w-full lg:w-2/6 h-fit  flex flex-col bg-white rounded-sm shadow">
        <span class=" font-medium p-4 uppercase">Add User</span>
        <div class="border "></div>
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
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Password</span>
            <input type="password" v-model="form.password" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
            <password-meter :password="form.password"/>
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Confirm Password</span>
            <input type="password" v-model="form.confirmPassword" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
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
      </div>
    </div>



  </div>
</template>

<style scoped>

</style>