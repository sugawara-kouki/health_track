export default defineNuxtRouteMiddleware(() => {
  const { userId } = useAuth()

  // ログインしていなければログイン画面へ遷移する
  if (!userId.value) {
    return navigateTo('/')
  }
})
