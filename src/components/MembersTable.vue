<script setup>

import {TrashIcon, CurrencyDollarIcon, PencilIcon, ArrowPathIcon  } from "@heroicons/vue/24/outline"
import MazTable from "maz-ui/components/MazTable";
import dateFormat from "dateformat";
import {computed, onMounted, ref} from "vue";
import {useMemberStore} from "@/stores/members.js";
const page = ref(1)
const pageSize = ref(10)
const searchQuery = ref("")
const memberStore = useMemberStore()

const members = computed(() => memberStore.members)

const emits = defineEmits(['openDeleteModal', 'openEditModal', 'openAddPlanModal'])

onMounted(() => {
  memberStore.fetchMembers()
})

function totalAmount (sales) {
  return sales.reduce((sum, obj) => {
    const amount = parseFloat(obj.amount); //Parse each string to a floating point number
    if (!isNaN(amount)) { //Check if the parsing succeeded.
      return sum + amount;
    } else {
      return sum; //Skip the invalid number
    }

  }, 0)
}
</script>

<template>
  <MazTable
      size="sm"
      v-model:search-query="searchQuery"
      v-model:page="page"
      v-model:page-size="pageSize"
      color="secondary"
      hoverable
      search
      pagination
      background-even
      :rows="members"
      :headers="[
                { label: 'Full Name', key:'name' },
                { label: 'Email', key:'email'},
                { label: 'Phone', key: 'phone'},
                { label: 'Sales', key: 'sales'},
                { label: 'Created on', key:'createdAt' },
                ]">

    <template #cell-email="{ value }">
      {{value ? value : 'N/A'}}
    </template>
    <template #cell-phone="{ value }">
      {{value ? value : 'N/A'}}
    </template>
    <template #cell-sales="{ value }">
      <span class="flex flex-col gap-1">
        <span> {{ value.length ?? 0 }}</span>
        <span class="text-xs">{{ totalAmount(value) }} UGX</span>
      </span>
    </template>
    <template #cell-createdAt="{ value }">
      {{dateFormat(value, "dS mmmm , yyyy")}}
    </template>
    <template #actions="{ row }" >
      <div class="flex flex-row gap-1">
        <button @click="() => emits('openAddPlanModal', row)" class="bg-yellow-800 p-2 text-white rounded-full" title="Add to Plan">
          <ArrowPathIcon class="w-4 h-4 " />
        </button>
        <button @click="() => emits('openEditModal', row)" class="bg-blue-800 p-2 text-white rounded-full" title="Edit">
          <PencilIcon class="w-4 h-4 " />
        </button>
        <button @click="() => emits('openDeleteModal', row)" class="bg-red-800 p-2 text-white rounded-full" title="Remove Member">
          <TrashIcon class="w-4 h-4 " />
        </button>
      </div>

    </template>
  </MazTable>
</template>

<style scoped>

</style>