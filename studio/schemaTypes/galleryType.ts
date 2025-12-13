import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
    name: 'gallery',
    title: 'Galéria fotiek',
    type: 'document',
    fields: [
        defineField({
            name: 'category',
            title: 'Kategória',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (rule) => rule.required(),
            readOnly: ({ document }) => !!document?._id, // Prevent changing category once created if cleaner
        }),
        defineField({
            name: 'portraitPhotos',
            title: '📷 Fotografie na výšku (Portrait)',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
            }],
            options: {
                layout: 'grid',
            },
            description: 'Potiahni sem viacero fotiek na výšku naraz',
        }),
        defineField({
            name: 'landscapePhotos',
            title: '🖼️ Fotografie na šírku (Landscape)',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
            }],
            options: {
                layout: 'grid',
            },
            description: 'Potiahni sem viacero fotiek na šírku naraz',
        }),
    ],
    preview: {
        select: {
            title: 'category.title',
            media: 'landscapePhotos.0',
        },
        prepare: ({ title, media }) => ({
            title: title ? `Galéria: ${title}` : 'Nová galéria',
            subtitle: 'Galéria fotiek',
            media,
        }),
    },
})
