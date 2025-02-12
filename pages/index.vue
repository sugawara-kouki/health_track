<template>
  <div class="flex items-center justify-center min-h-screen text-center">
    <div>
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        健康管理をもっと簡単に
      </h1>
      <p class="text-xl text-gray-600 mb-12">
        毎日の体重記録で、健康的な生活をサポートします
      </p>
      <div class="space-x-4">
        <SignInButton
          mode="modal"
          force-redirect-url="/dashboard"
          sign-up-force-redirect-url="/dashboard"
        >
          <BaseButton
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
          >
            ログインしてダッシュボードへ
          </BaseButton>
        </SignInButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['logged-in']
})
</script>
