<script setup lang="ts">
interface Props {
    title: string
    subtitle: string
    leftImage?: string
    rightImage?: string
}

const props = withDefaults(defineProps<Props>(), {
    leftImage: '',
    rightImage: '',
})

const { cleanup } = useGsapAnimations()

const leftImageRef = ref<HTMLElement | null>(null)
const rightImageRef = ref<HTMLElement | null>(null)
const leftImgElement = ref<HTMLImageElement | null>(null)
const rightImgElement = ref<HTMLImageElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

const leftLoaded = ref(false)
const rightLoaded = ref(false)
const animationStarted = ref(false)

const onLeftLoad = () => {
    leftLoaded.value = true
    checkAndAnimate()
}

const onRightLoad = () => {
    rightLoaded.value = true
    checkAndAnimate()
}

function checkAndAnimate() {
    if (leftLoaded.value && rightLoaded.value && !animationStarted.value) {
        animationStarted.value = true
        runAnimation()
    }
}

onMounted(() => {
    nextTick(() => {
        if (leftImgElement.value?.complete && leftImgElement.value?.naturalHeight > 0) {
            leftLoaded.value = true
        }
        if (rightImgElement.value?.complete && rightImgElement.value?.naturalHeight > 0) {
            rightLoaded.value = true
        }
        checkAndAnimate()
    })
})

watch(
    [() => props.leftImage, () => props.rightImage],
    ([left, right]) => {
        if (!animationStarted.value && left && right) {
            nextTick(() => {
                setTimeout(() => {
                    if (leftImgElement.value?.complete && rightImgElement.value?.complete) {
                        leftLoaded.value = true
                        rightLoaded.value = true
                        checkAndAnimate()
                    }
                }, 50)
            })
        }
    },
    { immediate: true }
)

function runAnimation() {
    const { gsap } = useGsapAnimations()

    if (leftImageRef.value) {
        gsap.to(leftImageRef.value, {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: 'power2.out',
        })
    }

    if (rightImageRef.value) {
        gsap.to(rightImageRef.value, {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: 'power2.out',
            delay: 0.1,
        })
    }

    if (subtitleRef.value) {
        gsap.to(subtitleRef.value, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
        })
    }
    if (titleRef.value) {
        gsap.to(titleRef.value, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            delay: 0.3,
        })
    }
}

onUnmounted(() => {
    cleanup()
})
</script>

<template>
    <section
        class="relative h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] min-h-[400px] flex items-center justify-center overflow-hidden"
    >
        <div class="absolute inset-0 flex flex-col md:flex-row">
            <div
                v-if="leftImage"
                ref="leftImageRef"
                class="hero-left-image w-full md:w-1/2 h-1/2 md:h-full"
                style="opacity: 0; transform: scale(1.03)"
            >
                <img
                    ref="leftImgElement"
                    :src="leftImage"
                    alt=""
                    class="w-full h-full object-cover"
                    loading="eager"
                    @load="onLeftLoad"
                />
            </div>
            <div
                v-if="rightImage"
                ref="rightImageRef"
                class="hero-right-image w-full md:w-1/2 h-1/2 md:h-full"
                style="opacity: 0; transform: scale(1.03)"
            >
                <img
                    ref="rightImgElement"
                    :src="rightImage"
                    alt=""
                    class="w-full h-full object-cover"
                    loading="eager"
                    @load="onRightLoad"
                />
            </div>
        </div>

        <div class="relative z-10 text-center px-4 md:px-6 w-full max-w-[95%] mx-auto">
            <p
                ref="subtitleRef"
                class="hero-subtitle text-white font-sans uppercase mb-2 md:mb-4 drop-shadow-lg tracking-[0.2em]"
                style="
                    font-size: clamp(0.75rem, 2vw, 1.125rem);
                    letter-spacing: clamp(0.2em, 0.5vw, 0.4em);
                    opacity: 0;
                    transform: translateY(8px);
                "
            >
                {{ subtitle }}
            </p>
            <h1
                ref="titleRef"
                class="hero-title font-hero text-white lowercase drop-shadow-lg whitespace-nowrap leading-tight"
                style="font-size: clamp(1.8rem, 8vw, 6rem); opacity: 0; transform: translateY(8px)"
            >
                {{ title }}
            </h1>
        </div>
    </section>
</template>
