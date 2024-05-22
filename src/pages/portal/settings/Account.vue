<script setup>
import {ChevronRightIcon} from "@heroicons/vue/24/outline";
import ProfileUpdate from "@/pages/portal/settings/ProfileUpdate.vue";
import {ref} from "vue";
import ChangePassword from "@/pages/portal/settings/ChangePassword.vue";

const selectedComponent =  ref(ProfileUpdate);
const activeTab =  ref("updateProfile")

const selectComponent = (tab) => {
  activeTab.value = tab
  switch (tab) {
    case "updateProfile":
      selectedComponent.value = ProfileUpdate
      break;
    case "changePassword":
      selectedComponent.value = ChangePassword
      break;
  }
}
</script>

<template>
  <div class="p-7 container-md mx-auto flex flex-col gap-5">
    <div class="flex justify-between items-center gap-2 w-full p-2">
      <span class=" text-gray-700 font-bold">Account Settings</span>
    </div>
    <div class="container bg-white rounded-md shadow-md flex flex-col lg:flex-row">
      <div id="menu" class="lg:w-4/12 border-r  flex flex-col gap-5 ">
        <div id="top-menu" class="flex flex-col  w-full">
          <div @click="selectComponent('updateProfile')" :class="`${activeTab === 'updateProfile' ? 'bg-gray-100': '' } w-full flex flex-row cursor-pointer justify-between items-center gap-2 border-b shadow-sm hover:shadow-md border-gray-300  p-3`">
            <div class="flex flex-col gap-2 p-2">
              <h2 class="text-lg font-medium capitalize">Profile Update</h2>
            </div>
            <ChevronRightIcon class="w-5 h-5" />
          </div>
          <div @click="selectComponent('changePassword')" :class="`${activeTab === 'changePassword' ? 'bg-gray-100': '' } w-full flex flex-row cursor-pointer justify-between items-center gap-2 border-b shadow-sm hover:shadow-md border-gray-300  p-3`">
            <div class="flex flex-col gap-2 p-2">
              <h2 class="text-lg font-medium capitalize">Change Password</h2>
            </div>
            <ChevronRightIcon class="w-5 h-5" />
          </div>
        </div>


      </div>
      <div id="content" class="lg:w-8/12 p-4 flex flex-col gap-2">
        <Component :is="selectedComponent" />

      </div>
    </div>


  </div>
</template>

<style scoped>

</style>