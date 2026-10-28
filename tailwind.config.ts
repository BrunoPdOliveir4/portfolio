import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        border: "var(--border)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        // Mint from the "BP" brand mark, used for accents, glow, and links.
        brand: {
          300: "#9ff9cc",
          400: "#5ef2a6",
          500: "#34d68a",
          600: "#1fb872",
          700: "#15905a",
        },
      },
      fontFamily: {
        // Loaded with next/font in src/app/layout.tsx, exposed as CSS variables.
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['var(--font-display)', 'var(--font-mono)', 'sans-serif'],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(94, 242, 166, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(94, 242, 166, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
