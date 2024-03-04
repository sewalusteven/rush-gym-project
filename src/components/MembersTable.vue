<script setup>

import MazTableCell from "maz-ui/components/MazTableCell";
import MazTable from "maz-ui/components/MazTable";
import MazTableRow from "maz-ui/components/MazTableRow";
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
      v-model:page="page"
      v-model:page-size="pageSize"
      v-model:search-query="searchQuery"
      pagination
      color="secondary"
      hoverable
      search
      no-search-by
      background-even
      :headers="[
                { label:'No'},
                { label: 'Full Name' },
                { label: 'Email'},
                { label: 'Phone'},
                { label: 'Start Date' },
                { label: 'End Date' },
                { label: 'Plan' },
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
        {{dateFormat(member.createdAt, "dS mmmm , yyyy")}}
      </MazTableCell>

    </MazTableRow>
  </MazTable>
</template>

<style scoped>

</style>