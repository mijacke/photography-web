<script setup lang="ts">
const route = useRoute()

// Get the portfolio item by path
const { data: portfolio } = await useAsyncData(`portfolio-${route.path}`, () => {
  return queryCollection('portfolio')
    .path(route.path)
    .first()
})

// Handle 404
if (!portfolio.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Portfolio item not found'
  })
}

// SEO
useSeoMeta({
  title: `${portfolio.value.title} | Portfolio`,
  description: portfolio.value.summary || `View the ${portfolio.value.title} photography session.`,
  ogImage: portfolio.value.cover,
})

// Format date
const formattedDate = computed(() => {
  if (!portfolio.value?.date) return null
  const date = new Date(portfolio.value.date)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})
</script>

<template>
  <div v-if="portfolio">
    <!-- Hero with Cover Image -->
    <section class="relative h-[60vh] min-h-[400px] flex items-end">
      <div class="absolute inset-0">
        <NuxtImg
          v-if="portfolio.cover"
          :src="portfolio.cover"
          :alt="portfolio.title"
          class="w-full h-full object-cover"
          sizes="100vw"
          loading="eager"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/30 to-transparent"></div>
      </div>
      
      <div class="relative z-10 container-wide pb-12 md:pb-16 text-white">
        <NuxtLink 
          to="/portfolio" 
          class="inline-flex items-center gap-2 text-cream-200 hover:text-white mb-4 transition-colors"
        >
          <img src="/svg/icons/corner-down-right.svg" alt="" class="h-4 w-4 rotate-[135deg] invert" />
          Back to Portfolio
        </NuxtLink>
        
        <h1 class="text-4xl md:text-5xl font-display text-white mb-4">
          {{ portfolio.title }}
        </h1>
        
        <div class="flex flex-wrap items-center gap-4 text-cream-200/80">
          <span v-if="formattedDate">{{ formattedDate }}</span>
          <span v-if="portfolio.location" class="flex items-center gap-1">
            <img src="/svg/icons/location.svg" alt="" class="h-4 w-4 invert opacity-80" />
            {{ portfolio.location }}
          </span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section-padding bg-cream-100">
      <div class="container-narrow">
        <!-- Summary -->
        <div v-if="portfolio.summary" class="mb-12 text-center">
          <p class="text-lg md:text-xl text-charcoal-600 leading-relaxed italic">
            "{{ portfolio.summary }}"
          </p>
        </div>

        <!-- Tags -->
        <div v-if="portfolio.tags && portfolio.tags.length > 0" class="flex justify-center gap-3 mb-12">
          <span 
            v-for="tag in portfolio.tags" 
            :key="tag"
            class="px-4 py-2 text-xs uppercase tracking-wider bg-warm-400/10 text-warm-600"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Markdown Content -->
        <div class="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-charcoal-900 prose-p:text-charcoal-600 prose-a:text-warm-500 prose-a:no-underline hover:prose-a:underline">
          <ContentRenderer :value="portfolio" />
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="py-8 bg-cream-200 border-t border-cream-300">
      <div class="container-wide">
        <div class="flex justify-center gap-4">
          <UiAppButton to="/portfolio" variant="outline" size="sm">
            ← All Galleries
          </UiAppButton>
          <UiAppButton to="/contact" variant="primary" size="sm">
            Book Similar Session
          </UiAppButton>
        </div>
      </div>
    </section>
  </div>
</template>
