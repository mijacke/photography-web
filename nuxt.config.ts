// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/critters'],
  css: ['@/assets/css/tailwind.css'],
  critters: {
    config: {
      preload: 'swap'
    }
  },
  app: {
    head: {
      style: [
        {
          innerHTML: `
            body { background-color: #f5f3ec; margin: 0; padding: 0; }
            #__nuxt { min-height: 100vh; }
          `
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
    }
  },
  image: {
    quality: 100,
    format: ['webp']
  }
})
