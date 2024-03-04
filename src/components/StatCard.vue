<script setup lang="ts">
import type {FunctionalComponent, HTMLAttributes, VNodeProps} from "vue";

interface StatProp {
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>
  stat: Number
  title:String
  from: String
  to:String

}

const props = defineProps<StatProp>()

</script>

<template>
  <div :class="`bg-gradient-to-tr ${from} ${to} p-5 flex gap-2 items-center text-white rounded-md shadow-black shadow-sm`">
    <component :is="icon" class="w-20 h-20"></component>
    <div class="flex flex-col text-end w-full capitalize">
      <h2 class="text-2xl font-medium">{{props.stat}}</h2>
      <span class="text-sm font-medium">{{ props.title }}</span>
    </div>
  </div>

</template>

<style scoped>

</style>