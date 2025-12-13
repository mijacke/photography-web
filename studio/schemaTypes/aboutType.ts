import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
    name: 'about',
    title: 'O mne',
    type: 'document',
    fields: [
        defineField({
            name: 'mainImage',
            title: 'Hlavný obrázok (portrét)',
            type: 'image',
            options: { hotspot: true },
            description: 'Portrétová fotka fotografky',
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
