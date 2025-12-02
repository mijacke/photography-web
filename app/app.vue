<script setup>
// Critical styles applied immediately to prevent FOUC
useHead({
  style: [
    {
      innerHTML: `
        html { 
          font-family: 'Quicksand', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          scroll-behavior: smooth;
        }
        body { 
          margin: 0;
          padding: 0;
          background-color: #f5f3ec;
          color: #1f1f1a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `
    }
  ]
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#535943" />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
