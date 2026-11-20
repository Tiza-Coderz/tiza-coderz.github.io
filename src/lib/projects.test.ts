import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { services } from "@data/services";
import {
  filterBySector,
  getAdjacentProjects,
  getAllProjects,
  getProject,
  getProjectSlugs,
  parseProjectSource,
  PROJECTS_DIR,
  sectorCounts,
  sortProjects,
} from "./projects";

const valid = `---
title: Demo
client: Negocio de prueba
kind: producto
sector: comercio
summary: Un resumen suficientemente largo.
problem: Un problema real.
solution: Una solución clara.
result: Un resultado medible.
stack: [Next.js]
platforms: [web]
year: 2026
cover: /images/projects/demo/cover.webp
---

Cuerpo del caso.
`;

describe("parseProjectSource", () => {
  it("aplica valores por defecto y separa el cuerpo", () => {
    const p = parseProjectSource(valid, "demo", "es");
    expect(p.featured).toBe(false);
    expect(p.order).toBe(100);
    expect(p.screenshots).toEqual([]);
    expect(p.body).toBe("Cuerpo del caso.");
  });

  it("explica qué campo falla", () => {
    const broken = valid
      .replace("sector: comercio", "sector: restaurantes")
      .replace("year: 2026", "");
    expect(() => parseProjectSource(broken, "demo", "es")).toThrow(/sector[\s\S]*year/);
  });

  it("da un error claro si el YAML está mal escrito", () => {
    const bad = valid.replace(
      "summary: Un resumen suficientemente largo.",
      "summary: texto: con dos puntos",
    );
    expect(() => parseProjectSource(bad, "demo", "es")).toThrow(/YAML no válido.*demo/);
  });

  it("rechaza imágenes fuera de /images/projects", () => {
    const bad = valid.replace("/images/projects/demo/cover.webp", "https://otro.sitio/cover.jpg");
    expect(() => parseProjectSource(bad, "demo", "es")).toThrow(/cover/);
  });
});

describe("ordenar y filtrar", () => {
  const items = [
    {
      title: "C",
      featured: false,
      order: 1,
      kind: "cliente" as const,
      sector: "ecommerce" as const,
    },
    {
      title: "B",
      featured: true,
      order: 2,
      kind: "producto" as const,
      sector: "comercio" as const,
    },
    {
      title: "A",
      featured: true,
      order: 2,
      kind: "producto" as const,
      sector: "ecommerce" as const,
    },
    {
      title: "D",
      featured: false,
      order: 1,
      kind: "producto" as const,
      sector: "finanzas" as const,
    },
  ];

  it("destacados primero, luego orden, luego productos, luego título", () => {
    expect(sortProjects(items).map((p) => p.title)).toEqual(["A", "B", "D", "C"]);
  });

  it("filtra por sector y 'todos' devuelve todo", () => {
    expect(filterBySector(items, "ecommerce").map((p) => p.title)).toEqual(["C", "A"]);
    expect(filterBySector(items, "todos")).toHaveLength(4);
    expect(filterBySector(items, null)).toHaveLength(4);
  });

  it("cuenta solo sectores con proyectos, en orden fijo", () => {
    expect(sectorCounts(items)).toEqual([
      { sector: "comercio", count: 1 },
      { sector: "ecommerce", count: 2 },
      { sector: "finanzas", count: 1 },
    ]);
  });
});

describe("contenido real (content/projects)", () => {
  const slugs = getProjectSlugs();

  it("incluye los productos publicados de Tiza Coderz", () => {
    expect(slugs).toEqual(
      expect.arrayContaining(["cajafacil", "comboya", "negocioclaro", "tallertrack"]),
    );
  });

  it.each(slugs)("%s: es válido y tiene traducción al inglés", (slug) => {
    const es = getProject(slug, "es");
    const en = getProject(slug, "en");
    expect(es?.isFallback).toBe(false);
    expect(en?.isFallback).toBe(false);
    expect(existsSync(path.join(PROJECTS_DIR, `${slug}.en.mdx`))).toBe(true);
    // Los datos técnicos no se traducen: deben coincidir entre idiomas.
    for (const key of [
      "kind",
      "sector",
      "stack",
      "platforms",
      "demoUrl",
      "repoUrl",
      "cover",
      "featured",
      "order",
    ] as const) {
      expect(en?.[key], `${slug}.${key}`).toEqual(es?.[key]);
    }
    expect(en?.screenshots.map((s) => s.src)).toEqual(es?.screenshots.map((s) => s.src));
  });

  it.each(slugs)("%s: el cuerpo tiene Problema, Solución y Resultado", (slug) => {
    expect(getProject(slug, "es")?.body).toMatch(
      /## El problema[\s\S]*## La solución[\s\S]*## El resultado/,
    );
    expect(getProject(slug, "en")?.body).toMatch(
      /## The problem[\s\S]*## The solution[\s\S]*## The result/,
    );
  });

  it("los ejemplos de data/services.ts apuntan a proyectos existentes", () => {
    const missing = services.flatMap((s) => s.examples).filter((slug) => !slugs.includes(slug));
    expect(missing).toEqual([]);
  });

  it("solo los proyectos con demo pública muestran credenciales", () => {
    for (const p of getAllProjects("es")) {
      if (p.demoCredentials) expect(p.demoUrl, p.slug).toBeDefined();
    }
  });

  it("navegación circular entre casos", () => {
    const all = getAllProjects("es");
    const first = all[0]!;
    const { prev, next } = getAdjacentProjects(first.slug, "es");
    expect(prev?.slug).toBe(all.at(-1)?.slug);
    expect(next?.slug).toBe(all[1]?.slug);
    expect(getAdjacentProjects("no-existe", "es")).toEqual({ prev: undefined, next: undefined });
  });

  it("devuelve undefined para un slug inexistente", () => {
    expect(getProject("no-existe", "es")).toBeUndefined();
  });
});
