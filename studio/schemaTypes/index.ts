import { categoryType } from './categoryType'
import { photoType } from './photoType'
import { homepageType } from './homepageType'
import { aboutType } from './aboutType'
import { galleryType } from './galleryType'

export const schemaTypes = [
    // Singleton stránky
    homepageType,
    aboutType,

    // Portfólio
    categoryType,
    photoType,
    galleryType,
]
