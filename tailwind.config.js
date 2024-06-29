import { nextui } from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Definir colores personalizados si es necesario
        dark: {
          background: '#070a0f', // Fondo oscuro personalizado
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}