<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolioList } from '@/composables/usePortfolio'
import { useAppCopy } from '@/composables/useAppCopy'
import { useHeroAutoScroll } from '@/composables/useHeroAutoScroll'
import Footer from '~/components/footer/Footer.vue'
import HomeContactCta from '@/components/home/HomeContactCta.vue'
import HomeCategorySection from '@/components/home/HomeCategorySection.vue'
import Header from '@/components/navigation/Header.vue'
import type { Gallery } from '@/types/gallery'

const { copy } = useAppCopy()

const navLinks = computed(() => copy.value.navigation.links)
const masthead = computed(() => copy.value.home.masthead)
const intro = computed(() => copy.value.home.intro)
const categories = computed(() => copy.value.home.categories)
const contactCopy = computed(() => copy.value.home.contact)
const dateLocale = computed(() => copy.value.meta.dateLocale)

const { data: galleries } = await usePortfolioList({ limit: 4, key: 'home-galleries' })

const galleryCards = computed<Gallery[]>(() => galleries.value ?? [])

const heroImage = computed(() => '/images/home/homehero.jpg')

const { heroSection, headerAnchor } = useHeroAutoScroll()
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <!-- Full viewport hero photo -->
    <section ref="heroSection" class="relative isolate h-screen min-h-[720px] w-full overflow-hidden bg-charcoal text-white">
      <NuxtImg :src="heroImage" :alt="masthead.imageAlt" class="absolute inset-0 h-full w-full object-cover" width="1920" height="1080" loading="eager" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-sand/85" />
      <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-sand/70 to-sand" />

      <div class="relative mx-auto flex h-full max-w-5xl items-center justify-center px-6 lg:px-10">
        <div class="max-w-3xl space-y-6 text-center drop-shadow-lg">
          <p class="text-xs uppercase tracking-[0.38em] text-white/80">{{ masthead.eyebrow }}</p>
          <h1 class="text-4xl font-semibold leading-tight sm:text-5xl">{{ masthead.title }}</h1>
          <p class="text-lg text-white/90">
            {{ masthead.description }}
          </p>
          <div class="flex justify-center">
            <a
              :href="masthead.cta.href"
              class="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              {{ masthead.cta.label }}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <div ref="headerAnchor" />

    <Header
      :links="navLinks"
      :brand-label="copy.navigation.brand"
      theme="light"
    />

    <main class="layout-shell flex flex-col gap-0 pb-20 pt-12">
      <section class="mx-auto max-w-3xl px-6 py-16 text-center lg:py-24">
        <h2 class="text-3xl font-serif text-charcoal sm:text-4xl md:text-5xl">{{ intro.title }}</h2>
        <p class="mt-6 text-lg italic text-charcoal/80 font-serif">{{ intro.subtitle }}</p>
      </section>

      <HomeCategorySection :category="categories.family" />
      <HomeCategorySection :category="categories.maternity" reversed />
      <HomeCategorySection :category="categories.wedding" />
      <HomeCategorySection :category="categories.newborn" reversed />

      <section id="contact">
        <HomeContactCta
          :eyebrow="contactCopy.eyebrow"
          :title="contactCopy.title"
          :subtitle="contactCopy.subtitle"
          :cta-label="contactCopy.cta.label"
          :cta-href="contactCopy.cta.href"
        />
      </section>
    </main>

    <Footer />
  </div>
</template>
