import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Kategória',
    type: 'document',
    groups: [
        { name: 'basic', title: 'Základné' },
        { name: 'hero', title: 'Hero sekcia' },
        { name: 'intro', title: 'Intro sekcia' },
        { name: 'seo', title: 'SEO' },
    ],
    fieldsets: [
        {
            name: 'heroImages',
            title: 'Hero obrázky',
            options: { columns: 2 },
        },
    ],
    fields: [
        // ===== BASIC =====
        defineField({
            name: 'title',
            title: 'Názov',
            type: 'string',
            group: 'basic',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: { source: 'title' },
            group: 'basic',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'order',
            title: 'Poradie',
            type: 'number',
            initialValue: 0,
            group: 'basic',
            hidden: true,
        }),

        // ===== HERO SECTION =====
        defineField({
            name: 'heroSubtitle',
            title: 'Hero - Subtitle',
            type: 'string',
            group: 'hero',
            description: 'Malý text nad nadpisom (napr. "PORTFÓLIO")',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero - Názov',
            type: 'string',
            group: 'hero',
            description: 'Hlavný nadpis (napr. "svadobné fotografie")',
        }),
        defineField({
            name: 'heroLeftImage',
            title: 'Hero ľavý obrázok',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'heroImages',
            group: 'hero',
        }),
        defineField({
            name: 'heroRightImage',
            title: 'Hero pravý obrázok',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'heroImages',
            group: 'hero',
        }),

        // ===== INTRO SECTION =====
        defineField({
            name: 'introSubtitle',
            title: 'Intro - Subtitle',
            type: 'string',
            group: 'intro',
            description: 'Napr. "O svadobnom fotení"',
        }),
        defineField({
            name: 'introTitle',
            title: 'Intro - Nadpis',
            type: 'string',
            group: 'intro',
            description: 'Napr. "Svadobné Fotografie"',
        }),
        defineField({
            name: 'introParagraphs',
            title: 'Intro - Odseky',
            type: 'array',
            of: [{ type: 'text', rows: 3 }],
            group: 'intro',
            description: 'Odseky textu (zobrazené postupne)',
        }),
        defineField({
            name: 'introImage',
            title: 'Intro obrázok',
            type: 'image',
            options: { hotspot: true },
            group: 'intro',
        }),

        // ===== SEO =====
        defineField({
            name: 'servedCitiesNote',
            title: 'Kde fotím (mestá a okolie)',
            type: 'text',
            rows: 2,
            group: 'seo',
            description:
                'Krátky odstavec (1–2 vety) so zoznamom miest, kde fotíš. Napr. „Pôsobím v Galante a okolí — Šaľa, Sereď, Trnava, Nitra a západné Slovensko." Ak necháš prázdne, sekcia sa na stránke nezobrazí.',
            validation: (rule) => rule.max(280),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'heroLeftImage',
        },
    },
})
