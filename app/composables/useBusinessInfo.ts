export interface BusinessInfo {
    name: string
    legalName: string
    alternateName: string
    tagline: string
    email: string
    phoneDisplay: string
    phoneE164: string
    addressLocality: string
    addressRegion: string
    addressCountry: string
    areaServed: string[]
    latitude: number
    longitude: number
    mapUrl: string
    openingHours: string[]
    priceRange: string
    knowsLanguage: string[]
    logoPath: string
    defaultImagePath: string
    socials: {
        instagram: string
        facebook: string
    }
    sameAs: string[]
}

const BUSINESS_INFO: BusinessInfo = {
    name: 'Pauli Fotografka',
    legalName: 'Pauli Fotografka',
    alternateName: 'Fotografka Galanta',
    tagline: 'Zachytávam vaše najkrajšie momenty',
    email: 'mitchie369@gmail.com',
    phoneDisplay: '+421 903 830 347',
    phoneE164: '+421903830347',
    addressLocality: 'Galanta',
    addressRegion: 'SK-TA',
    addressCountry: 'SK',
    areaServed: ['Galanta', 'Sereď', 'Šaľa', 'Trnava', 'Nitra', 'Dunajská Streda', 'Slovensko'],
    latitude: 48.1900,
    longitude: 17.7270,
    mapUrl: 'https://www.google.com/maps/place/Galanta/@48.19,17.727,13z',
    openingHours: ['Mo-Su 00:00-23:59'],
    priceRange: '€€',
    knowsLanguage: ['sk', 'cs'],
    logoPath: '/images/brand_logo/logo.png',
    defaultImagePath: '/images/brand_logo/logo.png',
    socials: {
        instagram: 'https://www.instagram.com/paulifotografka/',
        facebook: 'https://www.facebook.com/paulifotografka',
    },
    sameAs: [
        'https://www.instagram.com/paulifotografka/',
        'https://www.facebook.com/paulifotografka',
    ],
}

export const useBusinessInfo = (): BusinessInfo => BUSINESS_INFO
