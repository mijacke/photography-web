<script setup lang="ts">
import { computed } from 'vue'

type MapCopy = {
  eyebrow: string
  title: string
  description: string
  addressLabel: string
  directionsLabel: string
}

const props = defineProps<{
  address: string
  copy: MapCopy
  googleMapsApiKey?: string
}>()

const runtimeConfig = useRuntimeConfig()

const trimmedAddress = computed(() => props.address?.trim() ?? '')
const encodedAddress = computed(() => encodeURIComponent(trimmedAddress.value))
const googleMapsApiKey = computed(
  () => props.googleMapsApiKey ?? runtimeConfig.public.googleMapsApiKey?.trim?.() ?? ''
)

const mapEmbedUrl = computed(() => {
  if (!trimmedAddress.value) return ''
  const baseParams = `q=${encodedAddress.value}&output=embed&z=15&iwloc=0`
  if (googleMapsApiKey.value) {
    return `https://www.google.com/maps?${baseParams}&maptype=roadmap`
  }
  return `https://maps.google.com/maps?${baseParams}`
})

const mapDirectionsUrl = computed(() =>
  trimmedAddress.value ? `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress.value}` : ''
)

const hasMap = computed(() => Boolean(mapEmbedUrl.value && trimmedAddress.value))
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
