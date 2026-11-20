import { company } from "@data/company";
import { services } from "@data/services";
import { localePath, locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { Project } from "./projects";
import { routes } from "./site";
import { absoluteUrl } from "./site";
import { normalizeCubanPhone } from "./whatsapp";

/** JSON-LD de la empresa (schema.org/ProfessionalService) para buscadores. */
export function professionalServiceJsonLd(locale: Locale, dict: Dictionary) {
  const url = absoluteUrl(localePath(locale));
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${absoluteUrl("/")}#organizacion`,
    name: company.name,
    alternateName: "Tiza Coders",
    slogan: company.slogan[locale],
    description: dict.meta.defaultDescription,
    url,
    logo: absoluteUrl("/icons/icon-512.png"),
    image: absoluteUrl(`/og/tiza-coderz-${locale}.png`),
    email: company.email,
    telephone: `+${normalizeCubanPhone(company.whatsapp)}`,
    foundingDate: String(company.foundingYear),
    founder: {
      "@type": "Person",
      name: company.founder.name,
      jobTitle: company.founder.role[locale],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: company.city,
      addressCountry: company.country,
    },
    areaServed: company.areaServed.map((name) => ({ "@type": "Place", name })),
    availableLanguage: ["es", "en"],
    currenciesAccepted: "USD, CUP",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    sameAs: [company.github],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.services.pageTitle,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name[locale], description: s.summary[locale] },
      })),
    },
  };
}

/** JSON-LD de un caso de estudio. */
export function projectJsonLd(project: Project, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    abstract: project.summary,
    inLanguage: locale,
    dateCreated: String(project.year),
    url: absoluteUrl(localePath(locale, `${routes.projects}/${project.slug}`)),
    image: absoluteUrl(project.cover),
    keywords: project.stack.join(", "),
    creator: { "@id": `${absoluteUrl("/")}#organizacion` },
    ...(project.demoUrl ? { sameAs: project.demoUrl } : {}),
  };
}

/** Todas las URLs públicas del sitio, en ambos idiomas, con sus alternativas. */
export function sitemapEntries(projectSlugs: string[], lastModified: Date) {
  const paths = [
    { path: "", priority: 1 },
    { path: routes.services, priority: 0.9 },
    { path: routes.projects, priority: 0.9 },
    ...projectSlugs.map((slug) => ({ path: `${routes.projects}/${slug}`, priority: 0.8 })),
    { path: routes.process, priority: 0.6 },
    { path: routes.about, priority: 0.6 },
    { path: routes.contact, priority: 0.7 },
  ];
  return paths.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: locale === "es" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, absoluteUrl(localePath(l, path))])),
      },
    })),
  );
}

/** Serializa JSON-LD de forma segura para <script> (evita cerrar la etiqueta). */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
