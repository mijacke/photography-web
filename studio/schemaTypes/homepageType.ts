import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
    name: 'homepage',
    title: 'Hlavná stránka',
    type: 'document',
    fieldsets: [
        {
            name: 'portfolioImages',
            title: 'Portfólio náhľady',
            description: 'Obrázky zobrazené v sekcii portfólia na hlavnej stránke',
            options: {
                columns: 2,
            },
        },
    ],
    fields: [
        defineField({
            name: 'heroImages',
            title: 'Hero carousel obrázky (6 kusov)',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
            }],
            description: 'Obrázky pre carousel na hlavnej stránke',
            validation: (rule) => rule.max(6),
        }),
        defineField({
            name: 'aboutImage',
            title: 'O mne sekcia - obrázok',
            type: 'image',
            options: { hotspot: true },
            description: 'Portrétová fotka v sekcii "O mne" (aj pre /about stránku)',
        }),
        defineField({
            name: 'portfolioRodinaImage',
            title: 'Rodina',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'portfolioImages',
        }),
        defineField({
            name: 'portfolioSvadbyImage',
            title: 'Svadby',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'portfolioImages',
        }),
        defineField({
            name: 'portfolioNovorodenciImage',
            title: 'Novorodenci',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'portfolioImages',
        }),
        defineField({
            name: 'portfolioTehotenstvoImage',
            title: 'Tehotenstvo',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'portfolioImages',
        }),
        defineField({
            name: 'galleryCarouselImages',
            title: 'Galéria carousel obrázky (2 kusy)',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
            }],
            description: 'Obrázky pre carousel galériu pod portfóliom',
            validation: (rule) => rule.max(2),
        }),
    ],
    preview: {
        prepare: () => ({
            title: 'Hlavná stránka',
            subtitle: 'Obrázky pre homepage',
        }),
    },
})

