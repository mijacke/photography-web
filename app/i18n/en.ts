import type { AppMessages } from './types'

export const enMessages: AppMessages = {
  meta: {
    locale: 'en',
    dateLocale: 'en-US'
  },
  navigation: {
    brand: 'ML PHOTO',
    links: [
      { label: 'Gallery', href: '/portfolio' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' }
    ],
    ctas: {
      home: { label: 'Book a date', href: '#contact' },
      default: { label: 'Book a date', href: '/contact' }
    }
  },
  home: {
    masthead: {
      eyebrow: 'Documentary photography',
      title: 'Moments that feel like you.',
      description: 'Natural light, real reactions, clean edits. Scroll to see services and recent stories.',
      cta: { label: 'See the gallery', href: '#portfolio' },
      imageAlt: 'Documentary photo highlight'
    },
    profile: {
      title: 'Pauli Drahosova',
      eyebrow: 'Documentary Photography',
      description:
        "Don't expect stiff poses or fake smiles on command. The best photos happen when you forget for a moment that the lens is pointed at you. I focus on the atmosphere, the laughter that crinkles your face, and the quiet moments that speak louder than words.",
      ctaLabel: 'Inquiry',
      ctaHref: '#contact',
      imageSrc: '/images/home/homehero.jpg',
      imageAlt: 'Moody portrait in nature'
    },
    services: {
      eyebrow: 'Services',
      title: 'Documentary coverage with room to breathe.',
      description: 'Natural flow, real reactions, streamlined handoff of edited stories for you and your people.',
      imageSrc: '/images/home/homehero.jpg',
      imageAlt: 'Documentary highlight',
      items: [
        {
          title: 'Wedding',
          bullets: ['Full day / Half day coverage', 'Storytelling & candid moments'],
          stat: '250+ Captured'
        },
        {
          title: 'Event coverage',
          bullets: ['Corporate & private events', 'Real-time documentation'],
          stat: '350+ Events'
        },
        {
          title: 'Commercial',
          bullets: ['Brand & campaign shots', 'Social Media & Marketing Assets'],
          stat: '30+ Brands'
        }
      ]
    },
    portfolioPreview: {
      eyebrow: 'Portfolio',
      title: 'Latest galleries',
      description: 'Pulled from your markdown content for quick updates.',
      viewAllLabel: 'View all',
      emptyState: {
        before: 'Add at least one markdown entry inside',
        path: 'content/portfolio',
        after: 'and it will render here as a card.'
      }
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Ready for your date? I reply within 24 hours.',
      subtitle:
        "Share your city, date, and the vibe you're after. I'll propose a lean plan you can react to without long emails.",
      cta: { label: 'Message me', href: 'mailto:hi@paulidrahosova.com' }
    }
  },
  contactPage: {
    hero: {
      eyebrow: 'Contact',
      title: 'Contact me',
      description: 'Share what you need photographed. I will respond quickly with the simplest next step.',
      introText: 'If you are interested in booking a photoshoot, workshop, or gift voucher, you can reach me via the form, email, or phone. I will gladly help you choose the type of session, timing, and all the details to create natural, emotional, and timeless photographs together. I look forward to meeting you – and to turning our shared memories into unforgettable images.',
      availability: 'Available across Europe for weddings, events, and brand stories.',
      callout: 'Tell me if you prefer email or a quick call.',
      primaryCta: { label: 'Send an email', href: 'mailto:hi@paulidrahosova.com' },
      secondaryCta: { label: 'See recent work', href: '/portfolio' }
    },
    contactCards: [
      { label: 'Phone', value: '+421 900 000 000', href: 'tel:+421900000000' },
      { label: 'Email', value: 'hi@paulidrahosova.com', href: 'mailto:hi@paulidrahosova.com' },
      { label: 'Address', value: 'Bratislava, Slovakia' },
      { label: 'Location', value: 'Slovakia · Available across Europe' },
      { label: 'Response', value: 'I usually reply within 24 hours' }
    ],
    form: {
      title: 'Contact form',
      namePlaceholder: 'Full name',
      emailPlaceholder: 'Email',
      datePlaceholder: 'Date + City',
      photoTypePlaceholder: 'Type of photography',
      messagePlaceholder: 'Message',
      consentLabel: 'I agree to the storage and processing of my personal data.',
      submitLabel: 'Send message',
      note: 'Submitting is enabled only after you give consent.'
    }
  },
  services: {
    hero: {
      eyebrow: 'Services',
      title: 'Coverage built for the moments that matter.',
      description:
        'Pick a starting point, then tailor the coverage to your day. Travel within Europe is included on multi-day bookings.',
      badge: 'Dates open for Q4 & early 2025.'
    },
    packageCtaLabel: 'Book',
    alwaysIncluded: {
      title: 'What you always get',
      bullets: [
        'Pre-shoot call and shared moodboard',
        'Story-first edit with consistent color',
        'Secure gallery with easy sharing + download',
        'Backup handling and archival for 12 months'
      ]
    },
    packages: [
      {
        name: 'Essential',
        price: '€950',
        summary: 'Half-day coverage for intimate gatherings.',
        includes: ['Up to 5 hours on-site', '200+ edited photos', 'Private online gallery', '48h preview set'],
        badge: 'Popular for engagements'
      },
      {
        name: 'Signature',
        price: '€1,700',
        summary: 'Full-day storytelling with room for prep and party.',
        includes: [
          'Up to 10 hours on-site',
          '450+ edited photos',
          'Private online gallery + download',
          'Same-week highlight reel'
        ],
        badge: 'Most booked'
      },
      {
        name: 'Documentary Weekend',
        price: '€2,400',
        summary: 'Multi-day coverage for destination weekends and retreats.',
        includes: [
          'Up to 2 days on-site',
          '700+ edited photos',
          'Story-driven sequencing',
          'Travel within EU included'
        ],
        badge: 'For destination events'
      }
    ],
    addOns: {
      eyebrow: 'Add-ons',
      title: 'Make it yours',
      description: 'Choose what matches your day. All add-ons can be decided after our intro call — I keep logistics light.',
      items: ['Second shooter', 'Raw clips for socials', 'Same-day slideshow', 'Film scans on request']
    }
  },
  portfolio: {
    list: {
      eyebrow: 'Portfolio',
      title: 'Markdown-powered gallery',
      description: 'Each file in the content collection renders as its own page.',
      instructions: {
        first: {
          before: 'Each file in',
          code: 'content/portfolio',
          after: 'renders as its own route.'
        },
        second: {
          before: 'Add photos to',
          code: 'public/images/portfolio',
          middle: 'and point to them via',
          field: 'cover',
          after: 'or a gallery array in your markdown.'
        }
      },
      emptyMessage: 'Nothing here yet. Create a markdown file in content/portfolio and this page will list it automatically.'
    },
    detail: {
      backLabel: 'Back to portfolio',
      eyebrow: 'Portfolio'
    }
  },
  footer: {
    brand: 'Pauli Drahosova',
    tagline: 'Documentary photography grounded in real moments.',
    location: 'Slovakia · Available across Europe',
    email: 'hi@paulidrahosova.com',
    sections: {
      explore: {
        title: 'Explore',
        links: [
          { label: 'Gallery', href: '/portfolio' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' }
        ]
      },
      services: {
        title: 'Services',
        links: [
          { label: 'Weddings', href: '/services' },
          { label: 'Events', href: '/services' },
          { label: 'Commercial', href: '/services' }
        ]
      },
      connect: {
        title: 'Connect',
        links: [
          { label: 'Contact', href: '/contact' },
          { label: 'Gallery', href: '/portfolio' }
        ]
      }
    },
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com' }
    ],
    bottomTagline: 'Documentary Photography'
  }
}
