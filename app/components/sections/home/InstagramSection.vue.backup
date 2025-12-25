<script setup lang="ts">
interface InstagramPost {
    id: string
    caption: string
    mediaType: string
    image: string
    link: string
    timestamp: string
}

interface InstagramResponse {
    success: boolean
    posts: InstagramPost[]
    error?: string
}

const { data, pending } = useLazyFetch<InstagramResponse>('/api/instagram', {
    key: 'instagram-posts',
    server: false,
})

const instagramPosts = computed(() => {
    const apiPosts = data.value?.posts
    if (data.value?.success && apiPosts && apiPosts.length > 0) {
        return apiPosts.slice(0, 5)
    }
    return []
})

const isCarousel = (post: InstagramPost) => post.mediaType === 'CAROUSEL_ALBUM'

const hasData = computed(() => instagramPosts.value.length > 0)

const gridClass = computed(() => {
    const count = instagramPosts.value.length
    if (count <= 2) return 'grid-cols-2'
    if (count <= 3) return 'grid-cols-3'
    if (count <= 4) return 'grid-cols-2 md:grid-cols-4'
    return 'grid-cols-2 md:grid-cols-5'
})

const instagramUrl = 'https://www.instagram.com/paulifotografka/'
</script>

<template>
    <section class="pt-2 px-2 bg-cream-100">
        <ClientOnly>
            <div v-if="pending" class="grid grid-cols-2 md:grid-cols-5 gap-2">
                <div v-for="n in 5" :key="n" class="aspect-square bg-charcoal-200 animate-pulse" />
            </div>

            <div v-else-if="hasData" :class="['grid gap-2', gridClass]">
                <a
                    v-for="post in instagramPosts"
                    :key="post.id"
                    :href="post.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative aspect-square overflow-hidden"
                >
                    <img
                        :src="post.image"
                        :alt="post.caption || `Instagram príspevok ${post.id}`"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />

                    <div
                        v-if="isCarousel(post)"
                        class="absolute top-2 right-2 text-white drop-shadow-lg"
                    >
                        <img src="/svg/icons/images.svg" alt="" class="w-5 h-5 invert" />
                    </div>

                    <div
                        class="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-colors duration-300 flex items-center justify-center"
                    >
                        <img
                            src="/svg/icons/instagram.svg"
                            alt=""
                            class="w-8 h-8 invert opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </div>
                </a>
            </div>

            <div v-else class="text-center py-8 text-charcoal-500">
                <p>Sledujte nás na Instagrame</p>
            </div>

            <template #fallback>
                <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div
                        v-for="n in 5"
                        :key="n"
                        class="aspect-square bg-charcoal-200 animate-pulse"
                    />
                </div>
            </template>
        </ClientOnly>

        <div class="flex justify-center py-8">
            <a
                :href="instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-2 px-6 py-3 border border-charcoal-800 text-charcoal-800 hover:bg-charcoal-800 hover:text-white transition-colors duration-300 text-sm tracking-wider"
            >
                Sledujte ma na Instagrame
                <img src="/svg/icons/instagram.svg" alt="" class="w-4 h-4 group-hover:hidden" />
                <img
                    src="/svg/icons/instagram_white.svg"
                    alt=""
                    class="w-4 h-4 hidden group-hover:block"
                />
            </a>
        </div>
    </section>
</template>
