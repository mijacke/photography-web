<script setup lang="ts">
import MasonryWall from '@yeger/vue-masonry-wall'

interface Photo {
    id: number
    src: string
    alt: string
    orientation?: 'portrait' | 'landscape'
}

interface Props {
    photos: Photo[]
}

const props = defineProps<Props>()

const isMounted = ref(false)
const titleRef = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])

const selectedPhotoIndex = ref<number | null>(null)

const selectedPhoto = computed(() => {
    if (selectedPhotoIndex.value === null) return null
    return props.photos[selectedPhotoIndex.value]
})

const currentPhotoNumber = computed(() => {
    if (selectedPhotoIndex.value === null) return 0
    return selectedPhotoIndex.value + 1
})

const totalPhotos = computed(() => props.photos.length)

const openLightbox = (photo: Photo) => {
    const index = props.photos.findIndex((p) => p.id === photo.id)
    selectedPhotoIndex.value = index
}

const closeLightbox = () => {
    selectedPhotoIndex.value = null
}

const goToPrevious = () => {
    if (selectedPhotoIndex.value === null) return
    if (selectedPhotoIndex.value > 0) {
        selectedPhotoIndex.value--
    } else {
        selectedPhotoIndex.value = props.photos.length - 1
    }
}

const goToNext = () => {
    if (selectedPhotoIndex.value === null) return
    if (selectedPhotoIndex.value < props.photos.length - 1) {
        selectedPhotoIndex.value++
    } else {
        selectedPhotoIndex.value = 0
    }
}

const getPhotoOrientation = (photo: Photo) => {
    if (photo.orientation) return photo.orientation
    return photo.id % 2 === 0 ? 'portrait' : 'landscape'
}

const { fadeInUp, cleanup, initializeAnimations, add } = useGsapAnimations()

onMounted(() => {
    const handleKeydown = (e: KeyboardEvent) => {
        if (selectedPhotoIndex.value === null) return
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') goToPrevious()
        if (e.key === 'ArrowRight') goToNext()
    }
    window.addEventListener('keydown', handleKeydown)

    initializeAnimations(() => {
        isMounted.value = true

        const { gsap, ScrollTrigger } = useGsapAnimations()

        if (titleRef.value) {
            fadeInUp(titleRef.value, { y: 30, duration: 0.8 })
        }

        setTimeout(() => {
            add(() => {
                const validItems = itemRefs.value.filter((el) => el instanceof HTMLElement)

                if (validItems.length > 0) {
                    gsap.set(validItems, { autoAlpha: 0, y: 40 })

                    ScrollTrigger.batch(validItems, {
                        onEnter: (batch) => {
                            gsap.to(batch, {
                                autoAlpha: 1,
                                y: 0,
                                duration: 0.7,
                                stagger: 0.08,
                                ease: 'power3.out',
                            })
                        },
                        start: 'top 90%',
                        once: true,
                    })
                }
            })
        }, 200)
    })

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown)
        cleanup()
    })
})
</script>

<template>
    <section class="py-16 md:py-24 bg-white">
        <div class="container-wide">
            <h2
                ref="titleRef"
                class="gallery-title text-2xl md:text-3xl font-display text-charcoal-900 text-center mb-12"
            >
                Galéria fotiek
            </h2>

            <MasonryWall
                v-if="isMounted && photos.length > 0"
                :items="photos"
                :ssr-columns="3"
                :column-width="300"
                :gap="16"
            >
                <template #default="{ item, index }">
                    <div
                        :ref="
                            (el) => {
                                if (el) itemRefs[index] = el as HTMLElement
                            }
                        "
                        class="gallery-item group relative cursor-pointer overflow-hidden bg-charcoal-900"
                        :class="
                            getPhotoOrientation(item) === 'portrait'
                                ? 'aspect-[3/4]'
                                : 'aspect-[4/3]'
                        "
                        @click="openLightbox(item)"
                    >
                        <div
                            v-if="item.src === 'placeholder'"
                            class="w-full h-full bg-charcoal-800 flex items-center justify-center"
                        >
                            <span class="text-charcoal-600 text-sm">{{ item.id }}</span>
                        </div>
                        <img
                            v-else
                            :src="item.src"
                            :alt="item.alt"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        >

                        <div
                            class="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-300"
                        />
                    </div>
                </template>
            </MasonryWall>
        </div>

        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-300"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="selectedPhoto"
                    class="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/95 p-4"
                    @click="closeLightbox"
                >
                    <button
                        class="absolute top-6 right-6 text-white hover:text-warm-400 transition-colors z-10"
                        @click="closeLightbox"
                    >
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <button
                        class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-warm-400 transition-colors p-2 z-10"
                        @click.stop="goToPrevious"
                    >
                        <svg
                            class="w-10 h-10 md:w-12 md:h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    <button
                        class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-warm-400 transition-colors p-2 z-10"
                        @click.stop="goToNext"
                    >
                        <svg
                            class="w-10 h-10 md:w-12 md:h-12"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    <div
                        v-if="selectedPhoto.src && selectedPhoto.src !== 'placeholder'"
                        class="max-w-5xl max-h-[85vh] relative"
                        @click.stop
                    >
                        <img
                            :src="selectedPhoto.src"
                            :alt="selectedPhoto.alt"
                            class="max-w-full max-h-[85vh] object-contain"
                        >
                    </div>
                    <div
                        v-else
                        class="w-96 h-96 bg-charcoal-800 flex items-center justify-center"
                        @click.stop
                    >
                        <span class="text-charcoal-500">Placeholder</span>
                    </div>

                    <div
                        class="absolute bottom-6 right-6 text-white text-sm md:text-base font-medium bg-charcoal-900/60 px-4 py-2 rounded"
                    >
                        {{ currentPhotoNumber }} / {{ totalPhotos }}
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>
