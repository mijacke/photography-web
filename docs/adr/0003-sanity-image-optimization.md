# ADR-0003: Sanity Image Optimization

## Status

Accepted

## Context

Photography site needs crisp images across devices:

- Mobile phones (small viewport, limited bandwidth)
- Desktop monitors (large viewport)
- 4K displays (high DPI)

Serving original high-res files everywhere wastes bandwidth and slows load times.

## Decision

Use Sanity's image CDN with URL parameters for on-the-fly optimization:

```
{url}?w=WIDTH&q=QUALITY&auto=format&fit=max
```

### Parameters used

| Param         | Value    | Purpose                             |
| ------------- | -------- | ----------------------------------- |
| `w`           | 400-1920 | Resize to width                     |
| `q`           | 85       | Quality (balance file size/quality) |
| `auto=format` | -        | Serve WebP when supported           |
| `fit=max`     | -        | Maintain aspect ratio               |

### Width presets by context

| Context                      | Width       | Rationale                    |
| ---------------------------- | ----------- | ---------------------------- |
| Portfolio preview thumbnails | 400px       | Grid layout, multiple images |
| About section portrait       | 600px       | Fixed container width        |
| Hero images                  | 1200-1600px | Full-width or near           |
| Gallery carousel             | 1920px      | Full viewport width          |
| Photo grid                   | 1200px      | Lightbox-ready               |

## Consequences

### Positive

- Automatic WebP conversion (30% smaller)
- Single request per image (no srcset complexity)
- Cache-friendly URLs (same params = same cache)

### Negative

- Slightly less control than responsive images (`srcset`)
- Extra CDN cost for transformations (included in Sanity plan)

### Related files

- `app/composables/useSanity*.ts` (all use `buildOptimizedUrl`)
