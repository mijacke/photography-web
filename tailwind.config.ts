import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        sand: '#f5f3ec',
        olive: '#535943',
        charcoal: '#1f1f1a',
        white: '#ffffff'
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 22px 60px -36px rgba(17, 24, 39, 0.4)'
      }
    }
  }
} satisfies Config
