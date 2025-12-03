<script setup lang="ts">
import { computed } from 'vue'
import type { ContactMapCopy } from '@/types/contact'

const props = defineProps<{
  address: string
  copy: ContactMapCopy
}>()

const trimmedAddress = computed(() => props.address?.trim?.() ?? '')
const encodedAddress = computed(() => encodeURIComponent(trimmedAddress.value))

const mapEmbedUrl = computed(() =>
  trimmedAddress.value
    ? `https://maps.google.com/maps?q=${encodedAddress.value}&output=embed&z=15&iwloc=0`
    : ''
)

const hasMap = computed(() => Boolean(mapEmbedUrl.value))
</script>

<template>
  <section v-if="hasMap" class="w-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-card">
    <iframe
      :title="copy.addressLabel"
      :src="mapEmbedUrl"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="h-[420px] w-full sm:h-[500px] md:h-[600px]"
    ></iframe>
  </section>
</template>
