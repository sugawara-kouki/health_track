<template>
  <div class="space-y-6">
    <HeightModal v-model="showHeightModal" />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <WeightForm />
      <SettingsForm @open-height-modal="showHeightModal = true" />
    </div>

    <WeightTable />
    Height: {{ height }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['auth']
})

const { user } = useUser()
const { loadData, userProfile, getHeight, height } = useWeightRecords()
const showHeightModal = ref(!userProfile.value?.height)
await getHeight(user.value?.id ?? '')

onMounted(() => {
  loadData()
})
</script>
