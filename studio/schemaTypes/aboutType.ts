import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
    name: 'about',
    title: 'O mne',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero sekcia' },
        { name: 'main', title: 'Hlavný obsah' },
        { name: 'philosophy', title: 'Filozofia' },
        { name: 'cta', title: 'Výzva k akcii' },
    ],
    fields: [
        // ===== HERO SECTION =====
        defineField({
            name: 'heroAccent',
            title: 'Hero - Accent text',
            type: 'string',
            group: 'hero',
            description: 'Malý text nad nadpisom (napr. "Za každým záberom")',
        }),
        defineField({
            name: 'heroLine1',
            title: 'Hero - Riadok 1',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroLine2',
            title: 'Hero - Riadok 2',
            type: 'string',
            group: 'hero',
        }),
        defineField({
            name: 'heroLine3',
            title: 'Hero - Riadok 3 (zvýraznený)',
            type: 'string',
            group: 'hero',
            description: 'Tento text bude zvýraznený zlatou farbou',
        }),
        defineField({
            name: 'heroCta',
            title: 'Hero - CTA text',
            type: 'string',
            group: 'hero',
            description: 'Text tlačidla pod nadpisom (napr. "Spoznajte ma")',
        }),

        // ===== MAIN CONTENT =====
        defineField({
            name: 'mainImage',
            title: 'Hlavný obrázok (portrét)',
            type: 'image',
            options: { hotspot: true },
            group: 'main',
            description: 'Portrétová fotka fotografky',
        }),
        defineField({
            name: 'mainTitle',
            title: 'Hlavný nadpis',
            type: 'string',
            group: 'main',
            description: 'Napr. "Ahoj, som Pauli"',
        }),
        defineField({
            name: 'paragraphs',
            title: 'Odseky textu',
            type: 'array',
            group: 'main',
            of: [{ type: 'text', rows: 4 }],
            description: 'Jednotlivé odseky textu o mne (zobrazené postupne s animáciou)',
        }),

        // ===== PHILOSOPHY SECTION =====
        defineField({
            name: 'philosophyAccent',
            title: 'Filozofia - Accent',
            type: 'string',
            group: 'philosophy',
            description: 'Malý text (napr. "Moja filozofia")',
        }),
        defineField({
            name: 'philosophyTitle',
            title: 'Filozofia - Nadpis',
            type: 'string',
            group: 'philosophy',
        }),
        defineField({
            name: 'philosophyItems',
            title: 'Filozofia - Položky',
            type: 'array',
            group: 'philosophy',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'icon', title: 'Ikona', type: 'string', description: 'Dostupné ikony: heart, camera, clock, check, images, location, mail, phone, facebook, instagram' }),
                        defineField({ name: 'title', title: 'Nadpis', type: 'string' }),
                        defineField({ name: 'description', title: 'Popis', type: 'text', rows: 2 }),
                    ],
                    preview: {
                        select: { title: 'title' },
                    },
                },
            ],
        }),

        // ===== CTA SECTION =====
        defineField({
            name: 'ctaTitle',
            title: 'CTA - Nadpis',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'ctaText',
            title: 'CTA - Text',
            type: 'string',
            group: 'cta',
        }),
        defineField({
            name: 'ctaButtonText',
            title: 'CTA - Text tlačidla',
            type: 'string',
            group: 'cta',
        }),
    ],
    preview: {
        select: {
            media: 'mainImage',
        },
        prepare: ({ media }) => ({
            title: 'O mne',
            subtitle: 'Stránka O mne',
            media,
        }),
    },
})
