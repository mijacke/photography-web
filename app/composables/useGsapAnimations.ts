import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** How long a reveal gets to play once its target is on screen. */
const REVEAL_FAILSAFE_MS = 1500

/**
 * Composable providing GSAP ScrollTrigger animation utilities.
 *
 * @remarks
 * **Client-only**: Uses `gsap.context` which requires browser APIs.
 *
 * **Never use `gsap.from()` for reveals**: it writes the hidden start state
 * onto the element on creation and only restores visibility if that exact
 * tween completes, so an interrupted tween leaves the content invisible
 * forever. Reveals here set the start state explicitly and animate to
 * absolute end values, and `prepareReveal()` arms a failsafe on top.
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
    const failsafeObservers: IntersectionObserver[] = []

    function elementExists(
        selector: string | Element | Element[] | NodeList | null | undefined
    ): boolean {
        if (!selector) return false
        if (typeof selector === 'string') return document.querySelector(selector) !== null
        if (Array.isArray(selector)) return selector.length > 0
        if (selector instanceof NodeList) return selector.length > 0
        return true
    }

    /**
     * Whether the visitor asked the operating system to minimise animation.
     */
    function prefersReducedMotion(): boolean {
        return (
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        )
    }

    /**
     * Safety net for scroll reveals.
     *
     * @remarks
     * A reveal hides its target before animating it in, so a tween that never
     * runs would leave the content permanently invisible while still taking up
     * layout space. Once an element has actually reached the viewport, give its
     * reveal a moment to play, then force it visible if it is still hidden.
     */
    function armFailsafe(target: gsap.TweenTarget) {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

        const elements = gsap.utils.toArray<HTMLElement>(target)
        if (elements.length === 0) return

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return

                const element = entry.target as HTMLElement
                observer.unobserve(element)

                window.setTimeout(() => {
                    if (element.style.visibility === 'hidden') {
                        gsap.set(element, { clearProps: 'visibility,opacity,transform' })
                    }
                }, REVEAL_FAILSAFE_MS)
            })
        })

        elements.forEach((element) => observer.observe(element))
        failsafeObservers.push(observer)
    }

    /**
     * Applies the hidden start state for a reveal and arms its failsafe.
     *
     * @returns `false` when the reveal should be skipped because the visitor
     * prefers reduced motion — the content is then left untouched, and so
     * stays visible.
     */
    function prepareReveal(target: gsap.TweenTarget, fromVars: gsap.TweenVars): boolean {
        if (prefersReducedMotion()) return false

        const elements = gsap.utils
            .toArray<HTMLElement>(target)
            // An element with no layout box (`hidden lg:block` below `lg`) can
            // never trigger its own reveal, so it must not be hidden either.
            .filter((element) => element.getClientRects().length > 0)

        if (elements.length === 0) return false

        gsap.set(elements, fromVars)
        armFailsafe(elements)
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

        if (!prepareReveal(target as gsap.TweenTarget, { autoAlpha: 0, y })) return null

        return ScrollTrigger.batch(target as Element | Element[], {
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

        if (!prepareReveal(element, { x: xOffset, autoAlpha: 0 })) return null

        return gsap.to(element, {
            x: 0,
            autoAlpha: 1,
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
        if (prefersReducedMotion()) return null

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
        items: string | Element[] | NodeList | Array<Element>,
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

        if (!prepareReveal(items as gsap.TweenTarget, { y, autoAlpha: 0 })) return null

        return gsap.to(items, {
            y: 0,
            autoAlpha: 1,
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

        if (!prepareReveal(element, { scale, rotateX, autoAlpha: 0 })) return null

        return gsap.to(element, {
            scale: 1,
            rotateX: 0,
            autoAlpha: 1,
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
        failsafeObservers.forEach((observer) => observer.disconnect())
        failsafeObservers.length = 0
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
        prepareReveal,
        prefersReducedMotion,
        cleanup,
        refresh,
        initializeAnimations,
        add,
        gsap,
        ScrollTrigger,
    }
}
