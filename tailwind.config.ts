import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Colores corporativos AVIS
        avis: {
          red: "#E31E24",
          'red-dark': "#C01A1F",
          'red-light': "#FF4449",
          'red-50': "#FEF2F2",
          'red-100': "#FEE2E2",
          'red-200': "#FECACA",
          'red-300': "#FCA5A5",
          'red-400': "#F87171",
          'red-500': "#E31E24",
          'red-600': "#C01A1F",
          'red-700': "#991B1B",
          'red-800': "#7F1D1D",
          'red-900': "#651B1B",
        },
        // Colores neutros que combinan bien con el rojo AVIS
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        }
      },
    },
  },
  plugins: [],
};

export default config; 