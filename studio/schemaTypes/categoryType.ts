import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Kategória',
    type: 'document',
    fieldsets: [
        {
            name: 'heroImages',
            title: 'Hero obrázky',
            options: { columns: 2 },
        },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Názov',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'heroLeftImage',
            title: 'Hero ľavý',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'heroImages',
        }),
        defineField({
            name: 'heroRightImage',
            title: 'Hero pravý',
            type: 'image',
            options: { hotspot: true },
            fieldset: 'heroImages',
        }),
        defineField({
            name: 'introImage',
            title: 'Intro obrázok',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'order',
            title: 'Poradie',
            type: 'number',
            initialValue: 0,
            hidden: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'heroLeftImage',
        },
    },
})


