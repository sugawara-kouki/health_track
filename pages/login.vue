<template>
  <div class="min-h-[calc(100vh-12rem)] flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
      <div>
        <h2 class="text-center text-3xl font-bold text-gray-900">
          {{ isLogin ? 'ログイン' : '新規登録' }}
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        @submit.prevent="handleSubmit"
      >
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label
              for="email"
              class="sr-only"
            >メールアドレス</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="メールアドレス"
            >
          </div>
          <div>
            <label
              for="password"
              class="sr-only"
            >パスワード</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="パスワード"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {{ isLogin ? 'ログイン' : '登録する' }}
          </button>
        </div>

        <div class="text-center">
          <button
            type="button"
            class="text-sm text-primary hover:text-primary-dark"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? '新規登録はこちら' : 'ログインはこちら' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const isLogin = ref(true)
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    // ダミーの認証処理
    localStorage.setItem('user', JSON.stringify({ email: email.value }))
    router.push('/dashboard')
  }
  catch (error) {
    console.error('Authentication error:', error)
    alert('エラーが発生しました。もう一度お試しください。')
  }
}
</script>
