<template>
  <div class="min-h-screen flex bg-white">
    <!-- サイドメニュー -->
    <aside
      :class="[
        'fixed md:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <div class="h-full bg-white border-r border-neutral flex flex-col">
        <!-- ロゴ -->
        <div class="p-6 border-b border-neutral">
          <NuxtLink
            to="/"
            class="flex items-center"
          >
            <span class="text-xl font-bold text-gray-800">健康管理ツール</span>
          </NuxtLink>
        </div>

        <!-- メニュー項目 -->
        <nav class="flex-1 px-4 pt-4 space-y-1">
          <NuxtLink
            to="/dashboard"
            class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-primary-light hover:text-primary-dark transition-colors duration-200"
            active-class="bg-primary-light text-primary-dark font-medium"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span class="ml-3">ホーム</span>
          </NuxtLink>
          <NuxtLink
            to="/history"
            class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-primary-light hover:text-primary-dark transition-colors duration-200"
            active-class="bg-primary-light text-primary-dark font-medium"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span class="ml-3">体重記録</span>
          </NuxtLink>
          <SignedIn>
            <SignOutButton
              redirect-url="/dashboard"
            >
              <button
                class="w-full flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-primary-light hover:text-primary-dark transition-colors duration-200"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span class="ml-3">ログアウト</span>
              </button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
            >
              <button
                class="w-full flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-primary-light hover:text-primary-dark transition-colors duration-200"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span class="ml-3">ログイン</span>
              </button>
            </SignInButton>
          </SignedOut>
        </nav>
        <SignedIn>
          <nav class="flex-1 px-4 pt-4 space-y-1 item-end">
            <div
              class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-primary-light hover:text-primary-dark transition-colors duration-200"
              active-class="bg-primary-light text-primary-dark font-medium"
            >
              <UserButton />
            </div>
          </nav>
        </SignedIn>
      </div>
    </aside>

    <!-- メインコンテンツ -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- モバイルヘッダー -->
      <header class="md:hidden bg-white border-b border-neutral sticky top-0 z-40">
        <div class="px-4 h-16 flex items-center justify-between">
          <button
            class="text-gray-600 hover:text-primary-dark"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span class="text-lg font-medium text-gray-800">健康管理ツール</span>
          <div class="w-6" />
        </div>
      </header>

      <!-- メインコンテンツエリア -->
      <main class="flex-1 bg-neutral-light">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)
</script>
