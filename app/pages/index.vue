<script setup lang="ts">
import { computed } from 'vue'
import HomeContactCta from '@/components/home/HomeContactCta.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomePortfolioPreview from '@/components/home/HomePortfolioPreview.vue'
import HomeServices from '@/components/home/HomeServices.vue'
import StickyHeader from '@/components/navigation/StickyHeader.vue'
import type { Gallery } from '@/types/gallery'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' }
]

const heroCopy = {
  title: 'Mario Lassu',
  eyebrow: 'Documentary Photography',
  description:
    "Don't expect stiff poses or fake smiles on command. The best photos happen when you forget for a moment that the lens is pointed at you. I focus on the atmosphere, the laughter that crinkles your face, and the quiet moments that speak louder than words.",
  ctaLabel: 'Inquiry',
  ctaHref: '#contact',
  imageSrc: '/images/home/homehero.jpg',
  imageAlt: 'Moody portrait in nature'
}

const services = [
  {
    title: 'Wedding',
    bullets: ['Full day / Half day coverage', 'Storytelling & candid moments'],
    stat: '250+ Captured'
  },
  {
    title: 'Event coverage',
    bullets: ['Corporate & private events', 'Real-time documentation'],
    stat: '350+ Events'
  },
  {
    title: 'Commercial',
    bullets: ['Brand & campaign shots', 'Social Media & Marketing Assets'],
    stat: '30+ Brands'
  }
]

const { data: galleries } = await useAsyncData('home-galleries', () =>
  queryCollection('portfolio')
    .select('path', 'title', 'summary', 'cover', 'location', 'date', 'tags')
    .order('date', 'DESC')
    .limit(4)
    .all()
) as { data: Ref<Gallery[] | null> }

const galleryCards = computed<Gallery[]>(() => galleries.value ?? [])

const heroImage = '/images/home/homehero.jpg'
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <!-- Full viewport hero photo -->
    <section class="relative isolate h-screen min-h-[720px] w-full overflow-hidden bg-charcoal text-white">
      <img :src="heroImage" alt="Documentary photo highlight" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-sand/85" />
      <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-sand/70 to-sand" />

      <div class="relative mx-auto flex h-full max-w-5xl items-center justify-center px-6 lg:px-10">
        <div class="max-w-3xl space-y-6 text-center drop-shadow-lg">
          <p class="text-xs uppercase tracking-[0.38em] text-white/80">Documentary photography</p>
          <h1 class="text-4xl font-semibold leading-tight sm:text-5xl">Moments that feel like you.</h1>
          <p class="text-lg text-white/90">
            Natural light, real reactions, clean edits. Scroll to see services and recent stories.
          </p>
          <div class="flex justify-center">
            <a
              href="#about"
              class="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              Explore the work
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <StickyHeader
      :links="navLinks"
      cta-label="Book a date"
      cta-href="#contact"
      theme="light"
    />

    <main class="layout-shell flex flex-col gap-16 pb-20 pt-12">
      <HomeHero
        :title="heroCopy.title"
        :eyebrow="heroCopy.eyebrow"
        :description="heroCopy.description"
        :cta-label="heroCopy.ctaLabel"
        :cta-href="heroCopy.ctaHref"
        :image-src="heroCopy.imageSrc"
        :image-alt="heroCopy.imageAlt"
      />

      <HomeServices :services="services" image-src="/images/home/homehero.jpg" />

      <HomePortfolioPreview :galleries="galleryCards" />

      <HomeContactCta
        title="Ready for your date? I reply within 24 hours."
        subtitle="Share your city, date, and the vibe you're after. I'll propose a lean plan you can react to without long emails."
        cta-label="Message me"
        cta-href="mailto:hi@mariolassu.com"
      />
    </main>
  </div>
</template>
