# Architecture Overview

Photography portfolio website built with Nuxt 4, Sanity CMS, and GSAP animations.

## Tech Stack

- **Frontend**: Nuxt 4 (Vue 3), TailwindCSS
- **CMS**: Sanity.io (headless)
- **Animations**: GSAP + ScrollTrigger
- **Hosting**: (to be determined)

## Data Flow

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Sanity    │───▶│  Server API  │───▶│  Composable │───▶ Component
│   Studio    │    │  /api/sanity │    │  useSanity* │
└─────────────┘    └──────────────┘    └─────────────┘
```

### Image Optimization

Images go through Sanity CDN with query params:

- `w=WIDTH` - resize
- `q=85` - quality (85 default)
- `auto=format` - WebP when supported
- `fit=max` - maintain aspect ratio

### Instagram Flow

```
┌───────────┐    ┌──────────────────┐    ┌───────────────┐
│ Instagram │◀──▶│ /api/instagram   │◀──▶│ Frontend      │
│ Graph API │    │ (token in server)│    │ (no token)    │
└───────────┘    └──────────────────┘    └───────────────┘
```

Tokens never reach the client. Server acts as secure proxy.

## Animation Lifecycle

```
Page Mount
    │
    ▼
initializeAnimations()
    │ (double-rAF + 50ms delay)
    ▼
GSAP animations play
    │ (via ScrollTrigger)
    ▼
Route Change Detected
    │
    ▼
cleanup() called
    │ (in router.beforeEach)
    ▼
ctx.revert() kills all animations
    │
    ▼
New Page Mounts...
```

### Why double-rAF + timeout?

After Nuxt page transitions, the DOM is ready but layout may not be
fully stable. The double `requestAnimationFrame` + 50ms timeout ensures
ScrollTrigger measurements are accurate.

## Key Directories

```
app/
├── composables/    # useSanity*, useGsapAnimations
├── components/     # layout, sections, ui
├── pages/          # routes
└── plugins/        # gsap, router

server/api/         # Sanity + Instagram proxies

studio/             # Sanity Studio (separate app)
└── schemaTypes/    # CMS schema definitions
```

## Caching Strategy

| Data            | Cache                                                       | Reason                            |
| --------------- | ----------------------------------------------------------- | --------------------------------- |
| Content pages (`/`, `/about`, `/portfolio/*`) | Vercel ISR 10 min (`routeRules.isr`)         | Sanity content changes rarely; edge HTML = fast TTFB |
| Homepage images | Client `key: 'homepage'` + CDN `s-maxage=600`, SWR 1 day    | Rarely changes                    |
| Category photos | Client `key: 'category-slug'` + CDN `s-maxage=600`, SWR 1 day | Per-category caching            |
| Services video  | No (`no-store` on `/api/sanity/services`)                   | Ensures fresh after CMS update    |
| Instagram posts | No (fetched each time)                                      | Social content changes frequently |

## Delivery & Security

- **Canonical host**: `https://www.paulifotografka.sk`. The apex domain 308-redirects to www (`vercel.json` → `redirects`); `NUXT_PUBLIC_SITE_URL` must be set to the www origin in every environment.
- **Region**: serverless functions are pinned to `fra1` (`vercel.json` → `regions`) — the audience is 93% Slovak, so this removes a transatlantic hop from every SSR/API request.
- **Headers**: a sitewide Content-Security-Policy plus `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and HSTS come from `nitro.routeRules` in `nuxt.config.ts`.
- **Rate limiting**: `server/middleware/rate-limit.ts` limits `/api/instagram|consent|contact|analytics|sanity` to 60 req/min/IP (Upstash sliding window over `@vercel/kv`; skipped gracefully when KV env vars are absent). Contact (5/10 min), consent (20/10 min) and analytics (60/10 min) add stricter per-endpoint limits via `server/utils/rateLimit.ts`.
- **Input validation**: category endpoints accept only the four known slugs (`server/utils/categories.ts`); the contact endpoint strips control characters, enforces length caps and HTML-escapes everything it emails.
- **Cron auth**: `server/utils/cronAuth.ts` performs a constant-time comparison of `Authorization: Bearer CRON_SECRET`.

## Related ADRs

- [0001 Instagram Server Proxy](adr/0001-instagram-server-proxy.md)
- [0002 GSAP Cleanup Strategy](adr/0002-gsap-cleanup-strategy.md)
- [0003 Sanity Image Optimization](adr/0003-sanity-image-optimization.md)
- [0004 Scroll Reveal Safety](adr/0004-scroll-reveal-safety.md)
