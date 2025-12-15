import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Composable for GSAP ScrollTrigger animations
 * Provides utility functions for common animation patterns
 */
export function useGsapAnimations() {
    const triggers: ScrollTrigger[] = []

    /**
     * Check if element exists in DOM
     */
    function elementExists(selector: string | Element | Element[] | null): boolean {
        if (!selector) return false
        if (typeof selector === 'string') {
            return document.querySelector(selector) !== null
        }
        if (Array.isArray(selector)) {
            return selector.length > 0
        }
        return selector instanceof Element
    }

    /**
     * Fade in elements from bottom with optional stagger
     */
    function fadeInUp(
        elements: string | Element | Element[],
        options: {
            y?: number
            duration?: number
            stagger?: number
            delay?: number
            start?: string
        } = {}
    ) {
        // Skip if element doesn't exist
        if (!elementExists(elements)) return null

        const { y = 60, duration = 1, stagger = 0.15, delay = 0, start = 'top 80%' } = options

        const tween = gsap.from(elements, {
            y,
            autoAlpha: 0,
            duration,
            delay,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: typeof elements === 'string' ? elements : (elements as Element[])[0] || elements,
                start,
                once: true,
            },
        })

        if (tween.scrollTrigger) {
            triggers.push(tween.scrollTrigger)
        }

        return tween
    }

    /**
     * Slide in from left or right
     */
    function slideIn(
        element: string | Element,
        options: {
            direction?: 'left' | 'right'
            distance?: number
            duration?: number
            start?: string
        } = {}
    ) {
        // Skip if element doesn't exist
        if (!elementExists(element)) return null

        const { direction = 'left', distance = 100, duration = 1.2, start = 'top 75%' } = options

        const x = direction === 'left' ? -distance : distance

        const tween = gsap.from(element, {
            x,
            autoAlpha: 0,
            duration,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start,
                once: true,
            },
        })

        if (tween.scrollTrigger) {
            triggers.push(tween.scrollTrigger)
        }

        return tween
    }

    /**
     * Parallax effect for images - tied to scroll position
     */
    function parallax(
        element: string | Element,
        options: {
            yPercent?: number
            start?: string
            end?: string
        } = {}
    ) {
        // Skip if element doesn't exist
        if (!elementExists(element)) return null

        const { yPercent = -20, start = 'top bottom', end = 'bottom top' } = options

        const tween = gsap.to(element, {
            yPercent,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start,
                end,
                scrub: 1.5, // Smooth scrub tied to scroll
            },
        })

        if (tween.scrollTrigger) {
            triggers.push(tween.scrollTrigger)
        }

        return tween
    }

    /**
     * Staggered reveal for list items
     * @param container - Container element (used as trigger)
     * @param items - Elements to animate (NodeList or Element array, or CSS selector)
     */
    function staggerReveal(
        container: string | Element,
        items: string | Element[] | NodeListOf<Element>,
        options: {
            y?: number
            stagger?: number
            duration?: number
            start?: string
        } = {}
    ) {
        // Skip if container doesn't exist
        if (!elementExists(container)) return null

        const { y = 30, stagger = 0.1, duration = 0.6, start = 'top 75%' } = options

        // Convert NodeList to array if needed
        const elements = typeof items === 'string' ? items : Array.from(items as NodeListOf<Element>)

        if (Array.isArray(elements) && elements.length === 0) {
            return null
        }

        const tween = gsap.from(elements, {
            y,
            autoAlpha: 0,
            duration,
            stagger,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: container,
                start,
                once: true,
            },
        })

        if (tween.scrollTrigger) {
            triggers.push(tween.scrollTrigger)
        }

        return tween
    }

    /**
     * Scale in with subtle 3D perspective effect
     */
    function scaleIn3D(
        element: string | Element,
        options: {
            scale?: number
            rotateX?: number
            duration?: number
            start?: string
        } = {}
    ) {
        // Skip if element doesn't exist
        if (!elementExists(element)) return null

        const { scale = 0.9, rotateX = 5, duration = 1, start = 'top 80%' } = options

        const tween = gsap.from(element, {
            scale,
            rotateX,
            autoAlpha: 0,
            duration,
            ease: 'expo.out',
            transformPerspective: 1000,
            transformOrigin: 'center center',
            scrollTrigger: {
                trigger: element,
                start,
                once: true,
            },
        })

        if (tween.scrollTrigger) {
            triggers.push(tween.scrollTrigger)
        }

        return tween
    }

    /**
     * Cleanup all ScrollTrigger instances
     * Call this in onUnmounted
     */
    function cleanup() {
        triggers.forEach((trigger) => trigger.kill())
        triggers.length = 0
    }

    /**
     * Refresh ScrollTrigger calculations
     * Useful after dynamic content changes
     */
    function refresh() {
        ScrollTrigger.refresh()
    }

    return {
        fadeInUp,
        slideIn,
        parallax,
        staggerReveal,
        scaleIn3D,
        cleanup,
        refresh,
        gsap,
        ScrollTrigger,
    }
}

