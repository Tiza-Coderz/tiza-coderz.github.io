import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, fillTemplate, normalizeCubanPhone } from "./whatsapp";

describe("normalizeCubanPhone", () => {
  it("añade el prefijo 53 a un móvil cubano de 8 dígitos", () => {
    expect(normalizeCubanPhone("5347 5180")).toBe("5353475180");
  });

  it("limpia +, espacios, guiones y paréntesis", () => {
    expect(normalizeCubanPhone("+53 (5) 347-5180")).toBe("5353475180");
  });

  it("quita el 00 internacional", () => {
    expect(normalizeCubanPhone("0053 53475180")).toBe("5353475180");
  });

  it("falla con un número vacío", () => {
    expect(() => normalizeCubanPhone(" - ")).toThrow();
  });
});

describe("buildWhatsAppUrl", () => {
  it("devuelve solo el número si no hay mensaje", () => {
    expect(buildWhatsAppUrl("+53 53475180")).toBe("https://wa.me/5353475180");
    expect(buildWhatsAppUrl("53475180", "   ")).toBe("https://wa.me/5353475180");
  });

  it("codifica tildes, ñ y saltos de línea", () => {
    const url = buildWhatsAppUrl("5353475180", "Hola, ¿cuánto cuesta?\nGracias, señor");
    expect(url).toBe(
      "https://wa.me/5353475180?text=Hola%2C%20%C2%BFcu%C3%A1nto%20cuesta%3F%0AGracias%2C%20se%C3%B1or",
    );
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toBe(
      "Hola, ¿cuánto cuesta?\nGracias, señor",
    );
  });
});

describe("fillTemplate", () => {
  it("sustituye claves conocidas y deja las desconocidas", () => {
    expect(fillTemplate("Me interesa {service} ({price})", { service: "Tienda online" })).toBe(
      "Me interesa Tienda online ({price})",
    );
  });
});
