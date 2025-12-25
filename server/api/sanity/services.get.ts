import { defineEventHandler } from 'h3'
import { createClient } from '@sanity/client'

const getSanityClient = () => {
    const config = useRuntimeConfig()
    return createClient({
        projectId: config.public.sanityProjectId as string,
        dataset: config.public.sanityDataset as string,
        apiVersion: '2024-01-01',
        useCdn: false,
    })
}

/**
 * Fetches Services page content from Sanity CMS.
 *
 * @returns Object with hero, service images, services content, and FAQ
 */
export default defineEventHandler(async () => {
    const query = `*[_type == "services" && _id == "services"][0]{
        // Hero section
        heroVideo{
            asset->{
                _id,
                url
            }
        },
        heroText,
        
        // Service images
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
        },
        
        // Services content
        servicesContent[]{
            id,
            title,
            description,
            features,
            cta
        },
        
        // FAQ
        faqAccent,
        faqTitle,
        faqItems[]{
            question,
            answer
        }
    }`

    const client = getSanityClient()
    const data = await client.fetch(query)
    return data
})
