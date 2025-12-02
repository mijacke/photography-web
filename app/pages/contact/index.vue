<script setup lang="ts">
import Footer from '@/components/navigation/Footer.vue'
import Header from '@/components/navigation/Header.vue'
import { homeNavLinks } from '@/utils/homeContent'
import { footerEmail, footerLocation } from '@/utils/footerContent'

const navLinks = homeNavLinks

const contacts = [
  { label: 'Email', value: footerEmail, href: `mailto:${footerEmail}` },
  { label: 'Location', value: footerLocation },
  { label: 'Response', value: 'Usually within 24 hours' }
]
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <Header :links="navLinks" cta-label="Book a date" cta-href="/contact" theme="light" />

    <main class="layout-shell space-y-12 py-14">
      <section class="grid gap-10 rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-sand/70 p-8 shadow-card lg:grid-cols-[1.05fr,0.95fr] lg:p-10">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.28em] text-stone-500">Contact</p>
          <h1 class="text-4xl font-semibold sm:text-5xl">Tell me about your date.</h1>
          <p class="text-lg leading-8 text-stone-700">
            Share the city, timing, and vibe you want. I’ll send back a lean plan you can react to without long threads.
          </p>
          <div class="space-y-2 text-sm text-stone-700">
            <p>Available across Europe for weddings, events, and brand stories.</p>
            <p class="font-semibold text-charcoal">Prefer a call? Add your number in the message.</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a
              href="mailto:hi@mariolassu.com"
              class="inline-flex items-center gap-2 rounded-full bg-olive px-5 py-3 text-sm font-semibold text-sand shadow-lg shadow-olive/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Send an email
              <span aria-hidden="true">↗</span>
            </a>
            <NuxtLink
              to="/portfolio"
              class="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-charcoal shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            >
              See recent work
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-4 rounded-3xl border border-stone-200 bg-white/85 p-6 shadow-sm">
          <div class="grid gap-3 sm:grid-cols-2">
            <div
              v-for="item in contacts"
              :key="item.label"
              class="rounded-2xl border border-stone-200 bg-sand/70 px-4 py-3 text-sm"
            >
              <p class="text-xs uppercase tracking-[0.24em] text-stone-600">{{ item.label }}</p>
              <p class="text-base font-semibold text-charcoal">
                <a v-if="item.href" :href="item.href" class="transition hover:text-olive">
                  {{ item.value }}
                </a>
                <span v-else>{{ item.value }}</span>
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <p class="text-xs uppercase tracking-[0.24em] text-stone-600">Send details</p>
            <form class="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
              />
              <input
                type="email"
                placeholder="Email"
                class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
              />
              <input
                type="text"
                placeholder="Date + City"
                class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
              />
              <textarea
                rows="4"
                placeholder="What vibe are you after? Any must-haves?"
                class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
              />
              <button
                type="button"
                class="w-full rounded-full bg-olive px-5 py-3 text-sm font-semibold text-sand shadow-lg shadow-olive/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Send inquiry
              </button>
              <p class="text-xs text-stone-600">No spam. I reply personally within a day.</p>
            </form>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
