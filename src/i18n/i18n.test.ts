import { describe, expect, it } from "vitest";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { isLocale, localePath, switchLocalePath } from "./index";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return [prefix];
  return Object.entries(value).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k));
}

function emptyStrings(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return value.trim() ? [] : [prefix];
  if (Array.isArray(value)) return value.flatMap((v, i) => emptyStrings(v, `${prefix}[${i}]`));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) =>
      emptyStrings(v, prefix ? `${prefix}.${k}` : k),
    );
  return [];
}

describe("diccionarios", () => {
  it("ES y EN tienen exactamente las mismas claves", () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(es).sort());
  });

  it("no hay textos vacíos", () => {
    expect(emptyStrings(es)).toEqual([]);
    expect(emptyStrings(en)).toEqual([]);
  });
});

describe("rutas localizadas", () => {
  it("reconoce solo los idiomas soportados", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("genera rutas con barra final", () => {
    expect(localePath("es")).toBe("/es/");
    expect(localePath("en", "/proyectos/")).toBe("/en/proyectos/");
    expect(localePath("es", "proyectos/cajafacil")).toBe("/es/proyectos/cajafacil/");
  });

  it("cambia el idioma conservando la ruta", () => {
    expect(switchLocalePath("/es/proyectos/comboya/", "en")).toBe("/en/proyectos/comboya/");
    expect(switchLocalePath("/en/", "es")).toBe("/es/");
    expect(switchLocalePath("/", "en")).toBe("/en/");
  });
});
