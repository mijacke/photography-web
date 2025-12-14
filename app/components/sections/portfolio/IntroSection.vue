<script setup lang="ts">
interface Props {
  subtitle?: string
  title: string
  image?: string
  imageAlt?: string
}

withDefaults(defineProps<Props>(), {
  subtitle: '',
  image: '',
  imageAlt: 'Portfolio image'
})
</script>

<template>
  <section class="section-padding bg-white">
    <div class="container-wide">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Image Side -->
        <div class="relative">
          <div class="aspect-[4/5] overflow-hidden">
            <NuxtImg
              v-if="image"
              :src="image"
              :alt="imageAlt"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <!-- Decorative frame -->
          <div class="absolute -bottom-4 -right-4 w-full h-full border-2 border-warm-400 -z-10 hidden lg:block"></div>
        </div>

        <!-- Text Side -->
        <div class="lg:pl-8">
          <p v-if="subtitle" class="text-accent text-xl md:text-2xl mb-3">
            {{ subtitle }}
          </p>
          
          <h2 class="text-3xl md:text-4xl font-display text-charcoal-900 mb-6">
            {{ title }}
          </h2>
          
          <div class="space-y-4 text-charcoal-600 leading-relaxed">
            <slot />
          </div>
          
          <div class="mt-8">
            <UiAppButton to="/contact" variant="outline">
              Kontaktujte ma
            </UiAppButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
