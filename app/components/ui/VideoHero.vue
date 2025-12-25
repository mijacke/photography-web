<script setup lang="ts">
interface Props {
    src: string
    poster?: string
    alt?: string
    aspectRatio?: string
    overlayOpacity?: number
}

const props = withDefaults(defineProps<Props>(), {
    poster: '',
    alt: 'Video prezentácia',
    aspectRatio: '16/9',
    overlayOpacity: 0.15,
})

const videoRef = ref<HTMLVideoElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isLoaded = ref(false)
const hasError = ref(false)

const startPlayback = () => {
    if (!videoRef.value) return

    videoRef.value
        .play()
        .then(() => {
            isLoaded.value = true
        })
        .catch(() => {
            // Autoplay blocked by browser policy - show video frame anyway
            isLoaded.value = true
        })
}

onMounted(() => {
    if (!containerRef.value) return

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    isVisible.value = true
                    observer.disconnect()

                    nextTick(() => {
                        if (videoRef.value) {
                            videoRef.value.load()

                            // readyState >= 3 means HAVE_FUTURE_DATA - enough to start playback
                            if (videoRef.value.readyState >= 3) {
                                startPlayback()
                            }
                        }
                    })
                }
            })
        },
        {
            rootMargin: '100px',
            threshold: 0,
        }
    )

    observer.observe(containerRef.value)

    onUnmounted(() => observer.disconnect())
})

const handleCanPlayThrough = () => {
    startPlayback()
}

const handleError = () => {
    hasError.value = true
    console.warn('Video failed to load:', props.src)
}
</script>

<template>
    <div ref="containerRef" class="video-hero-container" :style="{ aspectRatio: aspectRatio }">
        <div
            v-if="poster || hasError"
            class="video-poster"
            :class="{ 'opacity-0': isLoaded && !hasError }"
        >
            <img
                v-if="poster"
                :src="poster"
                :alt="alt"
                class="w-full h-full object-cover"
                loading="lazy"
            >
        </div>

        <video
            v-if="!hasError && isVisible"
            ref="videoRef"
            class="video-element"
            :class="{ 'is-loaded': isLoaded }"
            preload="auto"
            muted
            loop
            playsinline
            :aria-label="alt"
            @canplaythrough="handleCanPlayThrough"
            @error="handleError"
        >
            <source :src="src" type="video/mp4" >
        </video>

        <div class="video-overlay" :style="{ opacity: overlayOpacity }" />

        <div class="video-content">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.video-hero-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: var(--cream-200, #f0ebe4);
}

.video-poster {
    position: absolute;
    inset: 0;
    z-index: 1;
    transition: opacity 0.8s ease-out;
}

.video-element {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.8s ease-out;
    z-index: 2;
}

.video-element.is-loaded {
    opacity: 1;
}

.video-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.05) 50%,
        rgba(0, 0, 0, 0.15) 100%
    );
    z-index: 3;
    pointer-events: none;
}

.video-content {
    position: relative;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>
