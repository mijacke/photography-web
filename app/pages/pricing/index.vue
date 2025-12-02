<script setup lang="ts">
import Footer from '@/components/navigation/Footer.vue'
import Header from '@/components/navigation/Header.vue'
import { homeNavLinks } from '@/utils/homeContent'

const navLinks = homeNavLinks

const packages = [
  {
    name: 'Essential',
    price: '€950',
    summary: 'Half-day coverage for intimate gatherings.',
    includes: ['Up to 5 hours on-site', '200+ edited photos', 'Private online gallery', '48h preview set'],
    badge: 'Popular for engagements'
  },
  {
    name: 'Signature',
    price: '€1,700',
    summary: 'Full-day storytelling with room for prep and party.',
    includes: [
      'Up to 10 hours on-site',
      '450+ edited photos',
      'Private online gallery + download',
      'Same-week highlight reel'
    ],
    badge: 'Most booked'
  },
  {
    name: 'Documentary Weekend',
    price: '€2,400',
    summary: 'Multi-day coverage for destination weekends and retreats.',
    includes: [
      'Up to 2 days on-site',
      '700+ edited photos',
      'Story-driven sequencing',
      'Travel within EU included'
    ],
    badge: 'For destination events'
  }
]

const addOns = [
  'Second shooter',
  'Raw clips for socials',
  'Same-day slideshow',
  'Film scans on request'
]
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <Header :links="navLinks" cta-label="Book a date" cta-href="/contact" theme="light" />

    <main class="layout-shell space-y-12 py-14">
      <section class="grid gap-10 rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-sand/70 p-8 shadow-card lg:grid-cols-[1.1fr,0.9fr] lg:p-10">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.28em] text-stone-500">Pricing</p>
          <h1 class="text-4xl font-semibold sm:text-5xl">Clear packages, flexible delivery.</h1>
          <p class="text-lg leading-8 text-stone-700">
            Pick a starting point, then tailor the coverage to your day. Travel within Europe is included on multi-day
            bookings.
          </p>
          <div class="inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 shadow-sm">
            <span class="h-2 w-2 rounded-full bg-olive" />
            Dates open for Q4 & early 2025.
          </div>
        </div>
        <div class="rounded-3xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-charcoal">What you always get</h3>
          <ul class="mt-4 space-y-2 text-sm leading-relaxed text-stone-700">
            <li>Pre-shoot call and shared moodboard</li>
            <li>Story-first edit with consistent color</li>
            <li>Secure gallery with easy sharing + download</li>
            <li>Backup handling and archival for 12 months</li>
          </ul>
        </div>
      </section>

      <section class="grid gap-6 md:grid-cols-3">
        <article
          v-for="pkg in packages"
          :key="pkg.name"
          class="flex h-full flex-col gap-4 rounded-3xl border border-stone-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="space-y-2 px-6 pt-6">
            <p class="text-xs uppercase tracking-[0.28em] text-stone-500">{{ pkg.badge }}</p>
            <div class="flex items-baseline justify-between">
              <h2 class="text-2xl font-semibold text-charcoal">{{ pkg.name }}</h2>
              <span class="text-lg font-semibold text-olive">{{ pkg.price }}</span>
            </div>
            <p class="text-sm leading-relaxed text-stone-700">{{ pkg.summary }}</p>
          </div>
          <ul class="flex flex-1 flex-col gap-2 px-6 pb-6 text-sm leading-relaxed text-stone-700">
            <li v-for="item in pkg.includes" :key="item" class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 rounded-full bg-olive/80" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
          <div class="px-6 pb-6">
            <a
              href="/contact"
              class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-stone-300 bg-sand px-4 py-3 text-sm font-semibold text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              Book {{ pkg.name }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </section>

      <section class="grid gap-8 rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-card md:grid-cols-[1fr,1fr] lg:p-10">
        <div class="space-y-3">
          <p class="text-xs uppercase tracking-[0.28em] text-stone-500">Add-ons</p>
          <h2 class="text-2xl font-semibold">Make it yours</h2>
          <p class="text-base text-stone-700">
            Choose what matches your day. All add-ons can be decided after our intro call — I keep logistics light.
          </p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div
            v-for="item in addOns"
            :key="item"
            class="flex items-center justify-between rounded-2xl border border-stone-200 bg-sand/70 px-4 py-3 text-sm font-medium text-charcoal"
          >
            <span>{{ item }}</span>
            <span aria-hidden="true">+</span>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
