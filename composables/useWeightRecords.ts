import { ref, computed } from 'vue'

interface WeightRecord {
  id: string
  weight: number
  date: string
  created_at: string
  memo?: string
}

interface WeightTarget {
  target_weight: number
  updated_at: string
}

interface UserProfile {
  height: number
  updated_at: string
}

export const useWeightRecords = () => {
  const weightRecords = ref<WeightRecord[]>([])
  const weightTarget = ref<WeightTarget | null>(null)
  const userProfile = ref<UserProfile | null>(null)
  const height = ref<number | null>(null)

  // BMIの計算
  const calculateBMI = (weight: number) => {
    if (!userProfile.value?.height) return null
    const heightInMeters = userProfile.value.height / 100
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1))
  }

  // BMIの評価
  const evaluateBMI = (bmi: number | null) => {
    if (bmi === null) return { text: '身長未設定', color: 'text-gray-400' }
    if (bmi < 18.5) return { text: '低体重', color: 'text-blue-600' }
    if (bmi < 25) return { text: '普通体重', color: 'text-green-600' }
    if (bmi < 30) return { text: '肥満（1度）', color: 'text-yellow-600' }
    if (bmi < 35) return { text: '肥満（2度）', color: 'text-orange-600' }
    return { text: '肥満（3度以上）', color: 'text-red-600' }
  }

  // 前回比の計算と評価
  const calculateRatio = (current: number, previous: number) => {
    const ratio = ((current - previous) / previous) * 100
    return {
      value: Number(ratio.toFixed(1)),
      direction: ratio > 0 ? 'up' : ratio < 0 ? 'down' : 'same',
      color: ratio > 0 ? 'text-red-500' : ratio < 0 ? 'text-green-500' : 'text-gray-500'
    }
  }

  // ダミーデータの生成
  const generateDummyData = () => {
    const today = new Date()
    const dummyData: WeightRecord[] = []

    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      dummyData.push({
        id: crypto.randomUUID(),
        weight: Number((70 + Math.random() * 2 - 1).toFixed(1)),
        date: date.toISOString().split('T')[0],
        created_at: date.toISOString(),
        memo: i % 3 === 0 ? 'ジョギング30分' : undefined
      })
    }

    return dummyData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  // Load data from localStorage
  const loadData = () => {
    const storedRecords = localStorage.getItem('weightRecords')
    if (storedRecords) {
      weightRecords.value = JSON.parse(storedRecords)
    }
    else {
      weightRecords.value = generateDummyData()
      localStorage.setItem('weightRecords', JSON.stringify(weightRecords.value))
    }

    const storedTarget = localStorage.getItem('weightTarget')
    if (storedTarget) {
      weightTarget.value = JSON.parse(storedTarget)
    }
    else {
      weightTarget.value = {
        target_weight: 65.0,
        updated_at: new Date().toISOString()
      }
      localStorage.setItem('weightTarget', JSON.stringify(weightTarget.value))
    }

    const storedProfile = localStorage.getItem('userProfile')
    if (storedProfile) {
      userProfile.value = JSON.parse(storedProfile)
    }
  }

  // Save user profile
  const saveUserProfile = (height: number) => {
    userProfile.value = {
      height: Number(height.toFixed(1)),
      updated_at: new Date().toISOString()
    }
    localStorage.setItem('userProfile', JSON.stringify(userProfile.value))
  }

  // Save weight record
  const saveWeightRecord = (weight: number, date: string, memo?: string) => {
    const newRecord: WeightRecord = {
      id: crypto.randomUUID(),
      weight: Number(weight.toFixed(1)),
      date,
      created_at: new Date().toISOString(),
      memo
    }
    weightRecords.value.push(newRecord)
    localStorage.setItem('weightRecords', JSON.stringify(weightRecords.value))
  }

  // Delete weight record
  const deleteWeightRecord = (id: string) => {
    weightRecords.value = weightRecords.value.filter((record) => record.id !== id)
    localStorage.setItem('weightRecords', JSON.stringify(weightRecords.value))
  }

  // Save target weight
  const saveTargetWeight = (target_weight: number) => {
    weightTarget.value = {
      target_weight: Number(target_weight.toFixed(1)),
      updated_at: new Date().toISOString()
    }
    localStorage.setItem('weightTarget', JSON.stringify(weightTarget.value))
  }

  // 身長データの取得
  const getHeight = async (id: string) => {
    try {
      const { data, error: fetchError } = await useFetch('/api/height', {
        params: {
          userId: id
        }
      })

      if (fetchError.value || !data.value?.data) {
        throw new Error(fetchError.value?.message)
      }

      console.log(data.value.data)
      height.value = (data.value.data as { height: number }).height
    }
    catch (error) {
      console.error('error:', error)
      throw new Error(`${error}`)
    }
  }

  // Get recent records with additional info
  const recentRecords = computed(() => {
    const records = [...weightRecords.value]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)

    return records.map((record, index) => {
      const prevRecord = records[index + 1]
      const change = prevRecord ? Number((record.weight - prevRecord.weight).toFixed(1)) : 0
      const ratio = prevRecord ? calculateRatio(record.weight, prevRecord.weight) : { value: 0, direction: 'same', color: 'text-gray-500' }
      const targetDiff = weightTarget.value ? Number((record.weight - weightTarget.value.target_weight).toFixed(1)) : 0
      const bmi = calculateBMI(record.weight)
      const bmiEvaluation = evaluateBMI(bmi)

      return {
        ...record,
        change,
        ratio,
        targetDiff,
        bmi,
        bmiEvaluation
      }
    })
  })

  // Get filtered records by period
  const getFilteredRecords = (days: number) => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    return weightRecords.value
      .filter((record) => new Date(record.date) >= startDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  return {
    weightRecords,
    weightTarget,
    userProfile,
    loadData,
    saveWeightRecord,
    deleteWeightRecord,
    saveTargetWeight,
    saveUserProfile,
    recentRecords,
    getFilteredRecords,
    calculateBMI,
    evaluateBMI,
    height,
    getHeight
  }
}
