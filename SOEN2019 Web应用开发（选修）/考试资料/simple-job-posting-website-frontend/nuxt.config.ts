// https://nuxt.com/docs/api/configuration/nuxt-config
import ElementPlus from 'unplugin-element-plus/vite'

export default defineNuxtConfig({
  css: ['element-plus/dist/index.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/default.scss" as *;'
        }
      }
    },
    plugins: [ElementPlus()]
  },
  build: {
    transpile: ['element-plus/es']
  }
})
