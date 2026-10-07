module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        champagne: {
          50: '#fdf9ea', 100: '#fbf4d8', 200: '#f8efc9', 300: '#f4e5ae',
          400: '#eed892', 500: '#e3c372', 600: '#c9a441', 700: '#a87f2f',
          800: '#855f26', 900: '#5c411c', 950: '#3a2a13',
        },
        vanilla: {
          50: '#fffbf0', 100: '#fff8e5', 200: '#fff4d6', 300: '#fdeec4',
          400: '#f8e0a8', 500: '#efcf8a', 600: '#dcb56e', 700: '#b98e55',
          800: '#8f6a41', 900: '#6a4d31',
        },
        honey: {
          50: '#fdf6e7', 100: '#f9ebc8', 200: '#f2d894', 300: '#ecc878',
          400: '#e3b95f', 500: '#d9a441', 600: '#c9932f', 700: '#a87f2f',
          800: '#855f26', 900: '#5c411c',
        },
        espresso: {
          50: '#f7f4ee', 100: '#efe9dd', 200: '#ddcfae', 300: '#c4b8a2',
          400: '#a08f74', 500: '#8a7a5f', 600: '#6f5f46', 700: '#52452f',
          800: '#3d3322', 900: '#2c2418',
        },
        blush: {
          100: '#fdf0e2', 200: '#fbe3cd', 300: '#f2c9a0', 400: '#e8ac7d',
          500: '#d8905f', 600: '#b06f47',
        },
        sage: {
          100: '#e7f0e9', 200: '#cfe3d5', 300: '#bfd8c8', 400: '#a3c4ae',
          500: '#7fa98c', 600: '#5f8a6d', 700: '#476b52',
        },
        ink: '#2c2418',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Nunito Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(92, 65, 28, 0.08), 0 2px 8px rgba(92, 65, 28, 0.06), inset 0 1px 0 rgba(255,255,255,0.7)',
        'glass-lg': '0 24px 64px rgba(92, 65, 28, 0.14), 0 8px 24px rgba(92, 65, 28, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
        'skeu': '0 6px 14px rgba(138, 100, 34, 0.32), 0 2px 4px rgba(138, 100, 34, 0.28), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 0 rgba(92, 65, 28, 0.18)',
        'skeu-pressed': 'inset 0 3px 6px rgba(92, 65, 28, 0.35), inset 0 -1px 0 rgba(255,255,255,0.35)',
        'gold-glow': '0 0 0 1px rgba(217, 164, 65, 0.35), 0 8px 28px rgba(217, 164, 65, 0.38)',
        'inner-soft': 'inset 0 2px 6px rgba(92, 65, 28, 0.12), inset 0 -1px 0 rgba(255,255,255,0.65)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -24px) scale(1.06)' },
        },
        'float-slower': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-40px, 20px) scale(0.94)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float-slow': 'float-slow 14s ease-in-out infinite',
        'float-slower': 'float-slower 18s ease-in-out infinite',
        'shimmer': 'shimmer 2.8s linear infinite',
      },
    },
  },
  plugins: [],
};
