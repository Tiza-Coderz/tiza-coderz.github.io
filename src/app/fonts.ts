import { Inter } from "next/font/google";

/** Fuente autoalojada en el build (sin peticiones a Google desde el navegador). */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const fontVariables = inter.variable;
