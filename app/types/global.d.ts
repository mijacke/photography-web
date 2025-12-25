/**
 * Global type declarations for third-party scripts
 */

declare global {
    interface Window {
        dataLayer: unknown[]
        gtag?: (...args: unknown[]) => void
    }
}

export { }
