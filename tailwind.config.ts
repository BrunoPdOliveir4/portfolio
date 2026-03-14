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
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(16, 185, 129, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
