<template>
  <div class="px-4 py-3 flex items-center justify-between sm:px-6">
    <div class="flex-1 flex justify-between sm:hidden">
      <span
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click="$emit('previousPage')" v-show="props.page > 1"> Previous </span>
      <span
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click="$emit('nextPage')"> Next </span>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-white">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{ props.page }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium">{{ props.pages }}</span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ props.count }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <span @click="$emit('previousPage')" v-show="props.page > 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </span>
          <span @click="$emit('nextPage')" v-show="props.page !== props.pages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </span>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'

const props = defineProps({
  page: {type: Number, required: true},
  pages:{type: Number, required: true},
  count: {type: Number, required: true},


})
</script>
<style lang="scss" scoped>
span {
  cursor: pointer;
}
</style>