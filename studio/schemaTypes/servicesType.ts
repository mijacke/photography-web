import { defineField, defineType } from 'sanity'

export const servicesType = defineType({
    name: 'services',
    title: 'Stránka služieb',
    type: 'document',
    fieldsets: [
        {
            name: 'serviceImages',
            title: 'Obrázky pre služby',
            description: 'Obrázky zobrazené pri jednotlivých službách',
            options: {
                columns: 2,
            },
        },
    ],
    fields: [
        defineField({
            name: 'heroVideo',
            title: 'Hero video',
            type: 'file',
            options: {
                accept: 'video/*'
            },
            description: 'Video zobrazené na vrchu stránky služieb (MP4 formát)',
        }),
        defineField({
            name: 'rodinaImage',
            title: 'Rodina',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'serviceImages',
            description: 'Obrázok pre službu Rodinné fotenie',
        }),
        defineField({
            name: 'novorodenciImage',
            title: 'Novorodenci',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'serviceImages',
            description: 'Obrázok pre službu Novorodenecké fotenie',
        }),
        defineField({
            name: 'tehotenstvoImage',
            title: 'Tehotenstvo',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'serviceImages',
            description: 'Obrázok pre službu Tehotenské fotenie',
        }),
        defineField({
            name: 'svadbyImage',
            title: 'Svadby',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'serviceImages',
            description: 'Obrázok pre službu Svadobné fotenie',
        }),
    ],
    preview: {
        prepare: () => ({
            title: 'Stránka služieb',
            subtitle: 'Video a obrázky pre /services',
        }),
    },
})
