import { defineField, defineType } from 'sanity'

export const servicesType = defineType({
    name: 'services',
    title: 'Stránka služieb',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero sekcia' },
        { name: 'servicesList', title: 'Služby' },
        { name: 'faq', title: 'Časté otázky' },
    ],
    fieldsets: [
        {
            name: 'serviceImages',
            title: 'Obrázky pre služby',
            description: 'Obrázky zobrazené pri jednotlivých službách',
            options: { columns: 2 },
        },
    ],
    fields: [
        // ===== HERO SECTION =====
        defineField({
            name: 'heroVideo',
            title: 'Hero video',
            type: 'file',
            options: { accept: 'video/*' },
            group: 'hero',
            description: 'Video zobrazené na vrchu stránky služieb (MP4 formát)',
        }),
        defineField({
            name: 'heroText',
            title: 'Hero text',
            type: 'string',
            group: 'hero',
            description: 'Text pod videom (napr. "Každé fotenie je starostlivo pripravené...")',
        }),

        // ===== SERVICE IMAGES =====
        defineField({
            name: 'rodinaImage',
            title: 'Rodina',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'serviceImages',
            group: 'servicesList',
            description: 'Obrázok pre službu Rodinné fotenie',
        }),
        defineField({
            name: 'novorodenciImage',
            title: 'Novorodenci',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'serviceImages',
            group: 'servicesList',
            description: 'Obrázok pre službu Novorodenecké fotenie',
        }),
        defineField({
            name: 'tehotenstvoImage',
            title: 'Tehotenstvo',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'serviceImages',
            group: 'servicesList',
            description: 'Obrázok pre službu Tehotenské fotenie',
        }),
        defineField({
            name: 'svadbyImage',
            title: 'Svadby',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'serviceImages',
            group: 'servicesList',
            description: 'Obrázok pre službu Svadobné fotenie',
        }),

        // ===== SERVICES CONTENT =====
        defineField({
            name: 'servicesContent',
            title: 'Obsah služieb',
            type: 'array',
            group: 'servicesList',
            description: 'Detaily pre každú službu (rodina, novorodenci, tehotenstvo, svadby)',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'id', title: 'ID', type: 'string', description: 'rodina, novorodenci, tehotenstvo, svadby' }),
                        defineField({ name: 'title', title: 'Názov', type: 'string' }),
                        defineField({ name: 'description', title: 'Popis', type: 'text', rows: 3 }),
                        defineField({
                            name: 'features',
                            title: 'Vlastnosti',
                            type: 'array',
                            of: [{ type: 'string' }],
                            description: 'Zoznam bodov (napr. "1-2 hodinové fotenie")',
                        }),
                        defineField({ name: 'cta', title: 'Text tlačidla', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'id' },
                    },
                },
            ],
        }),

        // ===== FAQ SECTION =====
        defineField({
            name: 'faqTitle',
            title: 'FAQ - Nadpis',
            type: 'string',
            group: 'faq',
            description: 'Napr. "Čo vás zaujíma?"',
        }),
        defineField({
            name: 'faqAccent',
            title: 'FAQ - Accent',
            type: 'string',
            group: 'faq',
            description: 'Napr. "Časté otázky"',
        }),
        defineField({
            name: 'faqItems',
            title: 'FAQ položky',
            type: 'array',
            group: 'faq',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'question', title: 'Otázka', type: 'string' }),
                        defineField({ name: 'answer', title: 'Odpoveď', type: 'text', rows: 3 }),
                    ],
                    preview: {
                        select: { title: 'question' },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare: () => ({
            title: 'Stránka služieb',
            subtitle: 'Video, služby a FAQ pre /services',
        }),
    },
})
