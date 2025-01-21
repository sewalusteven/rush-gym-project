<script setup>
import {Dialog, DialogPanel, DialogTitle} from "@headlessui/vue";



</script>

<template>
  <Dialog :open="true" @close="() => false" class="relative z-50">
    <div class="fixed inset-0 bg-black/30 flex w-screen items-center justify-center p-4">
      <DialogPanel class="w-1/2 mx-auto rounded bg-white p-4">
        <DialogTitle class="pb-3 border-b mb-3 flex justify-between">
          <slot name="header"></slot>
        </DialogTitle>

        <slot name="body"></slot>

      </DialogPanel>
    </div>
  </Dialog>

</template>

<style scoped>

</style>