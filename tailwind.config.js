/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        sandstone: '#C9A77D',
        night: '#071627',
        gold: '#D6B25E',
        neutral: '#F6F3EE',
        text: '#101828',
        'night-light': '#0f2440',
        'gold-light': '#e8cc7a',
        'gold-dark': '#b8972e',
        'sandstone-light': '#dfc4a3',
        'sandstone-dark': '#a8875d',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Kufi Arabic"', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        120: '30rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-up-delay': 'fadeInUp 0.8s ease-out 0.2s both',
        'fade-in-up-delay-2': 'fadeInUp 0.8s ease-out 0.4s both',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite linear',
        float: 'float 15s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'count-pulse': 'countPulse 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s ease-out',
        'parallax-slow': 'parallaxSlow 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-5px)' },
          '75%': { transform: 'translateY(-25px) translateX(5px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        countPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        parallaxSlow: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        shimmer: 'linear-gradient(90deg, transparent 0%, rgba(201,167,125,0.08) 50%, transparent 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D6B25E 0%, #e8cc7a 50%, #D6B25E 100%)',
        'night-gradient': 'linear-gradient(180deg, #071627 0%, #0f2440 100%)',
        'mosaic-subtle': 'repeating-conic-gradient(rgba(201,167,125,0.03) 0% 25%, transparent 0% 50%)',
      },
      backgroundSize: {
        shimmer: '200% 100%',
        '300%': '300% 300%',
      },
      boxShadow: {
        'gold-glow': '0 0 40px rgba(214,178,94,0.15)',
        'gold-glow-lg': '0 0 80px rgba(214,178,94,0.2)',
        'card-hover': '0 20px 40px rgba(7,22,39,0.1)',
      },
    },
  },
  plugins: [],
};
