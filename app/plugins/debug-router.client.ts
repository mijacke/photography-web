/**
 * Navigation transition plugin with GSAP cleanup.
 *
 * @remarks
 * **Client-only**: Uses DOM APIs and must run after hydration.
 *
 * **Purpose**:
 * 1. Shows a white overlay during page transitions to prevent layout jumps
 * 2. Cleans up GSAP animations before navigation to prevent conflicts
 * 3. Scrolls to top immediately (while overlay is visible) for smooth UX
 * 4. Refreshes ScrollTrigger after new page settles
 *
 * **Overlay timing**: Appears instantly on navigation start, fades out
 * after `page:transition:finish` hook fires.
 */
export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()

    let overlay: HTMLDivElement | null = null

    if (typeof window !== 'undefined') {
        overlay = document.createElement('div')
        overlay.className = 'nav-overlay'
        overlay.id = 'nav-overlay'

        if (document.body) {
            document.body.appendChild(overlay)
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(overlay!)
            })
        }
    }

    function showOverlay() {
        if (overlay) {
            overlay.classList.remove('hiding')
            overlay.offsetHeight
            overlay.classList.add('active')
        }
    }

    function hideOverlay() {
        if (overlay) {
            overlay.classList.add('hiding')
            setTimeout(() => {
                overlay?.classList.remove('active', 'hiding')
            }, 150)
        }
    }

    router.beforeEach((to, from, next) => {
        if (from.path !== to.path) {
            showOverlay()

            try {
                const { cleanup } = useGsapAnimations()
                cleanup()
            } catch (e) {
                // Composable may not be available in all contexts
            }

            window.scrollTo(0, 0)
        }

        next()
    })

    router.afterEach(() => {
        setTimeout(() => {
            try {
                const { refresh } = useGsapAnimations()
                refresh()
            } catch (e) {
                // Composable may not be available in all contexts
            }
        }, 100)
    })

    nuxtApp.hook('page:transition:finish', () => {
        requestAnimationFrame(() => {
            hideOverlay()
        })
    })
})
