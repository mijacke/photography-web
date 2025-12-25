import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
    name: 'homepage',
    title: 'Hlavná stránka',
    type: 'document',
    groups: [
        { name: 'images', title: 'Obrázky' },
        { name: 'services', title: 'Služby sekcia' },
        { name: 'testimonials', title: 'Testimonials' },
    ],
    fieldsets: [
        {
            name: 'portfolioImages',
            title: 'Portfólio náhľady',
            description: 'Obrázky zobrazené v sekcii portfólia na hlavnej stránke',
            options: { columns: 2 },
        },
    ],
    fields: [
        // ===== IMAGES =====
        defineField({
            name: 'heroImages',
            title: 'Hero carousel obrázky (6 kusov)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            group: 'images',
            description: 'Obrázky pre carousel na hlavnej stránke',
            validation: (rule) => rule.max(6),
        }),
        defineField({
            name: 'aboutImage',
            title: 'O mne sekcia - obrázok',
            type: 'image',
            options: { hotspot: true },
            group: 'images',
            description: 'Portrétová fotka v sekcii "O mne" (aj pre /about stránku)',
        }),
        defineField({
            name: 'portfolioRodinaImage',
            title: 'Rodina',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'portfolioImages',
            group: 'images',
        }),
        defineField({
            name: 'portfolioSvadbyImage',
            title: 'Svadby',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'portfolioImages',
            group: 'images',
        }),
        defineField({
            name: 'portfolioNovorodenciImage',
            title: 'Novorodenci',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'portfolioImages',
            group: 'images',
        }),
        defineField({
            name: 'portfolioTehotenstvoImage',
            title: 'Tehotenstvo',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'portfolioImages',
            group: 'images',
        }),
        defineField({
            name: 'galleryCarouselImages',
            title: 'Galéria carousel obrázky (2 kusy)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            group: 'images',
            description: 'Obrázky pre carousel galériu pod portfóliom',
            validation: (rule) => rule.max(2),
        }),

        // ===== SERVICES SECTION =====
        defineField({
            name: 'servicesParagraphs',
            title: 'Služby - Odseky',
            type: 'array',
            of: [{ type: 'text', rows: 4 }],
            group: 'services',
            description: '3 odseky textu v sekcii služieb',
        }),

        // ===== TESTIMONIALS SECTION =====
        defineField({
            name: 'testimonialsSubtitle',
            title: 'Testimonials - Subtitle',
            type: 'string',
            group: 'testimonials',
            description: 'Napr. "Milé slová od Vás"',
        }),
        defineField({
            name: 'testimonialsTitle',
            title: 'Testimonials - Nadpis',
            type: 'string',
            group: 'testimonials',
            description: 'Napr. "Čo hovoria klienti"',
        }),
        defineField({
            name: 'testimonials',
            title: 'Testimonials',
            type: 'array',
            group: 'testimonials',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'quote', title: 'Citát', type: 'text', rows: 3 }),
                        defineField({ name: 'author', title: 'Autor', type: 'string', description: 'Napr. "Dávid a Lívia"' }),
                        defineField({ name: 'occasion', title: 'Typ fotenia', type: 'string', description: 'Napr. "Novorodenecké fotenie"' }),
                    ],
                    preview: {
                        select: { title: 'author', subtitle: 'occasion' },
                    },
                },
            ],
        }),
    ],
    preview: {
        prepare: () => ({
            title: 'Hlavná stránka',
            subtitle: 'Obrázky, služby a testimonials pre homepage',
        }),
    },
})
