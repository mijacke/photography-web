import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
    // Only run on client
    if (import.meta.server) return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Configure defaults for smooth animations
    gsap.defaults({
        ease: 'power3.out',
        duration: 1,
    })

    // Respect reduced motion preferences
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
