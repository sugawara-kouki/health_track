<template>
  <form
    class="space-y-6"
    @submit.prevent="$emit('submit')"
  >
    <div class="space-y-4">
      <slot />
    </div>
    <BaseButton
      type="submit"
      variant="primary"
      size="md"
      :block="true"
    >
      <slot name="submit-text">
        送信
      </slot>
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
defineEmits<{ submit: [] }>()
</script>
