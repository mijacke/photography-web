# Photography Web (Nuxt 3)

Jednoduchy fotoweb postaveny na Nuxt 3, @nuxt/content a Tailwind CSS. Markdown subory v `content/portfolio` sluzia ako „databaza”, fotky su v `public/images`.

## Stack
- Nuxt 3 (Vue 3 + Vite) s automatickym routovanim a SSG/SSR pre SEO
- @nuxt/content na citanie markdown frontmatteru
- Tailwind CSS na styling

## Skripty
- `npm install` – nainstaluje zavislosti
- `npm run dev` – lokalny vyvoj na `http://localhost:3000`
- `npm run build` – produkcny build
- `npm run generate` – staticky export

## Struktura obsahu
- Markdown galerie: `content/portfolio/*.md`
- Fotky: `public/images/portfolio/...`

Chces publikovat? Vytvor repo na GitHub-e, pridaj remote a pushni:
```bash
git init
git add .
git commit -m "Initial photography site"
git branch -M main
git remote add origin git@github.com:mijacke/photography-web.git
git push -u origin main
```
