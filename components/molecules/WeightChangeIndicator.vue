<template>
  <div
    class="flex items-center"
    :class="color"
  >
    <span class="mr-1">{{ Math.abs(value) }}%</span>
    <svg
      v-if="direction === 'up'"
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 15l7-7 7 7"
      />
    </svg>
    <svg
      v-else-if="direction === 'down'"
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
    <svg
      v-else
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 12h14"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number
  direction: 'up' | 'down' | 'same'
  color: string
}>()
</script>
