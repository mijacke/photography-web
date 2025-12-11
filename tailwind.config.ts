import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcfa',
          100: '#faf8f5',
          200: '#f5f0e8',
          300: '#ebe3d5',
        },
        charcoal: {
          500: '#5c5653',
          600: '#4a4543',
          700: '#3d3835',
          800: '#2d2926',
          900: '#231f20',
        },
        warm: {
          300: '#d4bc94',
          400: '#c4a574',
          500: '#b08d57',
          600: '#9a7a4a',
          700: '#846a40',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        script: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
} satisfies Config
