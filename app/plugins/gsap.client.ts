import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * GSAP and ScrollTrigger registration plugin.
 *
 * @remarks
 * **Client-only**: Registers GSAP plugins and sets animation defaults.
 *
 * **Reduced motion**: handled per-animation in `useGsapAnimations()`, which
 * skips reveals entirely so the content renders straight away. Freezing the
 * global timeline here instead would strand every reveal on its hidden start
 * frame and hide the content for good.
 *
 * **Provides**: `$gsap` and `$ScrollTrigger` globally via Nuxt's provide system.
 */
export default defineNuxtPlugin(() => {
    if (import.meta.server) return

    gsap.registerPlugin(ScrollTrigger)

    gsap.defaults({
        ease: 'power3.out',
        duration: 1,
    })

    ScrollTrigger.defaults({ markers: false })

    return {
        provide: {
            gsap,
            ScrollTrigger,
        },
    }
})
