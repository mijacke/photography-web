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

| Data            | Cache                                 | Reason                            |
| --------------- | ------------------------------------- | --------------------------------- |
| Homepage images | Yes (`key: 'homepage'`)               | Rarely changes                    |
| Category photos | Yes (`key: 'category-slug'`)          | Per-category caching              |
| Services video  | No (`getCachedData: () => undefined`) | Ensures fresh after CMS update    |
| Instagram posts | No (fetched each time)                | Social content changes frequently |

## Related ADRs

- [0001 Instagram Server Proxy](adr/0001-instagram-server-proxy.md)
- [0002 GSAP Cleanup Strategy](adr/0002-gsap-cleanup-strategy.md)
- [0003 Sanity Image Optimization](adr/0003-sanity-image-optimization.md)
