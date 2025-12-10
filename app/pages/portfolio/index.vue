<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio | Photography',
  description: 'Browse my photography portfolio featuring family sessions, weddings, newborn, and maternity photography.',
})

// Fetch all portfolio items
const { data: portfolioItems } = await useAsyncData('portfolio-all', () => {
  return queryCollection('portfolio')
    .order('date', 'DESC')
    .all()
})

// Get unique tags for filtering
const allTags = computed(() => {
  if (!portfolioItems.value) return []
  const tags = new Set<string>()
  portfolioItems.value.forEach(item => {
    item.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

const activeFilter = ref<string | null>(null)

const filteredItems = computed(() => {
  if (!portfolioItems.value) return []
  if (!activeFilter.value) return portfolioItems.value
  return portfolioItems.value.filter(item => 
    item.tags?.includes(activeFilter.value!)
  )
})

const setFilter = (tag: string | null) => {
  activeFilter.value = tag
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-cream-100">
      <div class="container-narrow text-center">
        <p class="text-accent text-lg md:text-xl mb-3">
          My Work
        </p>
        <h1 class="text-4xl md:text-5xl font-display text-charcoal-900 mb-6">
          Portfolio
        </h1>
        <p class="text-charcoal-600 max-w-xl mx-auto">
          A collection of my favorite moments captured over the years. 
          Each session tells a unique story of love and connection.
        </p>
      </div>
    </section>

    <!-- Filter Tags -->
    <section v-if="allTags.length > 0" class="py-6 bg-cream-100 border-b border-cream-200">
      <div class="container-wide">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            @click="setFilter(null)"
            :class="[
              'px-4 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-300',
              !activeFilter 
                ? 'bg-charcoal-900 text-white' 
                : 'bg-cream-200 text-charcoal-700 hover:bg-cream-300'
            ]"
          >
            All
          </button>
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="setFilter(tag)"
            :class="[
              'px-4 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-300',
              activeFilter === tag 
                ? 'bg-charcoal-900 text-white' 
                : 'bg-cream-200 text-charcoal-700 hover:bg-cream-300'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section class="section-padding bg-cream-100">
      <div class="container-wide">
        <div 
          v-if="filteredItems && filteredItems.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <TransitionGroup
            enter-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <SectionsPortfolioPortfolioCard
              v-for="item in filteredItems"
              :key="item.path"
              :item="item"
            />
          </TransitionGroup>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <p class="text-charcoal-500 text-lg">
            No portfolio items found.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <SectionsHomeCTASection />
  </div>
</template>
