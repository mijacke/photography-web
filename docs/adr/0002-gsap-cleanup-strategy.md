# ADR-0002: GSAP Cleanup Strategy

## Status

Accepted

## Context

GSAP ScrollTrigger creates scroll listeners and resize observers that persist
after component unmount. With Nuxt's client-side navigation:

1. **Memory leaks**: Animations keep references to unmounted elements
2. **Conflicts**: Multiple ScrollTriggers compete for the same scroll position
3. **Layout bugs**: Old triggers fire on new page content

## Decision

Use `gsap.context()` and explicit cleanup on every page:

```ts
const { initializeAnimations, cleanup } = useGsapAnimations()

onMounted(() => {
    initializeAnimations(() => {
        // All animations here
    })
})

onUnmounted(() => {
    cleanup() // ctx.revert() kills all animations in context
})
```

Additionally:

- **Router plugin** calls `cleanup()` in `beforeEach` for safety
- **Double-rAF + 50ms delay** before initializing ensures DOM stability
- **`isCleanedUp` flag** prevents animations starting after cleanup

## Consequences

### Positive

- No memory leaks
- Clean slate on each navigation
- Consistent animation behavior

### Negative

- Every animated page needs explicit `onUnmounted(() => cleanup())`
- 50ms delay means animations don't start instantly

### Related files

- `app/composables/useGsapAnimations.ts`
- `app/plugins/debug-router.client.ts`
