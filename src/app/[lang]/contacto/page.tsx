import type { Metadata } from "next";
import { company } from "@data/company";
import { ContactForm } from "@/components/sections/ContactForm";
import { IconClock, IconMail, IconMapPin, IconWhatsApp } from "@/components/ui/Icons";
import { Card, Section } from "@/components/ui/Layout";
import { getDictionary, resolveLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contacto">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale).contact;
  return pageMetadata({
    locale,
    path: "contacto",
    title: t.pageTitle,
    description: t.pageDescription,
  });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contacto">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const t = dict.contact;

  const channels = [
    {
      icon: IconWhatsApp,
      label: t.channels.whatsapp,
      value: company.whatsapp,
      hint: t.channels.whatsappHint,
      href: whatsappLink(dict.whatsapp.defaultMessage),
      external: true,
      tone: "bg-whatsapp text-white",
    },
    {
      icon: IconMail,
      label: t.channels.email,
      value: company.email,
      hint: t.channels.emailHint,
      href: `mailto:${company.email}`,
      external: false,
      tone: "bg-brand-700 text-white",
    },
    {
      icon: IconMapPin,
      label: t.channels.location,
      value: `${company.city}, Cuba`,
      hint: t.channels.locationHint,
      tone: "bg-chalk-yellow text-brand-950",
    },
    {
      icon: IconClock,
      label: t.channels.hours,
      value: company.hours[locale],
      tone: "bg-bg-soft text-fg",
    },
  ];

  return (
    <Section as="h1" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <ul className="space-y-4">
          {channels.map((c) => {
            const content = (
              <>
                <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${c.tone}`}>
                  <c.icon className="size-6" />
                </span>
                <span>
                  <span className="block text-sm text-fg-muted">{c.label}</span>
                  <span className="block font-semibold [overflow-wrap:anywhere]">{c.value}</span>
                  {c.hint ? <span className="block text-sm text-fg-muted">{c.hint}</span> : null}
                </span>
              </>
            );
            return (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand-300"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <Card className="sm:p-8">
          <h2 className="mb-6 text-2xl font-bold">{t.form.title}</h2>
          <ContactForm t={t.form} email={company.email} whatsapp={company.whatsapp} />
        </Card>
      </div>
    </Section>
  );
}
