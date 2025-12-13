import { defineField, defineType } from 'sanity'

export const photoType = defineType({
    name: 'photo',
    title: 'Fotografia',
    type: 'document',
    fields: [
        defineField({
            name: 'image',
            title: 'Obrázok',
            type: 'image',
            options: { hotspot: true },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Kategória',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'orientation',
            title: 'Orientácia',
            type: 'string',
            options: {
                list: [
                    { title: 'Na výšku (Portrait)', value: 'portrait' },
                    { title: 'Na šírku (Landscape)', value: 'landscape' },
                ],
                layout: 'radio',
            },
            initialValue: 'portrait',
        }),
    ],
    preview: {
        select: {
            subtitle: 'category.title',
            media: 'image',
            orientation: 'orientation',
        },
        prepare: ({ subtitle, media, orientation }) => ({
            title: orientation === 'portrait' ? '📷 Na výšku' : '🖼️ Na šírku',
            subtitle: subtitle || 'Bez kategórie',
            media,
        }),
    },
})

