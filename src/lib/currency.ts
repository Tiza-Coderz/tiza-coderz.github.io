import { z } from "zod";
import { localeTags, type Locale } from "@/i18n/config";

export const exchangeRateSchema = z.object({
  /** Cuántos CUP vale 1 USD. */
  usdToCup: z.number().positive().max(100_000),
  /** Fecha de la tasa en formato AAAA-MM-DD. */
  updatedAt: z.iso.date(),
  source: z.string().min(1),
});

export type ExchangeRate = z.infer<typeof exchangeRateSchema>;

/**
 * Convierte USD a CUP y redondea al múltiplo indicado (por defecto 10 CUP):
 * un precio orientativo de «66 000 CUP» se lee mejor que «65 997,60 CUP».
 */
export function usdToCup(usd: number, rate: number, roundTo = 10): number {
  if (!Number.isFinite(usd) || usd < 0) throw new RangeError(`Importe en USD no válido: ${usd}`);
  if (!Number.isFinite(rate) || rate <= 0) throw new RangeError(`Tasa no válida: ${rate}`);
  if (roundTo <= 0) throw new RangeError("roundTo debe ser mayor que 0");
  return Math.round((usd * rate) / roundTo) * roundTo;
}

/** Separador de miles según el idioma (es-CU y en-US usan coma: 66,000). */
export function formatAmount(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {
    maximumFractionDigits: 0,
    useGrouping: "always",
  }).format(value);
}

export function formatUsd(value: number, locale: Locale): string {
  return `${formatAmount(value, locale)} USD`;
}

export function formatCup(value: number, locale: Locale): string {
  return `${formatAmount(value, locale)} CUP`;
}

/** «15 de noviembre de 2026» / «November 15, 2026». La fecha se trata como día civil, sin zona horaria. */
export function formatRateDate(isoDate: string, locale: Locale): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1));
  return new Intl.DateTimeFormat(localeTags[locale], { dateStyle: "long", timeZone: "UTC" }).format(
    date,
  );
}

/** Días transcurridos desde la fecha de la tasa (para avisar si está desactualizada). */
export function rateAgeInDays(isoDate: string, now: Date = new Date()): number {
  const updated = Date.parse(`${isoDate}T00:00:00Z`);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((today - updated) / 86_400_000);
}

export type PriceRange = { fromUsd: number; toUsd?: number };

/** Precio «desde» con su equivalente en CUP, listo para pintar. */
export function describePrice(price: PriceRange, rate: ExchangeRate, locale: Locale) {
  return {
    fromUsd: formatUsd(price.fromUsd, locale),
    toUsd: price.toUsd ? formatUsd(price.toUsd, locale) : undefined,
    fromCup: formatCup(usdToCup(price.fromUsd, rate.usdToCup, 100), locale),
  };
}
