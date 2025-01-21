<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import MembersTable from "@/components/MembersTable.vue";
import MemberDialog from "@/components/MemberDialog.vue";
import {computed, onMounted, ref, watch} from "vue";
import {UserPlusIcon, XMarkIcon} from "@heroicons/vue/24/outline";
import MazSpinner from "maz-ui/components/MazSpinner";
import MazPicker from "maz-ui/components/MazPicker";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import DropDownSelect from "@/components/DropDownSelect.vue";
import { useUtilities } from "@/composables/useUtilities";
import { useMemberStore } from "@/stores/members";
import { usePlansStore } from "@/stores/plans";

const route = useRoute()
const dialogOpen =  ref(false);

const { getCurrentDate, showNotification, validateEmail } =  useUtilities()

const store =  useMemberStore();

const closeDialog = () => {
  dialogOpen.value = false
}
const openDialog = () => {
  dialogOpen.value = true
}


const form =  ref({
  name:"",
  email: "",
  phone: "",
})

const editForm =  ref({
  email: "",
  phone: "",
})

const isLoading =  ref(false)

const reset =  () => {
  selectedMember.value = null;
  addPlanModal.value = false;
  editModal.value = false;
  deleteModal.value = false;
  dialogOpen.value = false;
  form.value = {
    name:"",
    email: "",
    phone: "",
  }
  editForm.value = {
    email: "",
    phone: "",
  }
}


const phoneObj = ref({isValid: false})


const planStore =  usePlansStore();
const planItems = computed(() => planStore.planItems)

const deleteMember = () => {
  isLoading.value =  true;
  store.remove(selectedMember.value.id)
}
const updateMember = () => {
  isLoading.value =  true;
  store.update(selectedMember.value.id,editForm.value)
}

onMounted(() => {
  planStore.fetchPlans();
  form.value.start = getCurrentDate()
})

const submit = () => {
  isLoading.value =  true;

  if(form.value.email !== "" && !validateEmail(form.value.email)){
    form.value.email = "";
    showNotification("Invalid Email","This is a wrong email", "error")
    isLoading.value =  false;
    return;
  }

  if(form.value.phone && !phoneObj.value.isValid){
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
  if(value && value.message){
    isLoading.value =  false;
    showNotification("Success",value.message, "success")
    store.fetchMembers()
    reset()
  }
})

watch(error, (value) => {
  if(value && value.message){
    isLoading.value =  false;
    showNotification("Error",value.message, "error")
    reset()
  }
})

const editModal = ref(false)
const deleteModal = ref(false)
const addPlanModal = ref(false)
const selectedMember = ref()

const openEditModal = (member) => {
  editModal.value = true;
  editForm.value.email = member.email;
  editForm.value.phone = member.phone;
  selectedMember.value = member
}

const openDeleteModal = (member) => {
  deleteModal.value = true;
  selectedMember.value = member
}

const openAddPlanModal = (member) => {
  addPlanModal.value = true;
  selectedMember.value = member
}

</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>
    <div class="grid lg:grid-cols-12 gap-4">
      <div class="lg:col-span-8">
        <div class="w-full flex flex-col bg-white rounded-sm shadow ">
          <div id="head" class="flex flex-row items-center justify-between p-3 ">
            <span class=" font-medium uppercase">{{ route.name }}</span>
          </div>
          <div class="border "></div>
          <div class="w-full p-4">
            <MembersTable @openEditModal="openEditModal" @openDeleteModal="openDeleteModal" @openAddPlanModal="openAddPlanModal" />
          </div>
        </div>
      </div>
      <div class="lg:col-span-4">
        <div class="w-full flex flex-col bg-white rounded-sm shadow ">
          <div id="head" class="flex flex-row items-center justify-between p-3">
            <span class=" font-medium capitalize">Member Registration</span>
          </div>
          <div class="border "></div>
          <div class="p-4 w-full flex flex-col gap-2">
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
            <button @click="submit" class="bg-indigo-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white uppercase">Submit</span></button>

          </div>
        </div>
      </div>
    </div>

    <MemberDialog v-if="deleteModal">
      <template #header>
        <span class="font-bold">Delete Member Confirmation</span>
        <XMarkIcon class="w-5 h-5 cursor-pointer" @click="() => { deleteModal = false }" />
      </template>
      <template #body>
        <div class="flex flex-col gap-2 w-full text-center" v-if="selectedMember">
          <span> Are you sure you want to delete {{ selectedMember.name }} permanently ?</span>
          <button @click="deleteMember" class="bg-red-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white capitalize">Delete Member</span></button>
        </div>
      </template>
    </MemberDialog>

    <MemberDialog v-if="editModal">
      <template #header>
        <span class="font-bold">Update Member Contacts</span>
        <XMarkIcon class="w-5 h-5 cursor-pointer" @click="() => { editModal = false }" />
      </template>
      <template #body>
        <div class="flex flex-col gap-2 w-full " v-if="selectedMember">
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Email</span>
            <input v-model="editForm.email"  type="email" class="text-gray-600 p-2 border rounded-sm shadow-sm focus:outline-none">
          </div>
          <div class="mb-4 flex flex-col gap-1">
            <span class="font-medium capitalize">Phone</span>
            <MazPhoneNumberInput
                v-model="editForm.phone"
                show-code-on-list
                color="info"
                :preferred-countries="['UG', 'KE']"
                :default-country-code="`UG`"
                @update="phoneObj = $event"
                :success="phoneObj?.isValid"
            />
          </div>

          <button @click="updateMember" class="bg-blue-950 text-white mt-4  w-full py-3 rounded-md shadow-md capitalize justify-center font-bold items-center flex gap-2 "> <MazSpinner v-if="isLoading" size="1.5em"  color="white" /> <span class="text-white capitalize">Update Member</span></button>
        </div>
      </template>
    </MemberDialog>

  </div>
</template>

<style scoped>

</style>