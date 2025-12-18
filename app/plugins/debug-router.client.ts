export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()

    // Create the navigation overlay element
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
            overlay.offsetHeight // Force reflow
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
            // Show overlay instantly
            showOverlay()

            // GSAP cleanup
            try {
                const { cleanup } = useGsapAnimations()
                cleanup()
            } catch (e) {
                // ignore
            }

            // Scroll to top while overlay is covering
            window.scrollTo(0, 0)
        }

        next()
    })

    router.afterEach(() => {
        // Refresh ScrollTrigger after page settles
        setTimeout(() => {
            try {
                const { refresh } = useGsapAnimations()
                refresh()
            } catch (e) {
                // ignore
            }
        }, 100)
    })

    // Hide overlay when transition is complete
    nuxtApp.hook('page:transition:finish', () => {
        requestAnimationFrame(() => {
            hideOverlay()
        })
    })
})
