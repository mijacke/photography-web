import type { AppMessages } from './types'

export const skMessages: AppMessages = {
  meta: {
    locale: 'sk',
    dateLocale: 'sk-SK'
  },
  navigation: {
    brand: 'ML PHOTO',
    links: [
      { label: 'Galéria', href: '/portfolio' },
      { label: 'Služby', href: '/services' },
      { label: 'Kontakt', href: '/contact' }
    ],
    ctas: {
      home: { label: 'Rezervuj termín', href: '#contact' },
      default: { label: 'Rezervuj termín', href: '/contact' }
    }
  },
  home: {
    masthead: {
      eyebrow: 'Dokumentárna fotografia',
      title: 'Momentky, ktoré ste vy.',
      description: 'Prirodzené svetlo, skutočné reakcie, čisté úpravy. Posuň sa nižšie k službám a čerstvým príbehom.',
      cta: { label: 'Pozrieť galériu', href: '#portfolio' },
      imageAlt: 'Dokumentárny záber'
    },
    profile: {
      title: 'Pauli Drahosova',
      eyebrow: 'Dokumentárna fotografia',
      description:
        'Nečakaj strnulé pózy ani vynútené úsmevy. Najlepšie zábery vzniknú, keď na chvíľu zabudneš, že na teba mierim objektívom. Sústreďujem sa na atmosféru, smiech, ktorý ti pokrčí tvár, a tiché momenty, ktoré povedia viac než slová.',
      ctaLabel: 'Napíš mi',
      ctaHref: '#contact',
      imageSrc: '/images/home/homehero.jpg',
      imageAlt: 'Atmosférický portrét v prírode'
    },
    services: {
      eyebrow: 'Služby',
      title: 'Dokumentárne pokrytie s priestorom nadýchnuť sa.',
      description: 'Prirodzený priebeh, skutočné reakcie a plynulé odovzdanie upravených príbehov pre teba a tvojich ľudí.',
      imageSrc: '/images/home/homehero.jpg',
      imageAlt: 'Dokumentárny highlight',
      items: [
        {
          title: 'Svadba',
          bullets: ['Celodenné / pol dňa', 'Príbeh a úprimné momenty'],
          stat: '250+ zachytených'
        },
        {
          title: 'Eventy',
          bullets: ['Firemné aj súkromné akcie', 'Dokumentácia v reálnom čase'],
          stat: '350+ eventov'
        },
        {
          title: 'Komercia',
          bullets: ['Brand & kampane', 'Fotky pre sociálne siete a marketing'],
          stat: '30+ značiek'
        }
      ]
    },
    portfolioPreview: {
      eyebrow: 'Portfólio',
      title: 'Najnovšie galérie',
      description: 'Načítané z markdownu pre rýchle úpravy.',
      viewAllLabel: 'Zobraziť všetko',
      emptyState: {
        before: 'Pridaj aspoň jeden markdown do',
        path: 'content/portfolio',
        after: 'a ukážem ho tu ako kartu.'
      }
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Pripravený termín? Odpíšem do 24 hodín.',
      subtitle:
        'Napíš mesto, dátum a atmosféru, ktorú chceš. Navrhnem jednoduchý plán bez dlhých mailov.',
      cta: { label: 'Napísať správu', href: 'mailto:hi@paulidrahosova.com' }
    }
  },
  contactPage: {
    hero: {
      eyebrow: 'Kontakt',
      title: 'Kontaktujte ma',
      description: 'Vyplňte stručne, čo potrebujete nafotiť. Odpíšem rýchlo a navrhnem jednoduchý ďalší krok.',
      introText: 'Ak máte záujem o rezerváciu fotenia, workshop alebo darčekovú poukážku, môžete ma kontaktovať prostredníctvom formulára, e-mailu alebo telefonicky. Rada vám poradím s výberom typu fotenia, termínu aj všetkými detailmi, aby sme spolu vytvorili prirodzené, emotívne a nadčasové fotografie. Teším sa na naše stretnutie – a na spomienky, ktoré spolu premeníme na nezabudnuteľné zábery.'
    },
    contactCards: [
      { label: 'Telefón', value: '+421 900 000 000', href: 'tel:+421900000000' },
      { label: 'Email', value: 'hi@paulidrahosova.com', href: 'mailto:hi@paulidrahosova.com' },
      { label: 'Adresa', value: 'Bratislava, Slovensko' },
      { label: 'Pôsobenie', value: 'Slovensko · Dostupná po Európe' },
      { label: 'Odpoveď', value: 'Reagujem zvyčajne do 24 hodín' }
    ],
    form: {
      title: 'Kontaktný formulár',
      namePlaceholder: 'Meno a priezvisko',
      emailPlaceholder: 'Email',
      datePlaceholder: 'Dátum + mesto',
      photoTypePlaceholder: 'Typ fotografie',
      messagePlaceholder: 'Správa',
      consentLabel: 'Súhlasím s uložením a spracovaním osobných údajov.',
      submitLabel: 'Odoslať správu',
      note: 'Formulár odošlete až po zaškrtnutí súhlasu.'
    }
  },
  services: {
    hero: {
      eyebrow: 'Služby',
      title: 'Pokrytie šité na momenty, na ktorých záleží.',
      description:
        'Vyber si základ a doladíme ho na tvoj deň. Pri viacdňových foteniach je cestovanie po EÚ v cene.',
      badge: 'Voľné termíny Q4 a začiatok 2025.'
    },
    packageCtaLabel: 'Rezervovať',
    alwaysIncluded: {
      title: 'Čo dostaneš vždy',
      bullets: [
        'Pred-fotkový call a zdieľaná moodboard',
        'Úprava s dôrazom na príbeh a konzistentnú farbu',
        'Bezpečná galéria s jednoduchým zdieľaním + downloadom',
        'Záloha a archivácia na 12 mesiacov'
      ]
    },
    packages: [
      {
        name: 'Essential',
        price: '€950',
        summary: 'Pol dňa pre intímne stretnutia.',
        includes: ['Do 5 hodín na mieste', '200+ upravených fotiek', 'Súkromná online galéria', '48h ukážka']
      },
      {
        name: 'Signature',
        price: '€1,700',
        summary: 'Celodenný príbeh s priestorom na prípravy aj párty.',
        includes: ['Do 10 hodín na mieste', '450+ upravených fotiek', 'Súkromná galéria + download', 'Highlight v tom istom týždni'],
        badge: 'Najčastejšie'
      },
      {
        name: 'Documentary Weekend',
        price: '€2,400',
        summary: 'Viacdňové pokrytie pre destination víkendy a retreaty.',
        includes: ['Do 2 dní na mieste', '700+ upravených fotiek', 'Story-driven sekvencovanie', 'Cestovanie v rámci EÚ v cene'],
        badge: 'Pre destination akcie'
      }
    ],
    addOns: {
      eyebrow: 'Doplnky',
      title: 'Prispôsob si to',
      description: 'Vyber si, čo sedí tvojmu dňu. Doplnky vieme uzavrieť aj po úvodnom calle — logistiku držím ľahkú.',
      items: ['Druhý fotograf', 'Raw videá na siete', 'Slide-show v deň akcie', 'Analógové scany na požiadanie']
    }
  },
  portfolio: {
    list: {
      eyebrow: 'Portfólio',
      title: 'Galéria z markdownu',
      description: 'Každý súbor v kolekcii obsahu sa zobrazuje ako vlastná stránka.',
      instructions: {
        first: {
          before: 'Každý súbor v',
          code: 'content/portfolio',
          after: 'sa vykreslí ako vlastná route.'
        },
        second: {
          before: 'Fotky pridaj do',
          code: 'public/images/portfolio',
          middle: 'a nasmeruj ich cez',
          field: 'cover',
          after: 'alebo pole galérie v markdowne.'
        }
      },
      emptyMessage: 'Zatiaľ tu nič nie je. Vytvor markdown v content/portfolio a stránka ho automaticky pridá.'
    },
    detail: {
      backLabel: 'Späť na portfólio',
      eyebrow: 'Portfólio'
    }
  },
  footer: {
    brand: 'Pauli Drahosova',
    tagline: 'Dokumentárna fotografia zakorenená v skutočných momentoch.',
    location: 'Slovensko · Dostupný po Európe',
    email: 'hi@paulidrahosova.com',
    sections: {
      explore: {
        title: 'Prejdi',
        links: [
          { label: 'Galéria', href: '/portfolio' },
          { label: 'Služby', href: '/services' },
          { label: 'Kontakt', href: '/contact' }
        ]
      },
      services: {
        title: 'Služby',
        links: [
          { label: 'Svadby', href: '/services' },
          { label: 'Eventy', href: '/services' },
          { label: 'Komercia', href: '/services' }
        ]
      },
      connect: {
        title: 'Spojme sa',
        links: [
          { label: 'Kontakt', href: '/contact' },
          { label: 'Galéria', href: '/portfolio' }
        ]
      }
    },
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com' }
    ],
    bottomTagline: 'Dokumentárna fotografia'
  }
}
