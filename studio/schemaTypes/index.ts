import { categoryType } from './categoryType'
import { photoType } from './photoType'
import { homepageType } from './homepageType'
import { aboutType } from './aboutType'
import { galleryType } from './galleryType'
import { servicesType } from './servicesType'

export const schemaTypes = [
    // Singleton stránky
    homepageType,
    aboutType,
    servicesType,

    // Portfólio
    categoryType,
    photoType,
    galleryType,
]

