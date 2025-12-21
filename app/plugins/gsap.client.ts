import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * GSAP and ScrollTrigger registration plugin.
 *
 * @remarks
 * **Client-only**: Registers GSAP plugins and sets animation defaults.
 *
 * **Reduced motion**: Respects `prefers-reduced-motion` by setting
 * `gsap.globalTimeline.timeScale(0)` to effectively disable animations.
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
        gsap.globalTimeline.timeScale(0)
        ScrollTrigger.defaults({ markers: false })
    }

    return {
        provide: {
            gsap,
            ScrollTrigger,
        },
    }
})
