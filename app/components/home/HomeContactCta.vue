<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
}>()
</script>

<template>
  <section
    id="contact"
    class="overflow-hidden rounded-3xl border border-olive/30 bg-olive text-sand shadow-card"
  >
    <div class="grid gap-6 px-6 py-10 lg:grid-cols-[1.3fr,0.7fr] lg:px-10">
      <div class="space-y-3">
        <p class="text-sm uppercase tracking-[0.32em] text-sand/80">{{ eyebrow }}</p>
        <h3 class="text-2xl font-semibold">{{ title }}</h3>
        <p class="text-base text-sand/90">
          {{ subtitle }}
        </p>
      </div>
      <div class="flex items-center justify-end">
        <a
          :href="ctaHref"
          class="rounded-full border border-sand/40 bg-white/10 px-6 py-3 text-base font-semibold text-sand shadow-sm transition hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/15"
        >
          {{ ctaLabel }}
        </a>
      </div>
    </div>
  </section>
</template>
