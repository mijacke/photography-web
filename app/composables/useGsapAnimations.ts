import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Composable providing GSAP ScrollTrigger animation utilities.
 *
 * @remarks
 * **Client-only**: Uses `gsap.context` which requires browser APIs.
 *
 * **Cleanup required**: Call `cleanup()` in `onUnmounted()` to prevent
 * memory leaks and animation conflicts on page transitions.
 *
 * **Initialization**: Use `initializeAnimations()` to ensure DOM is ready
 * after page transitions (uses double-rAF + 50ms delay for stability).
 *
 * @returns Animation helpers and GSAP/ScrollTrigger instances
 *
 * @example
 * ```ts
 * const { fadeInUp, cleanup, initializeAnimations } = useGsapAnimations()
 *
 * onMounted(() => {
 *   initializeAnimations(() => {
 *     fadeInUp('.my-element')
 *   })
 * })
 *
 * onUnmounted(() => cleanup())
 * ```
 */
export function useGsapAnimations() {
    let ctx: gsap.Context | undefined
    let isCleanedUp = false

    function elementExists(
        selector: string | Element | Element[] | NodeList | null | undefined
    ): boolean {
        if (!selector) return false
        if (typeof selector === 'string') return document.querySelector(selector) !== null
        if (Array.isArray(selector)) return selector.length > 0
        if (selector instanceof NodeList) return selector.length > 0
        return true
    }

    function fadeInUp(
        elements: string | Element | Element[] | NodeList | null,
        options: {
            y?: number
            duration?: number
            stagger?: number
            delay?: number
            start?: string
            ease?: string
        } = {}
    ) {
        if (!elementExists(elements)) return null

        const {
            y = 30,
            duration = 0.8,
            stagger = 0.15,
            delay = 0,
            start = 'top 90%',
            ease = 'power3.out',
        } = options
        const target = typeof elements === 'string' ? elements : elements

        gsap.set(target, { autoAlpha: 0, y })

        return ScrollTrigger.batch(target as any, {
            onEnter: (batch) => {
                gsap.to(batch, {
                    autoAlpha: 1,
                    y: 0,
                    duration,
                    stagger,
                    delay,
                    ease,
                    overwrite: 'auto',
                })
            },
            start,
            once: true,
        })
    }

    function slideIn(
        element: string | Element | null,
        options: {
            direction?: 'left' | 'right'
            distance?: number
            duration?: number
            start?: string
            ease?: string
        } = {}
    ) {
        if (!elementExists(element)) return null

        const {
            direction = 'left',
            distance = 60,
            duration = 1,
            start = 'top 85%',
            ease = 'power3.out',
        } = options
        const xOffset = direction === 'left' ? -distance : distance

        return gsap.from(element, {
            x: xOffset,
            autoAlpha: 0,
            duration,
            ease,
            scrollTrigger: {
                trigger: element,
                start,
                once: true,
            },
        })
    }

    function parallax(
        element: string | Element | null,
        options: {
            yPercent?: number
            start?: string
            end?: string
        } = {}
    ) {
        if (!elementExists(element)) return null

        const { yPercent = -15, start = 'top bottom', end = 'bottom top' } = options

        return gsap.to(element, {
            yPercent,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start,
                end,
                scrub: true,
            },
        })
    }

    function staggerReveal(
        container: string | Element | null,
        items: string | Element[] | NodeList | Array<any>,
        options: {
            y?: number
            stagger?: number
            duration?: number
            start?: string
            ease?: string
        } = {}
    ) {
        if (!elementExists(container)) return null

        const {
            y = 20,
            stagger = 0.1,
            duration = 0.6,
            start = 'top 85%',
            ease = 'power2.out',
        } = options

        return gsap.from(items, {
            y,
            autoAlpha: 0,
            duration,
            stagger,
            ease,
            scrollTrigger: {
                trigger: container,
                start,
                once: true,
            },
        })
    }

    function scaleIn3D(
        element: string | Element | null,
        options: {
            scale?: number
            rotateX?: number
            duration?: number
            start?: string
        } = {}
    ) {
        if (!elementExists(element)) return null

        const { scale = 0.95, rotateX = 3, duration = 1.1, start = 'top 85%' } = options

        return gsap.from(element, {
            scale,
            rotateX,
            autoAlpha: 0,
            duration,
            ease: 'power3.out',
            transformOrigin: 'center center',
            scrollTrigger: {
                trigger: element,
                start,
                once: true,
            },
        })
    }

    function cleanup() {
        isCleanedUp = true
        ctx?.revert()
    }

    function refresh() {
        ScrollTrigger.refresh()
    }

    /**
     * Initializes animations after layout is stable.
     * Uses double-rAF + timeout to ensure DOM is fully rendered after page transitions.
     */
    function initializeAnimations(callback: () => void) {
        isCleanedUp = false
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    if (isCleanedUp) return
                    ctx = gsap.context(() => {
                        callback()
                    })
                    ScrollTrigger.refresh()
                }, 50)
            })
        })
    }

    function add(callback: () => void) {
        if (ctx) {
            ctx.add(callback)
            callback()
        } else {
            callback()
        }
    }

    return {
        fadeInUp,
        slideIn,
        parallax,
        staggerReveal,
        scaleIn3D,
        cleanup,
        refresh,
        initializeAnimations,
        add,
        gsap,
        ScrollTrigger,
    }
}
