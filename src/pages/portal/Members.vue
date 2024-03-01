<script setup lang="ts">
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import {useRoute} from "vue-router";
import {useMemberStore} from "@/stores/members";
import {computed, onMounted, ref} from "vue";
import MazTable from 'maz-ui/components/MazTable'
import MazTableRow from 'maz-ui/components/MazTableRow'
import MazTableCell from 'maz-ui/components/MazTableCell'
import dateFormat from "dateformat";

const route = useRoute()
const memberStore = useMemberStore()
const page = ref(1)
const pageSize = ref(10)

const members = computed(() => memberStore.members)

onMounted(() => {
  memberStore.fetchMembers()
})
</script>

<template>
  <div class="p-2 container-md mx-auto flex flex-col gap-5">

    <div class="flex justify-end items-center gap-2 w-full p-2">
      <Breadcrumbs />
    </div>
    <div class="w-full flex flex-col bg-white rounded-sm shadow ">
      <div id="head" class="flex flex-row items-center justify-between p-2 px-3">
        <span class=" font-medium uppercase">{{ route.name }}</span>
        <button class="bg-indigo-950 text-white px-4 py-3 rounded-sm shadow">Add Member</button>
      </div>
      <div class="border "></div>
      <div class="w-full p-4">
        <MazTable
            size="sm"
            v-model:page="page"
            v-model:page-size="pageSize"
            pagination
            color="secondary"
            hoverable
            background-even
            :headers="[
                { label:'No'},
                { label: 'Full Name' },
                { label: 'Email'},
                { label: 'Phone'},
                { label: 'Start Date' },
                { label: 'End Date' },
                { label: 'Plan' },
                { label: 'Duration' },
                { label: 'Created on' },
                ]">
          <MazTableRow  v-for="member in members" :key="member.id">
            <MazTableCell>
              {{ member.id }}
            </MazTableCell>
            <MazTableCell class="capitalize">
              {{ member.name }}
            </MazTableCell>
            <MazTableCell>
              {{ member.email }}
            </MazTableCell>
            <MazTableCell>
              {{ member.phone }}
            </MazTableCell>
            <MazTableCell>
              {{dateFormat(member.start, "dS mmmm , yyyy")}}
            </MazTableCell>
            <MazTableCell>
              {{dateFormat(member.end, "dS mmmm , yyyy")}}
            </MazTableCell>
            <MazTableCell>
              <span class="uppercase">{{ member.membershipPlan.name }}</span>
            </MazTableCell>

            <MazTableCell>
              <span :class="`${member.duration === 'daily' ? 'bg-blue-200 text-blue-800':'bg-red-200 text-red-800'}  px-3 py-1 mx-auto rounded-full`">{{ member.membershipPlan.duration }}</span>
            </MazTableCell>
            <MazTableCell>
              {{dateFormat(member.createdAt, "dS mmmm , yyyy")}}
            </MazTableCell>

          </MazTableRow>
        </MazTable>
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>