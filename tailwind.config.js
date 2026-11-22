/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#07070a',
        carbon: '#0d0d12',
        slate950: '#101018',
        ember: {
          50: '#fff1f1',
          100: '#ffe0e0',
          200: '#ffc6c6',
          300: '#ff9d9d',
          400: '#ff6363',
          500: '#f8312f',
          600: '#e50914',
          700: '#c10810',
          800: '#9f0a12',
          900: '#830d15',
        },
        gold: '#e5b567',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionDuration: {
        350: '350ms',
        400: '400ms',
        450: '450ms',
      },
      boxShadow: {
        glow: '0 0 24px rgba(229, 9, 20, 0.45)',
        'glow-soft': '0 0 60px rgba(229, 9, 20, 0.25)',
        card: '0 24px 60px -20px rgba(0,0,0,0.85)',
      },
      backgroundImage: {
        'cinematic-radial':
          'radial-gradient(ellipse 80% 55% at 50% -10%, rgba(229,9,20,0.22), transparent 60%)',
        'grid-fade':
          'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'caret-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-glow': 'pulse-glow 2.6s ease-in-out infinite',
        'caret-blink': 'caret-blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
