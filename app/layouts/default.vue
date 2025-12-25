<script setup lang="ts">
const cookieConsentRef = ref<{ openSettings: () => void } | null>(null)

onMounted(() => {
    window.addEventListener('open-cookie-settings', () => {
        cookieConsentRef.value?.openSettings()
    })
})
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <LayoutTheHeader :key="$route.path" />
        <main class="flex-grow pt-20 md:pt-24">
            <slot />
        </main>
        <SectionsHomeInstagramSection />
        <LayoutTheFooter />
        <UiCookieConsent ref="cookieConsentRef" />
    </div>
</template>
