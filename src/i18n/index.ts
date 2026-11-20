import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import { en } from "./dictionaries/en";
import { es, type Dictionary } from "./dictionaries/es";

export * from "./config";
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Valida el segmento `[lang]` de la URL. Con `output: 'export'` solo se generan
 * `es` y `en`, pero en `next dev` cualquier valor llega aquí.
 */
export function resolveLocale(lang: string): Locale {
  if (!isLocale(lang)) notFound();
  return lang;
}
