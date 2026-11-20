import { company } from "@data/company";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { localePath, type Locale } from "@/i18n/config";
import { buildWhatsAppUrl } from "./whatsapp";

/** URL pública sin barra final. En CI y producción llega por variable de entorno. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiza-coderz.github.io"
).replace(/\/+$/, "");

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Ruta de un recurso de /public teniendo en cuenta el basePath (p. ej. para <img> y PDFs). */
export function asset(path: string): string {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

/** URL absoluta (canonical, Open Graph, sitemap, JSON-LD). */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Rutas del sitio. Los slugs son iguales en ambos idiomas para compartir enlaces. */
export const routes = {
  home: "",
  services: "servicios",
  projects: "proyectos",
  process: "proceso",
  about: "nosotros",
  contact: "contacto",
} as const;

export type RouteKey = keyof typeof routes;

export function href(locale: Locale, route: RouteKey, sub?: string): string {
  return localePath(locale, sub ? `${routes[route]}/${sub}` : routes[route]);
}

export function mainNav(locale: Locale, dict: Dictionary) {
  return [
    { href: href(locale, "services"), label: dict.nav.services },
    { href: href(locale, "projects"), label: dict.nav.projects },
    { href: href(locale, "process"), label: dict.nav.process },
    { href: href(locale, "about"), label: dict.nav.about },
    { href: href(locale, "contact"), label: dict.nav.contact },
  ];
}

export function whatsappLink(message?: string): string {
  return buildWhatsAppUrl(company.whatsapp, message);
}
