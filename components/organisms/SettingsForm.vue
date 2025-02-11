<template>
  <div class="bg-white rounded-xl shadow-soft p-6">
    <h2 class="text-xl font-medium text-gray-800 mb-6">
      設定
    </h2>
    <div class="space-y-6">
      <FormField @submit="handleTargetSubmit">
        <BaseInput
          id="targetWeight"
          v-model="targetWeight"
          label="目標体重 (kg)"
          type="number"
          step="0.1"
          required
        />
        <template #submit-text>
          目標を設定
        </template>
      </FormField>

      <div class="pt-4 border-t border-neutral">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-sm font-medium text-gray-800">
              身長
            </h3>
            <p class="text-sm text-gray-600">
              {{ userProfile?.height ? `${userProfile.height} cm` : '未設定' }}
            </p>
          </div>
          <BaseButton
            variant="link"
            size="md"
            @click="$emit('openHeightModal')"
          >
            {{ userProfile?.height ? '変更' : '設定' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { weightTarget, userProfile, saveTargetWeight } = useWeightRecords()

defineEmits<{
  openHeightModal: []
}>()

const targetWeight = ref(weightTarget.value?.target_weight?.toString() || '')

const handleTargetSubmit = () => {
  try {
    saveTargetWeight(parseFloat(targetWeight.value))
    alert('目標体重を設定しました。')
  }
  catch (error) {
    console.error('Error saving target weight:', error)
    alert('目標の保存中にエラーが発生しました。')
  }
}
</script>
