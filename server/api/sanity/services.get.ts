import { defineEventHandler } from 'h3'
import { createClient } from '@sanity/client'

const client = createClient({
    projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || 'm42prcjy',
    dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
})

/**
 * Fetches Services page content from Sanity CMS.
 *
 * @returns Object with `heroVideo` and service-specific images (rodina, novorodenci, tehotenstvo, svadby)
 */
export default defineEventHandler(async () => {
    const query = `*[_type == "services" && _id == "services"][0]{
        heroVideo{
            asset->{
                _id,
                url
            }
        },
        rodinaImage{
            asset->{
                _id,
                url
            }
        },
        novorodenciImage{
            asset->{
                _id,
                url
            }
        },
        tehotenstvoImage{
            asset->{
                _id,
                url
            }
        },
        svadbyImage{
            asset->{
                _id,
                url
            }
        }
    }`

    const data = await client.fetch(query)
    return data
})
