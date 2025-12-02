<script setup lang="ts">
import { computed, reactive } from 'vue'
import Footer from '@/components/navigation/Footer.vue'
import Header from '@/components/navigation/Header.vue'
import { useAppCopy } from '@/composables/useAppCopy'

const { copy } = useAppCopy()

const navLinks = computed(() => copy.value.navigation.links)
const headerCta = computed(() => copy.value.navigation.ctas.default)
const contactCopy = computed(() => copy.value.contactPage)
const contacts = computed(() => contactCopy.value.contactCards)

const form = reactive({
  fullName: '',
  email: '',
  dateCity: '',
  photoType: '',
  message: '',
  consent: false
})

const canSubmit = computed(() => form.consent)

const handleSubmit = () => {
  if (!canSubmit.value) return
}
</script>

<template>
  <div class="min-h-screen bg-sand text-charcoal">
    <Header
      :links="navLinks"
      :brand-label="copy.navigation.brand"
      :cta-label="headerCta.label"
      :cta-href="headerCta.href"
      theme="light"
    />

    <main class="layout-shell space-y-10 py-14">
      <div class="mx-auto max-w-3xl space-y-4 text-center">
        <p class="text-xs uppercase tracking-[0.28em] text-stone-600">{{ contactCopy.hero.eyebrow }}</p>
        <h1 class="text-4xl font-semibold sm:text-5xl">{{ contactCopy.hero.title }}</h1>
        <p class="text-lg text-stone-700">{{ contactCopy.hero.description }}</p>
      </div>

      <section class="grid gap-8 rounded-3xl border border-stone-200 bg-gradient-to-br from-white to-sand/70 p-8 shadow-card lg:grid-cols-2 lg:p-12">
        <div class="flex h-full flex-col space-y-4 rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm">
          <p class="text-xs uppercase tracking-[0.28em] text-stone-600">{{ contactCopy.hero.eyebrow }}</p>
          
          <div class="text-sm leading-relaxed text-stone-700">
            <p>{{ contactCopy.hero.introText }}</p>
          </div>

          <div class="flex-1 space-y-3 pt-4">
            <div
              v-for="item in contacts"
              :key="item.label"
              class="rounded-2xl border border-stone-200 bg-sand/60 px-4 py-3 text-sm"
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
        </div>

        <div class="flex h-full flex-col space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p class="text-xs uppercase tracking-[0.24em] text-stone-600">{{ contactCopy.form.title }}</p>
          <form class="space-y-3" @submit.prevent="handleSubmit">
            <input
              v-model="form.fullName"
              type="text"
              :placeholder="contactCopy.form.namePlaceholder"
              required
              class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
            />
            <input
              v-model="form.email"
              type="email"
              :placeholder="contactCopy.form.emailPlaceholder"
              required
              class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
            />
            <input
              v-model="form.dateCity"
              type="text"
              :placeholder="contactCopy.form.datePlaceholder"
              required
              class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
            />
            <input
              v-model="form.photoType"
              type="text"
              :placeholder="contactCopy.form.photoTypePlaceholder"
              required
              class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
            />
            <textarea
              v-model="form.message"
              rows="4"
              :placeholder="contactCopy.form.messagePlaceholder"
              required
              class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-olive focus:ring-2 focus:ring-olive/30"
            />
            <label class="flex items-start gap-3 rounded-xl border border-stone-200 bg-sand/60 px-4 py-3 text-sm text-stone-700">
              <input
                v-model="form.consent"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 rounded border-stone-400 text-olive focus:ring-2 focus:ring-olive/40"
              />
              <span>{{ contactCopy.form.consentLabel }}</span>
            </label>
            <button
              type="submit"
              :disabled="!canSubmit"
              class="w-full rounded-full bg-olive px-5 py-3 text-sm font-semibold text-sand shadow-lg shadow-olive/30 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {{ contactCopy.form.submitLabel }}
            </button>
            <p class="text-xs text-stone-600">{{ contactCopy.form.note }}</p>
          </form>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>
