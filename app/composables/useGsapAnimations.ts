import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Composable for GSAP ScrollTrigger animations
 * Provides utility functions for common animation patterns
 */
export function useGsapAnimations() {
    let ctx: gsap.Context | undefined
    let isCleanedUp = false

    /**
     * Check if element exists in DOM
     */
    function elementExists(selector: string | Element | Element[] | NodeList | null | undefined): boolean {
        if (!selector) return false
        if (typeof selector === 'string') return document.querySelector(selector) !== null
        if (Array.isArray(selector)) return selector.length > 0
        if (selector instanceof NodeList) return selector.length > 0
        return true
    }

    /**
     * Fade in elements from bottom with optional stagger
     */
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

        const { y = 30, duration = 0.8, stagger = 0.15, delay = 0, start = 'top 90%', ease = 'power3.out' } = options
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
                    overwrite: 'auto'
                })
            },
            start,
            once: true
        })
    }

    /**
     * Slide in from left or right
     */
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

        const { direction = 'left', distance = 60, duration = 1, start = 'top 85%', ease = 'power3.out' } = options
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

    /**
     * Parallax effect for images - tied to scroll position
     */
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

    /**
     * Staggered reveal for list items
     */
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

        const { y = 20, stagger = 0.1, duration = 0.6, start = 'top 85%', ease = 'power2.out' } = options

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

    /**
     * Scale in with subtle 3D perspective effect
     */
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

    /**
     * Cleanup all ScrollTrigger instances
     */
    function cleanup() {
        isCleanedUp = true
        ctx?.revert()
    }

    /**
     * Refresh ScrollTrigger calculations
     */
    function refresh() {
        ScrollTrigger.refresh()
    }

    /**
     * Initialize animations safely after page transition and layout are stable
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

    /**
     * Add safe async animation to the context
     */
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
