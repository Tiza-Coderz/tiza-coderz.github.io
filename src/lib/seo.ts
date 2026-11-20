import type { Metadata } from "next";
import { company } from "@data/company";
import { localePath, ogLocales, type Locale } from "@/i18n/config";
import { absoluteUrl } from "./site";

/** Imagen Open Graph por defecto (1200×630, en /public/og). */
export const defaultOgImage = (locale: Locale) => `/og/tiza-coderz-${locale}.png`;

type PageMetaInput = {
  locale: Locale;
  /** Ruta sin idioma: "" (inicio), "servicios", "proyectos/cajafacil"… */
  path: string;
  title?: string;
  description: string;
  image?: string;
  type?: "website" | "article";
};

/** Metadata coherente para cada página: canonical, hreflang y Open Graph. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(localePath(locale, path));
  const ogImage = absoluteUrl(image ?? defaultOgImage(locale));
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "es-CU": absoluteUrl(localePath("es", path)),
        "en-US": absoluteUrl(localePath("en", path)),
        "x-default": absoluteUrl(localePath("es", path)),
      },
    },
    openGraph: {
      type,
      url,
      siteName: company.name,
      title: title ? `${title} · ${company.name}` : undefined,
      description,
      locale: ogLocales[locale],
      images: [{ url: ogImage, width: 1200, height: 630, alt: company.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${company.name}` : undefined,
      description,
      images: [ogImage],
    },
  };
}
