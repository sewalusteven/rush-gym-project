<template>
  <div class="w-full">
    <Listbox v-model="selectedItem">
      <div class="relative ">
        <ListboxButton
            class="relative w-full cursor-default bg-white border rounded-sm  p-2 h-10 text-base  text-left   focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm"
        >
          <span class="block truncate capitalize">{{ selectedItem.label}}</span>
          <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <ListboxOptions
              class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base text-gray-500 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
                v-slot="{ active, selected }"
                v-for="item in items"
                :key="item.value"
                :value="item"
                as="template"
                @click="emit('chosenItem', selectedItem.value)"
            >
              <li
                  :class="[
                  active ? 'bg-primary-100 text-primary-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4 ',
                ]"
              >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate capitalize',
                  ]"
                >{{ item.label }}</span
                >
                <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'


const props =  defineProps({
  items: {
    type: Array,
    default: () => []
  },
  defaultValue: {
    type: String,
    default: ""
  },
  defaultType: {
    default:"",
    type: String
  }
})

const selectedItem = ref(props.items[0])

watch(props, (value) => {
  if(props.defaultValue === ""){
    selectedItem.value = {label: `Select ${props.defaultType}`, value: ""}
  }
})

 const emit = defineEmits(['chosenItem'])


</script>
