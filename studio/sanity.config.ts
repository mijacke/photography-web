import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'

import type { StructureBuilder } from 'sanity/structure'

// Custom desk structure for organized navigation
const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Obsah')
    .items([
      // Singleton pages
      S.listItem()
        .title('🏠 Hlavná stránka')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.listItem()
        .title('👤 O mne')
        .id('about')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('📸 Služby')
        .id('services')
        .child(
          S.document()
            .schemaType('services')
            .documentId('services')
        ),

      S.divider(),

      // Portfolio categories with nested photos
      S.listItem()
        .title('📁 Kategórie portfólia')
        .id('categories')
        .child(
          S.documentTypeList('category')
            .title('Kategórie')
            .child((categoryId: string) =>
              S.list()
                .title('Kategória')
                .items([
                  // Edit category settings
                  S.listItem()
                    .title('⚙️ Nastavenia kategórie')
                    .child(
                      S.document()
                        .schemaType('category')
                        .documentId(categoryId)
                    ),

                  S.divider(),

                  // Gallery for this category (Direct Access with deterministic ID)
                  S.listItem()
                    .title('🖼️ Galéria fotiek')
                    .child(
                      S.document()
                        .schemaType('gallery')
                        .documentId(`gallery-${categoryId}`)
                        .initialValueTemplate('gallery-by-category', { categoryId })
                    ),
                ])
            )
        ),

      S.divider(),

      // All galleries
      S.listItem()
        .title('🖼️ Všetky galérie')
        .id('galleries')
        .child(
          S.documentList()
            .title('Všetky galérie')
            .filter('_type == "gallery"')
        ),
    ])

export default defineConfig({
  name: 'default',
  title: 'Photography Web',
  basePath: '/structure', // Opens Structure view by default

  projectId: 'm42prcjy',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'gallery-by-category',
        title: 'Galéria pre kategóriu',
        description: 'Vytvorí galériu pre špecifickú kategóriu',
        schemaType: 'gallery',
        parameters: [{ name: 'categoryId', type: 'string' }],
        value: ({ categoryId }: { categoryId: string }) => ({
          category: { _type: 'reference', _ref: categoryId },
        }),
      },
    ],
  },
})
