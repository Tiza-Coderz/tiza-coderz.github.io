import { describe, expect, it } from "vitest";
import { services } from "@data/services";
import { getDictionary } from "@/i18n";
import { getProject } from "./projects";
import {
  jsonLdScript,
  professionalServiceJsonLd,
  projectJsonLd,
  sitemapEntries,
} from "./structured-data";

describe("professionalServiceJsonLd", () => {
  const ld = professionalServiceJsonLd("es", getDictionary("es"));

  it("describe la empresa como ProfessionalService con contacto real", () => {
    expect(ld["@type"]).toBe("ProfessionalService");
    expect(ld.name).toBe("Tiza Coderz");
    expect(ld.email).toBe("tizacoders@gmail.com");
    expect(ld.telephone).toBe("+5353475180");
    expect(ld.address.addressCountry).toBe("CU");
  });

  it("publica una oferta por servicio, sin precios (se cotiza a la medida)", () => {
    expect(ld.hasOfferCatalog.itemListElement).toHaveLength(services.length);
    expect(ld.hasOfferCatalog.itemListElement.map((o) => o.itemOffered.name)).toContain(
      "Diseño UX/UI y de marca",
    );
    expect(JSON.stringify(ld)).not.toMatch(/price/i);
  });

  it("usa URLs absolutas", () => {
    expect(ld.url).toMatch(/^https:\/\/.+\/es\/$/);
    expect(ld.logo).toMatch(/^https:\/\//);
  });
});

describe("projectJsonLd", () => {
  it("enlaza el caso con la organización", () => {
    const ld = projectJsonLd(getProject("cajafacil", "en")!, "en");
    expect(ld.url).toMatch(/\/en\/proyectos\/cajafacil\/$/);
    expect(ld.creator["@id"]).toMatch(/#organizacion$/);
    expect(ld.sameAs).toBe("https://tiza-coderz.github.io/cajafacil/");
  });
});

describe("sitemapEntries", () => {
  const entries = sitemapEntries(["a", "b"], new Date("2026-11-20"));

  it("incluye cada página en ES y EN", () => {
    // 6 páginas fijas + 2 proyectos, × 2 idiomas
    expect(entries).toHaveLength(16);
    expect(entries.map((e) => e.url)).toContain("https://tiza-coderz.github.io/en/proyectos/b/");
  });

  it("declara las alternativas de idioma", () => {
    const home = entries.find((e) => e.url.endsWith("/es/"))!;
    expect(home.alternates.languages).toEqual({
      es: "https://tiza-coderz.github.io/es/",
      en: "https://tiza-coderz.github.io/en/",
    });
    expect(home.priority).toBe(1);
  });
});

describe("jsonLdScript", () => {
  it("escapa < para no cerrar la etiqueta <script>", () => {
    expect(jsonLdScript({ a: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});
