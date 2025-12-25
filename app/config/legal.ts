/**
 * Centralized legal configuration
 * Single source of truth for privacy/cookies pages
 */

export const POLICY_VERSION = '2025-12'

export const OPERATOR = {
    name: 'Pauli Fotografka',
    fullName: 'Paulína Drahošová',
    address: 'Galanta, Slovensko',
    email: 'mitchie369@gmail.com',
    phone: '+421 903 830 347',
}

export const CONSENT_CATEGORIES = {
    necessary: {
        id: 'necessary',
        name: 'Nevyhnutné (Technické)',
        description: 'Potrebné pre fungovanie stránky. Nevyžadujú súhlas.',
        required: true,
    },
    analytics: {
        id: 'analytics',
        name: 'Analytické',
        description: 'Anonymné štatistiky návštevnosti (Google Analytics).',
        required: false,
    },
    externalMedia: {
        id: 'externalMedia',
        name: 'Externé médiá',
        description: 'Google Maps na kontaktnej stránke.',
        required: false,
    },
} as const

export const COOKIE_ITEMS = {
    necessary: [
        {
            name: 'cookie-consent',
            provider: 'paulifotografka.sk',
            type: 'localStorage',
            purpose: 'Ukladá preferencie cookies a ID súhlasu',
            expiry: '12 mesiacov',
        },
    ],
    analytics: [
        {
            name: '_ga, _ga_*',
            provider: 'Google Analytics',
            type: 'cookie',
            purpose: 'Sledovanie návštevnosti',
            expiry: '2 roky',
        },
    ],
    externalMedia: [
        {
            name: 'CONSENT, NID',
            provider: 'Google Maps',
            type: 'cookie',
            purpose: 'Zobrazenie interaktívnej mapy',
            expiry: '6 mesiacov',
        },
    ],
}

export const RECIPIENTS = [
    {
        name: 'Google LLC',
        country: 'USA',
        services: ['Google Analytics', 'Google Maps'],
        dpfCertified: true,
        dpfLink: 'https://www.dataprivacyframework.gov/list',
    },
    {
        name: 'Vercel Inc.',
        country: 'USA',
        services: ['Hosting', 'Serverless Functions'],
        dpfCertified: true,
        dpfLink: 'https://www.dataprivacyframework.gov/list',
    },
]

export const RETENTION = {
    contactForm: {
        period: '3 roky',
        reason: 'Pre prípadné následné otázky, reklamácie alebo právne nároky.',
        afterExpiry: 'Údaje sú trvalo vymazané.',
    },
    consentLogs: {
        period: '3 roky',
        reason: 'Právna povinnosť preukázať platný súhlas podľa GDPR.',
        afterExpiry: 'Záznamy sú anonymizované.',
    },
    analytics: {
        period: '26 mesiacov',
        reason: 'Štandardná doba uchovávania Google Analytics.',
        afterExpiry: 'Google automaticky vymaže údaje.',
        note: 'IP adresy sú anonymizované pred spracovaním.',
    },
    consentExpiry: '12 mesiacov',
}

export const DATA_PROCESSING = {
    contactForm: {
        legalBasis: 'Súhlas (GDPR čl. 6 ods. 1 písm. a)',
        legalBasisNote: 'Odoslaním správy súhlasíte so spracovaním vašich údajov za účelom vybavenia vašej požiadavky.',
    },
    analytics: {
        legalBasis: 'Súhlas (GDPR čl. 6 ods. 1 písm. a)',
    },
    consentLogs: {
        legalBasis: 'Právna povinnosť (GDPR čl. 6 ods. 1 písm. c)',
    },
}

export const SUPERVISORY_AUTHORITY = {
    name: 'Úrad na ochranu osobných údajov SR',
    address: 'Hraničná 12, 820 07 Bratislava 27',
    website: 'https://dataprotection.gov.sk',
}
