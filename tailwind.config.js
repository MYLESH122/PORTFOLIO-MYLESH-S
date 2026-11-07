/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030014',
          900: '#07070f',
          850: '#0b091a',
          800: '#100e26',
          700: '#19153a',
          600: '#262057',
        },
        cyber: {
          purple: '#9333ea',
          violet: '#a855f7',
          neon: '#c084fc',
          cyan: '#06b6d4',
          cyanGlow: '#22d3ee',
          sky: '#38bdf8',
          pink: '#ec4899',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'border-gradient': 'linear-gradient(135deg, rgba(168, 85, 247, 0.5) 0%, rgba(6, 182, 212, 0.5) 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'border-glow': 'border-glow 3s ease infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'border-glow': {
          '0%': { borderColor: 'rgba(168, 85, 247, 0.4)' },
          '100%': { borderColor: 'rgba(6, 182, 212, 0.5)' },
        }
      },
      boxShadow: {
        'neon-purple': '0 0 25px -5px rgba(168, 85, 247, 0.35)',
        'neon-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'neon-combo': '0 0 35px -5px rgba(168, 85, 247, 0.25), 0 0 35px -5px rgba(6, 182, 212, 0.25)',
        'glass-inset': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}

