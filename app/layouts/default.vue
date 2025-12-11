<template>
  <div class="min-h-screen flex flex-col">
    <LayoutTheHeader />
    <main class="flex-grow pt-20 md:pt-24">
      <slot />
    </main>
    <SectionsHomeInstagramSection />
    <LayoutTheFooter />
  </div>
</template>
