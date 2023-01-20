export default defineNuxtRouteMiddleware((to, _) => {
  if (!['/', '/login', '/register', '/about'].includes(to.path) && !isLoggedIn()) {
    return navigateTo('/login')
  }
})
