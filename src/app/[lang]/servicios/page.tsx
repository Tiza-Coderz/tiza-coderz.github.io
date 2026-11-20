import type { Metadata } from "next";
import { services } from "@data/services";
import { CtaBand } from "@/components/sections/CtaBand";
import { QuoteNote, ServicesGrid } from "@/components/sections/Services";
import { ButtonExternal } from "@/components/ui/Button";
import { IconCheck, IconWhatsApp } from "@/components/ui/Icons";
import { Card, Section } from "@/components/ui/Layout";
import { getDictionary, resolveLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/servicios">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale).services;
  return pageMetadata({
    locale,
    path: "servicios",
    title: t.pageTitle,
    description: t.pageDescription,
  });
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/servicios">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const t = dict.services;

  return (
    <>
      <Section as="h1" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <ServicesGrid services={services} locale={locale} dict={dict} detailed />
        <QuoteNote dict={dict} />
      </Section>

      <Section tone="soft">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="reveal">
            <h2 className="text-2xl font-bold">{t.payments.title}</h2>
            <p className="mt-3 leading-relaxed text-fg-muted">{t.payments.intro}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <ul className="space-y-2">
                {t.payments.methods.map((m) => (
                  <li key={m} className="flex gap-2">
                    <IconCheck className="mt-1 size-4 shrink-0 text-whatsapp" />
                    {m}
                  </li>
                ))}
              </ul>
              <ol className="space-y-3">
                {t.payments.schedule.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-chalk-yellow text-sm font-bold text-brand-950">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Card>
          <Card className="flex reveal flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">{t.custom.title}</h2>
              <p className="mt-3 leading-relaxed text-fg-muted">{t.custom.text}</p>
            </div>
            <div className="mt-6">
              <ButtonExternal
                href={whatsappLink(dict.whatsapp.defaultMessage)}
                variant="primary"
                srHint={dict.a11y.externalLink}
              >
                <IconWhatsApp className="size-5" />
                {t.custom.cta}
              </ButtonExternal>
            </div>
          </Card>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
