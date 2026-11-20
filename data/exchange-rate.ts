import type { ExchangeRate } from "@/lib/currency";

/**
 * Tasa USD → CUP que se usa para mostrar el equivalente en pesos.
 *
 * ✏️  Para actualizarla: cambie `usdToCup` y `updatedAt` y haga commit.
 *     El CI valida los datos y GitHub Pages publica en ~2 minutos.
 *
 * Los precios se cobran en USD; el equivalente en CUP es orientativo.
 */
export const exchangeRate: ExchangeRate = {
  usdToCup: 440,
  updatedAt: "2026-11-20",
  source: "Tasa de referencia del mercado informal (elTOQUE)",
};
