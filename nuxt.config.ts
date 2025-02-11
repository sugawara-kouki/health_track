export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@clerk/nuxt',
  ],
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  app: {
    head: {
      title: '健康管理ツール',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '体重管理と健康記録のためのツール' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap' },
      ],
    },
  },
  runtimeConfig: {
    databaseUrl: 'mysql://root:root@localhost:3306/demo',
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: {
        arrowParens: true,
        blockSpacing: true,
        braceStyle: 'stroustrup',
        commaDangle: 'always',
        flat: true,
        indent: 2,
        quoteProps: 'as-needed',
        quotes: 'single',
        semi: false,
      },
    },
  },
})
