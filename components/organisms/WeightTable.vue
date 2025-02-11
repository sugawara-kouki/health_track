<template>
  <div class="bg-white rounded-xl shadow-soft p-6">
    <h2 class="text-xl font-medium text-gray-800 mb-6">
      最近の記録
    </h2>
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="text-left text-sm font-medium text-gray-500 pb-4">
              日付
            </th>
            <th class="text-left text-sm font-medium text-gray-500 pb-4">
              体重 (kg)
            </th>
            <th class="text-left text-sm font-medium text-gray-500 pb-4">
              前回比
            </th>
            <th class="text-left text-sm font-medium text-gray-500 pb-4">
              変化量
            </th>
            <th class="text-left text-sm font-medium text-gray-500 pb-4">
              目標まで
            </th>
            <th class="text-left text-sm font-medium text-gray-500 pb-4">
              BMI
            </th>
            <th class="text-left text-sm font-medium text-gray-500 pb-4">
              メモ
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral">
          <tr
            v-for="record in recentRecords"
            :key="record.id"
            class="hover:bg-neutral-light"
          >
            <td class="py-4 text-gray-700">
              {{ formatDate(record.date) }}
            </td>
            <td class="py-4 text-gray-800 font-medium">
              {{ record.weight.toFixed(1) }}
            </td>
            <td class="py-4">
              <WeightChangeIndicator
                :value="record.ratio.value"
                :direction="record.ratio.direction"
                :color="record.ratio.color"
              />
            </td>
            <td class="py-4">
              <span :class="getChangeColor(record.change)">
                {{ record.change > 0 ? '+' : '' }}{{ record.change }}
              </span>
            </td>
            <td class="py-4">
              <span :class="getTargetDiffColor(record.targetDiff)">
                {{ record.targetDiff > 0 ? '+' : '' }}{{ record.targetDiff }}
              </span>
            </td>
            <td class="py-4">
              <span :class="record.bmiEvaluation.color">
                {{ record.bmi ?? '-' }}
                <span class="text-xs ml-1">({{ record.bmiEvaluation.text }})</span>
              </span>
            </td>
            <td class="py-4 text-gray-600">
              {{ record.memo || '-' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const { recentRecords } = useWeightRecords()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ja-JP')
}

const getChangeColor = (change: number) => {
  return change > 0 ? 'text-red-500' : change < 0 ? 'text-green-500' : 'text-gray-500'
}

const getTargetDiffColor = (diff: number) => {
  return diff > 0 ? 'text-red-500' : diff < 0 ? 'text-blue-500' : 'text-green-500'
}
</script>
