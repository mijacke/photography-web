// The portfolio is built around four fixed categories (see CLAUDE.md).
// Server endpoints validate slugs against this set so arbitrary values
// never reach Sanity (protects quota and the CDN cache).
export const PORTFOLIO_CATEGORY_SLUGS: ReadonlySet<string> = new Set([
    'rodina',
    'svadby',
    'novorodenci',
    'tehotenstvo',
])
