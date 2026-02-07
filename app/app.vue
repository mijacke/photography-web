<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'
</script>

<template>
    <NuxtLayout>
        <NuxtPage :key="$route.path" />
    </NuxtLayout>
    <Analytics />
</template>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
    transition:
        opacity 0.25s ease,
        transform 0.25s ease;
}

.page-enter-from {
    opacity: 0;
    transform: translateY(8px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}
</style>
