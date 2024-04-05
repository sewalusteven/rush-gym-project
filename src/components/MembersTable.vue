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

onMounted(() => {
  memberStore.fetchMembers()
})
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
                { label:'No', key:'id'},
                { label: 'Full Name', key:'name' },
                { label: 'Email', key:'email'},
                { label: 'Phone', key: 'phone'},
                { label: 'Start Date', key:'start' },
                { label: 'Renew Date', key:'end' },
                { label: 'Plan', key:'membershipPlan' },
                { label: 'Created on', key:'createdAt' },
                ]">
    <template #cell-start="{ value }">
      {{dateFormat(value, "dS mmmm , yyyy")}}
    </template>
    <template #cell-end="{ value }">
      {{dateFormat(value, "dS mmmm , yyyy")}}
    </template>
    <template #cell-membershipPlan="{ value }">
      <span class="uppercase">{{ value.name }}</span>
    </template>
    <template #cell-createdAt="{ value }">
      {{dateFormat(value, "dS mmmm , yyyy")}}
    </template>
    <template #actions="{ row }" >
      <div class="flex flex-row gap-1">
        <button class="bg-green-800 p-2 text-white rounded-full" title="Register Sale">
          <CurrencyDollarIcon class="w-4 h-4 " />
        </button>
        <button class="bg-yellow-800 p-2 text-white rounded-full" title="Renew Membership">
          <ArrowPathIcon class="w-4 h-4 " />
        </button>
        <button class="bg-blue-800 p-2 text-white rounded-full" title="Edit">
          <PencilIcon class="w-4 h-4 " />
        </button>
        <button class="bg-red-800 p-2 text-white rounded-full" title="Remove Member">
          <TrashIcon class="w-4 h-4 " />
        </button>
      </div>

    </template>
  </MazTable>
</template>

<style scoped>

</style>