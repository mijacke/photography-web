<template>
    <div class="min-h-screen flex flex-col">
        <LayoutTheHeader :key="$route.path" />
        <main class="flex-grow pt-20 md:pt-24">
            <slot />
        </main>
        <SectionsHomeInstagramSection />
        <LayoutTheFooter />
    </div>
</template>
