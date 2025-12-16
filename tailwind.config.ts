import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'],
        display: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        neon: {
          orange: "hsl(var(--neon-orange))",
          cyan: "hsl(var(--neon-cyan))",
          red: "hsl(var(--neon-red))",
          green: "hsl(var(--neon-green))",
          blue: "hsl(var(--neon-blue))",
          purple: "hsl(var(--neon-purple))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 20s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      boxShadow: {
        "neon-orange": "0 0 20px hsl(25 100% 55% / 0.5), 0 0 40px hsl(25 100% 55% / 0.3), 0 0 60px hsl(25 100% 55% / 0.1)",
        "neon-cyan": "0 0 20px hsl(190 100% 55% / 0.5), 0 0 40px hsl(190 100% 55% / 0.3), 0 0 60px hsl(190 100% 55% / 0.1)",
        "neon-red": "0 0 20px hsl(0 85% 55% / 0.5), 0 0 40px hsl(0 85% 55% / 0.3), 0 0 60px hsl(0 85% 55% / 0.1)",
        "neon-green": "0 0 20px hsl(140 70% 50% / 0.5), 0 0 40px hsl(140 70% 50% / 0.3), 0 0 60px hsl(140 70% 50% / 0.1)",
        "neon-blue": "0 0 20px hsl(220 100% 60% / 0.5), 0 0 40px hsl(220 100% 60% / 0.3), 0 0 60px hsl(220 100% 60% / 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
