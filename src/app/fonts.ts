import { Caveat, Inter } from "next/font/google";

/** Fuentes autoalojadas en el build (sin peticiones a Google desde el navegador). */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/** Letra «de tiza» solo para acentos (eyebrows, eslogan). */
export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${caveat.variable}`;
