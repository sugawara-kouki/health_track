<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
      <h3 class="text-xl font-medium text-gray-800 mb-4">
        身長を設定
      </h3>
      <p class="text-gray-600 mb-4">
        BMIを正確に計算するために身長を入力してください。
      </p>
      <FormField @submit="handleSubmit">
        <BaseInput
          id="height"
          v-model="height"
          label="身長（cm）"
          type="number"
          step="0.1"
          required
        />
        <template #submit-text>
          保存
        </template>
      </formfield>
      <div class="mt-4 flex justify-end">
        <BaseButton
          variant="secondary"
          size="md"
          @click="$emit('update:modelValue', false)"
        >
          キャンセル
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// コンポーサブルから値取得
const { userProfile, saveUserProfile } = useWeightRecords()

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const height = ref(userProfile.value?.height?.toString() || '')
const handleSubmit = () => {
  try {
    saveUserProfile(parseFloat(height.value))
    emit('update:modelValue', false)
  }
  catch (e) {
    console.error(e)
    alert('身長の保存中にエラーが発生しました。')
  }
}
</script>
