<script setup lang="ts">
import Footer from '@/components/navigation/Footer.vue'
import Header from '@/components/navigation/Header.vue'
import { homeNavLinks } from '@/utils/homeContent'

const navLinks = homeNavLinks

const highlights = [
  { label: 'Years shooting', value: '10+' },
  { label: 'Stories delivered', value: '600+' },
  { label: 'Avg. response time', value: '< 24h' }
]

const pillars = [
  {
    title: 'Documentary-first',
    description: 'I stay close, listen to the room, and wait for the glance, laugh, or pause that actually matters.'
  },
  {
    title: 'Lean direction',
    description: 'I give minimal prompts to help you forget the camera. Natural posture beats stiff posing.'
  },
  {
    title: 'Delivery with care',
    description: 'Tight edits, consistent color, and a curated story arc you can share without digging.'
  }
]

const timeline = [
  { year: '2014', title: 'Picked up the first DSLR', copy: 'Started shooting street and music events for friends.' },
  { year: '2017', title: 'First full wedding season', copy: 'Learned to stay invisible while keeping timelines on track.' },
  { year: '2021', title: 'Commercial campaigns', copy: 'Branded shoots for lifestyle labels and tech teams.' },
  { year: '2024', title: 'Across Europe', copy: 'Booked for destination weddings and retreats across EU.' }
]
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <Header :links="navLinks" cta-label="Book a date" cta-href="/contact" theme="light" />

    <main class="layout-shell space-y-14 py-14">
      <section class="grid gap-10 rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-card lg:grid-cols-[1.1fr,0.9fr] lg:p-10">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.28em] text-stone-500">About</p>
          <h1 class="text-4xl font-semibold sm:text-5xl">Real moments over perfect poses.</h1>
          <p class="text-lg leading-8 text-stone-700">
            I’m Mario Lassu, a documentary photographer focused on the atmosphere between frames. I shoot weddings,
            events, and brand stories with natural light, clean edits, and an easygoing pace that lets you stay present.
          </p>
          <div class="grid gap-4 sm:grid-cols-3">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="rounded-2xl border border-stone-200 bg-sand px-4 py-5 text-center shadow-sm"
            >
              <p class="text-2xl font-semibold">{{ item.value }}</p>
              <p class="text-xs uppercase tracking-[0.24em] text-stone-600">{{ item.label }}</p>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-3xl border border-stone-200">
          <NuxtImg src="/images/home/homehero.jpg" alt="Documentary portrait" class="h-full w-full object-cover" width="800" height="600" />
        </div>
      </section>

      <section class="grid gap-8 rounded-3xl border border-stone-200 bg-white/70 p-8 shadow-card lg:grid-cols-[0.9fr,1.1fr] lg:p-10">
        <div class="space-y-3">
          <p class="text-xs uppercase tracking-[0.28em] text-stone-500">Approach</p>
          <h2 class="text-3xl font-semibold">What it feels like to work together</h2>
          <p class="text-base text-stone-700">
            I keep the day calm. We plan the essentials, then leave space for the unplanned. You’ll get light prompts,
            clear timelines, and a gallery that reads like a story — not a checklist.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
          <article
            v-for="item in pillars"
            :key="item.title"
            class="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-sand/80 px-4 py-5 shadow-sm"
          >
            <h3 class="text-lg font-semibold text-charcoal">{{ item.title }}</h3>
            <p class="text-sm leading-relaxed text-stone-700">
              {{ item.description }}
            </p>
          </article>
        </div>
      </section>

      <section class="space-y-6 rounded-3xl border border-stone-200 bg-white/90 p-8 shadow-card lg:p-10">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.28em] text-stone-500">Timeline</p>
            <h2 class="text-2xl font-semibold">How the craft grew</h2>
          </div>
          <NuxtLink
            to="/portfolio"
            class="rounded-full border border-stone-300 bg-sand px-4 py-2 text-sm font-medium text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
          >
            View portfolio
          </NuxtLink>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <article
            v-for="item in timeline"
            :key="item.year"
            class="rounded-2xl border border-stone-200 bg-sand/60 px-5 py-4 shadow-sm"
          >
            <p class="text-xs uppercase tracking-[0.28em] text-stone-500">{{ item.year }}</p>
            <h3 class="text-lg font-semibold text-charcoal">{{ item.title }}</h3>
            <p class="text-sm leading-relaxed text-stone-700">{{ item.copy }}</p>
          </article>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
