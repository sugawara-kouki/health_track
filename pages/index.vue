<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">
      健康管理をもっと簡単に
    </h1>
    <p class="text-xl text-gray-600 mb-12">
      毎日の体重記録で、健康的な生活をサポートします
    </p>
    <div class="space-x-4">
      <NuxtLink
        to="/login"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
      >
        始める
      </NuxtLink>
    </div>
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton mode="modal" />
    </SignedOut>
  </div>
</template>
