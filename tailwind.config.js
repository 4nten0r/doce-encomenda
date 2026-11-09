/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-primary)',
          primaryHover: 'var(--color-primary-hover)',
          bg: 'var(--color-background)',
          surface: 'var(--color-surface)',
          surfaceSubtle: 'var(--color-surface-subtle)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          success: 'var(--color-success)',
        }
      }
    },
  },
  plugins: [],
};
