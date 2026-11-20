import { describe, expect, it } from "vitest";
import { exchangeRate } from "@data/exchange-rate";
import {
  describePrice,
  exchangeRateSchema,
  formatCup,
  formatRateDate,
  formatUsd,
  rateAgeInDays,
  usdToCup,
} from "./currency";

describe("usdToCup", () => {
  it("convierte y redondea a decenas por defecto", () => {
    expect(usdToCup(150, 440)).toBe(66_000);
    expect(usdToCup(1.99, 437)).toBe(870); // 869.63 → 870
  });

  it("redondea al múltiplo pedido", () => {
    expect(usdToCup(25, 437, 100)).toBe(10_900); // 10 925 → 10 900
    expect(usdToCup(25, 438, 100)).toBe(11_000); // 10 950 → 11 000
  });

  it("acepta 0 USD", () => {
    expect(usdToCup(0, 440)).toBe(0);
  });

  it("rechaza importes, tasas o redondeos no válidos", () => {
    expect(() => usdToCup(-1, 440)).toThrow(RangeError);
    expect(() => usdToCup(Number.NaN, 440)).toThrow(RangeError);
    expect(() => usdToCup(10, 0)).toThrow(RangeError);
    expect(() => usdToCup(10, -5)).toThrow(RangeError);
    expect(() => usdToCup(10, 440, 0)).toThrow(RangeError);
  });
});

describe("formato", () => {
  it("usa el separador de miles de Cuba (es-CU) y de EE. UU. (en-US)", () => {
    expect(formatCup(66_000, "es")).toBe("66,000 CUP");
    expect(formatCup(66_000, "en")).toBe("66,000 CUP");
    expect(formatUsd(1_500, "es")).toBe("1,500 USD");
    expect(formatUsd(150, "es")).toBe("150 USD");
  });

  it("formatea la fecha de la tasa sin desfase de zona horaria", () => {
    expect(formatRateDate("2026-11-01", "es")).toBe("1 de noviembre de 2026");
    expect(formatRateDate("2026-11-01", "en")).toBe("November 1, 2026");
  });
});

describe("rateAgeInDays", () => {
  it("cuenta días civiles completos", () => {
    expect(rateAgeInDays("2026-11-20", new Date("2026-11-20T23:00:00Z"))).toBe(0);
    expect(rateAgeInDays("2026-11-13", new Date("2026-11-20T08:00:00Z"))).toBe(7);
  });
});

describe("describePrice", () => {
  it("devuelve USD y CUP redondeado a centenas", () => {
    const d = describePrice(
      { fromUsd: 150, toUsd: 300 },
      { usdToCup: 437, updatedAt: "2026-11-20", source: "x" },
      "en",
    );
    expect(d).toEqual({ fromUsd: "150 USD", toUsd: "300 USD", fromCup: "65,600 CUP" });
  });
});

describe("data/exchange-rate.ts", () => {
  it("cumple el esquema (tasa positiva y fecha AAAA-MM-DD)", () => {
    expect(() => exchangeRateSchema.parse(exchangeRate)).not.toThrow();
  });

  it("rechaza datos mal escritos", () => {
    expect(
      exchangeRateSchema.safeParse({ usdToCup: 0, updatedAt: "2026-11-20", source: "x" }).success,
    ).toBe(false);
    expect(
      exchangeRateSchema.safeParse({ usdToCup: 440, updatedAt: "20/11/2026", source: "x" }).success,
    ).toBe(false);
  });
});
