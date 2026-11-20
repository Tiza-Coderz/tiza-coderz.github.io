import type { Metadata, Viewport } from "next";
import { company } from "@data/company";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ThemeScript } from "@/components/layout/ThemeToggle";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { getDictionary, localeTags, locales, ogLocales, resolveLocale } from "@/i18n";
import { absoluteUrl, basePath, siteUrl } from "@/lib/site";
import { jsonLdScript, professionalServiceJsonLd } from "@/lib/structured-data";
import { fontVariables } from "../fonts";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08131d" },
  ],
  colorScheme: "light dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: dict.meta.defaultTitle, template: `%s · ${company.name}` },
    description: dict.meta.defaultDescription,
    applicationName: company.name,
    authors: [{ name: company.name, url: absoluteUrl("/") }],
    creator: company.name,
    alternates: {
      canonical: absoluteUrl(`/${locale}/`),
      languages: {
        "es-CU": absoluteUrl("/es/"),
        "en-US": absoluteUrl("/en/"),
        "x-default": absoluteUrl("/es/"),
      },
    },
    openGraph: {
      type: "website",
      siteName: company.name,
      locale: ogLocales[locale],
      alternateLocale: ogLocales[locale === "es" ? "en" : "es"],
    },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${fontVariables} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript(professionalServiceJsonLd(locale, dict)),
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only z-[60] rounded-full bg-brand-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.a11y.skipToContent}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <WhatsAppFab message={dict.whatsapp.defaultMessage} label={dict.a11y.whatsappFab} />
        {/* PWA: registra el service worker solo en producción (no en localhost). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if("serviceWorker"in navigator&&!/^(localhost|127\.)/.test(location.hostname)){addEventListener("load",function(){navigator.serviceWorker.register("${basePath}/sw.js",{scope:"${basePath}/"})})}`,
          }}
        />
      </body>
    </html>
  );
}
