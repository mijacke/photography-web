// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxt/image'],
  css: ['@/assets/css/tailwind.css'],
  image: {
    quality: 100,
    format: ['webp']
  }
})
