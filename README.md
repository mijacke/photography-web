# Pauli Fotografka

Profesionálna fotografická webstránka pre rodinnú, novorodeneckú, tehotenskú a svadobnú fotografiu.

🌐 **Stránka:** _pripravuje sa_

## 📸 Čo je to?

Portfolio stránka pre fotografku Pauli z Galanty. Návštevníci môžu:

- Prezerať si galérie podľa kategórií (rodina, svadby, novorodenci, tehotenstvo)
- Pozrieť si služby a cenník
- Kontaktovať fotografku cez formulár
- Sledovať Instagram feed

## 🛠 Technológie

| Čo                                      | Na čo                 |
| --------------------------------------- | --------------------- |
| [Nuxt 4](https://nuxt.com)              | Vue 3 framework s SSR |
| [Sanity.io](https://sanity.io)          | CMS na správu fotiek  |
| [Tailwind CSS](https://tailwindcss.com) | Styling               |
| [GSAP](https://greensock.com/gsap/)     | Animácie              |

## 🚀 Spustenie

```bash
# 1. Inštalácia
npm install

# 2. Lokálny vývoj
npm run dev

# 3. Otvor v prehliadači
open http://localhost:3000
```

### Sanity Studio (CMS)

```bash
cd studio
npm install
npm run dev
# http://localhost:3333
```

## 📁 Štruktúra

```
app/
├── pages/          # Stránky (home, about, contact, portfolio, services)
├── components/     # Vue komponenty
└── composables/    # Znovupoužiteľná logika

server/api/         # API endpointy (Instagram, Sanity proxy)

studio/             # Sanity CMS Studio
└── schemaTypes/    # Definície obsahu

docs/               # Dokumentácia
├── ARCHITECTURE.md # Architektúra projektu
└── adr/            # Architektonické rozhodnutia
```

## ⚙️ Konfigurácia

Skopíruj `.env.example` do `.env` a vyplň:

```bash
# Sanity
NUXT_PUBLIC_SANITY_PROJECT_ID=...
NUXT_PUBLIC_SANITY_DATASET=production

# Instagram (voliteľné)
INSTAGRAM_ACCESS_TOKEN=...
```

## 📄 Skripty

| Príkaz             | Popis           |
| ------------------ | --------------- |
| `npm run dev`      | Lokálny server  |
| `npm run build`    | Produkčný build |
| `npm run generate` | Statický export |

## 📝 Licencia

Súkromný projekt.
