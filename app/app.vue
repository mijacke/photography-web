<script setup lang="ts"></script>

<template>
    <NuxtLayout>
        <NuxtPage :key="$route.path" />
    </NuxtLayout>
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
