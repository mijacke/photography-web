# Comment Policy

This document defines the commenting standards for the photography-web codebase.

## In Code

### Comments

1. **TSDoc on exports** - Every exported function/composable/endpoint
2. **"WHY" comments** - Non-obvious decisions, workarounds, invariants
3. **Edge cases** - Browser quirks, timing issues, known limitations

## Where to Document

| Content                | Location               |
| ---------------------- | ---------------------- |
| Function API           | TSDoc in code          |
| Architecture decisions | `docs/adr/`            |
| Data flow / lifecycle  | `docs/ARCHITECTURE.md` |
| Setup instructions     | `README.md`            |

## TSDoc Format

```ts
/**
 * Brief description.
 *
 * @param name - Description
 *
 * @remarks
 * **SSR-compatible**: Explain SSR behavior
 * **Cleanup required**: Explain cleanup needs
 *
 * @returns Description of return value
 *
 * @throws 400 - Validation error
 * @throws 500 - Server error
 *
 * @example
 * \`\`\`ts
 * const result = myFunction()
 * \`\`\`
 */
```
