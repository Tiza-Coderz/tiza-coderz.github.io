export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Texto con una versión por idioma. Se usa en los archivos de `data/`. */
export type Localized<T = string> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Etiqueta BCP 47 para `<html lang>`, Open Graph e `Intl`. */
export const localeTags: Record<Locale, string> = {
  es: "es-CU",
  en: "en-US",
};

export const ogLocales: Record<Locale, string> = {
  es: "es_ES",
  en: "en_US",
};

/** Ruta interna con prefijo de idioma y barra final (trailingSlash). */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

/** Cambia el idioma de una ruta ya localizada: `/es/proyectos/x/` → `/en/proyectos/x/`. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0] ?? "")) parts.shift();
  return localePath(target, parts.join("/"));
}
