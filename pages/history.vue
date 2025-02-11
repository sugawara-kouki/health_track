<template>
  <div class="space-y-6">
    <!-- グラフカード -->
    <div class="bg-white rounded-xl shadow-soft p-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 class="text-xl font-medium text-gray-800">
          体重の推移
        </h2>
        <div class="flex gap-2">
          <button
            v-for="period in periods"
            :key="period.value"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
              selectedPeriod === period.value
                ? 'bg-primary text-white'
                : 'bg-neutral hover:bg-neutral-dark text-gray-600',
            ]"
            @click="selectedPeriod = period.value"
          >
            {{ period.label }}
          </button>
        </div>
      </div>
      <div class="h-[400px]">
        <Line
          v-if="chartData.datasets[0].data.length > 0"
          :data="chartData"
          :options="chartOptions"
        />
        <div
          v-else
          class="h-full flex items-center justify-center text-gray-500"
        >
          データがありません
        </div>
      </div>
    </div>

    <!-- 記録一覧 -->
    <div class="bg-white rounded-xl shadow-soft p-6">
      <h2 class="text-xl font-medium text-gray-800 mb-6">
        記録一覧
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
                アクション
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral">
            <tr
              v-for="record in weightRecords"
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
                <button
                  class="text-red-500 hover:text-red-600 font-medium"
                  @click="deleteRecord(record.id)"
                >
                  削除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

definePageMeta({
  layout: 'auth',
})

const periods = [
  { label: '1ヶ月', value: 30 },
  { label: '3ヶ月', value: 90 },
  { label: '6ヶ月', value: 180 },
]

const selectedPeriod = ref(30)
const { weightRecords, loadData, deleteWeightRecord, getFilteredRecords } = useWeightRecords()

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: '体重 (kg)',
      data: [],
      borderColor: '#81C784',
      backgroundColor: 'rgba(129, 199, 132, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#81C784',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      titleColor: '#000',
      bodyColor: '#666',
      borderColor: '#ddd',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: context => `${context.parsed.y.toFixed(1)} kg`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        color: '#f0f0f0',
      },
      ticks: {
        callback: (value: number) => value.toFixed(1),
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
}

const updateChartData = () => {
  const filteredRecords = getFilteredRecords(selectedPeriod.value)
  chartData.value = {
    labels: filteredRecords.map(record => formatDate(record.date)),
    datasets: [{
      label: '体重 (kg)',
      data: filteredRecords.map(record => Number(record.weight.toFixed(1))),
      borderColor: '#81C784',
      backgroundColor: 'rgba(129, 199, 132, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#81C784',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    }],
  }
}

const deleteRecord = async (id: string) => {
  if (!confirm('この記録を削除してもよろしいですか？')) return

  try {
    deleteWeightRecord(id)
    updateChartData()
  }
  catch (error) {
    console.error('Error deleting record:', error)
    alert('記録の削除中にエラーが発生しました。')
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ja-JP')
}

watch(selectedPeriod, () => {
  updateChartData()
})

onMounted(() => {
  loadData()
  updateChartData()
})
</script>
