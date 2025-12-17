/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // These pull from your CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "oklch(var(--primary))",
        "primary-foreground": "oklch(var(--primary-foreground))",
        accent: "oklch(var(--accent))",
        "accent-foreground": "oklch(var(--accent-foreground))",
        muted: "oklch(var(--muted))",
        "muted-foreground": "oklch(var(--muted-foreground))",
        border: "oklch(var(--border))",
      },
    },
  },
  plugins: [],
};
