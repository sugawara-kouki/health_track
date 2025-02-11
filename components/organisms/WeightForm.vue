<template>
  <div class="bg-white rounded-xl shadow-soft p-6">
    <h2 class="text-xl font-medium text-gray-800 mb-6">
      体重を記録
    </h2>
    <FormField @submit="handleSubmit">
      <BaseInput
        id="weight"
        v-model="weight"
        label="体重 (kg)"
        type="number"
        step="0.1"
        required
      />
      <BaseInput
        id="date"
        v-model="date"
        label="日付"
        type="date"
        required
      />
      <BaseInput
        id="memo"
        v-model="memo"
        label="メモ"
        type="text"
        placeholder="運動内容や体調など"
      />
      <template #submit-text>
        記録する
      </template>
    </FormField>
  </div>
</template>

<script setup lang="ts">
const { saveWeightRecord } = useWeightRecords()

const weight = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const memo = ref('')

const handleSubmit = () => {
  try {
    saveWeightRecord(parseFloat(weight.value), date.value, memo.value)
    weight.value = ''
    memo.value = ''
    date.value = new Date().toISOString().split('T')[0]
  }
  catch (error) {
    console.error('Error saving weight record:', error)
    alert('記録の保存中にエラーが発生しました。')
  }
}
</script>
