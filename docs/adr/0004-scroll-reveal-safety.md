# ADR-0004: Scroll Reveals Must Never Depend on a Tween Completing

## Status

Accepted

## Context

Every scroll reveal on this site hides its target first and animates it in.
The original implementation used `gsap.from()`:

```ts
gsap.from(element, { y: 20, autoAlpha: 0, duration: 0.8 })
```

`gsap.from()` has `immediateRender: true`. On creation it writes the start
state — `autoAlpha: 0`, i.e. `visibility: hidden; opacity: 0` — onto the
element, and it reads the *end* state off the element rather than being given
one. The content therefore becomes visible only if that exact tween runs to
completion.

A visitor on an iPhone 11 reported the hero headings, the whole About section
and the four portfolio cards never appearing — just a tall blank gap where each
belonged. Everything animated with `gsap.from()` was invisible; everything
animated with `fadeInUp()`, which uses `gsap.set()` + `gsap.to()`, rendered
fine. The split was exact across all eight reveals on the homepage.

A second defect had the same shape. `plugins/gsap.client.ts` handled
`prefers-reduced-motion` with `gsap.globalTimeline.timeScale(0)`, which does not
skip animations — it freezes them on frame zero. For anyone with Reduce Motion
enabled that stranded every reveal on its hidden start frame.

## Decision

**Never use `gsap.from()` (or `tl.from()`) for a reveal.** Set the hidden start
state explicitly, then animate to absolute end values:

```ts
if (prepareReveal(element, { y: 20, autoAlpha: 0 })) {
    gsap.to(element, { y: 0, autoAlpha: 1, duration: 0.8 })
}
```

The visual result is identical. The difference is that the end state is an
absolute value the tween cannot get wrong, so an interrupted reveal degrades to
a hard cut rather than to permanently invisible content.

`prepareReveal()` in `useGsapAnimations.ts` is the single entry point and adds
three guarantees:

- **Reduced motion** returns `false` and hides nothing, so the content renders
  straight away. The global timeline is never frozen.
- **Elements with no layout box** (`hidden lg:block` below the `lg` breakpoint)
  are skipped — they can never trigger their own reveal, so they must never be
  hidden.
- **A failsafe** watches each hidden element with an `IntersectionObserver`.
  Once the element actually reaches the viewport it gets `REVEAL_FAILSAFE_MS`
  (1500 ms) to play, after which anything still `visibility: hidden` is cleared
  back to its natural state.

## Consequences

### Positive

- Content can no longer be hidden for good by a reveal that fails to run,
  whatever the cause — engine differences, a mismeasured ScrollTrigger, a
  reverted context, a blocked script.
- Reduced motion now does what it says: no animation, content visible.
- Verified end to end: with all 15 ScrollTriggers destroyed on the homepage so
  that no reveal tween can possibly run, every section still becomes visible on
  scroll, with `transform`, `opacity` and `visibility` cleaned up.

### Negative

- Reveals are two calls instead of one, and each call site has to name its end
  values rather than letting GSAP infer them.
- The failsafe holds one `IntersectionObserver` per reveal until `cleanup()`
  disconnects them.

### Related files

- `app/composables/useGsapAnimations.ts`
- `app/plugins/gsap.client.ts`
- `app/components/sections/home/HeroSection.vue`
- `app/components/sections/home/AboutSection.vue`
- `app/components/sections/portfolio/IntroSection.vue`
- `app/pages/about/index.vue`
- `app/pages/services/index.vue`
