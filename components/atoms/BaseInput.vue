<template>
  <div>
    <label
      :for="id"
      class="block text-sm font-medium text-gray-600"
    >{{ label }}</label>
    <div class="mt-2">
      <input
        :id="id"
        v-model="inputValue"
        :type="type"
        :step="step"
        :required="required"
        :placeholder="placeholder"
        class="block w-full px-4 py-2.5 rounded-lg border border-neutral-dark focus:border-primary focus:ring-1 focus:ring-primary text-gray-800"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  modelValue: string | number
  type?: string
  step?: string
  required?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>
