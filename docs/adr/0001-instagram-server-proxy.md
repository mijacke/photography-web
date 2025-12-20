# ADR-0001: Instagram Server Proxy

## Status

Accepted

## Context

Instagram's Graph API requires authentication tokens to fetch posts.
Exposing these tokens in client-side code creates security risks:

- Token theft via browser devtools
- Rate limit abuse from third parties
- Token invalidation by Instagram for security violations

## Decision

Route all Instagram API calls through a Nuxt server endpoint:

```
Browser → /api/instagram → Instagram Graph API
```

The token is stored in `runtimeConfig` (server-only) and never sent to the client.
The endpoint supports both:

- **Business API**: For Instagram Business/Creator accounts (via `instagramBusinessAccountId`)
- **Basic Display API**: For personal accounts (fallback)

## Consequences

### Positive

- Tokens never reach the browser
- Single point for rate limiting if needed
- Can add caching layer server-side

### Negative

- Adds latency (extra hop through our server)
- Server must handle Instagram API errors gracefully

### Related files

- `server/api/instagram.get.ts`
- `app/composables/` (none - fetched directly in component)
