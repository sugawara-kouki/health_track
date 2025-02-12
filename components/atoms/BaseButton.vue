<template>
  <button
    :type="type"
    :class="[
      'font-medium transition-colors duration-200 rounded-lg',
      variant === 'primary' ? 'bg-primary text-white hover:bg-primary-dark' : '',
      variant === 'secondary' ? 'text-gray-600 hover:text-gray-800' : '',
      variant === 'link' ? 'text-primary hover:text-primary-dark' : '',
      block ? 'w-full' : '',
      size === 'sm' ? 'px-4 py-2 text-sm' : '',
      size === 'md' ? 'px-6 py-2.5' : '',
      size === 'lg' ? 'px-8 py-3 text-lg' : ''
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'link'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>
