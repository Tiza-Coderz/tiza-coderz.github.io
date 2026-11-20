import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessTimeline } from "@/components/sections/Home";
import { IconCheck } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Layout";
import { getDictionary, resolveLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/proceso">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale).processPage;
  return pageMetadata({
    locale,
    path: "proceso",
    title: t.pageTitle,
    description: t.pageDescription,
  });
}

export default async function ProcessPage({ params }: PageProps<"/[lang]/proceso">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const t = dict.home.process;
  const c = dict.processPage.commitments;

  return (
    <>
      <Section as="h1" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <div className="mx-auto max-w-3xl">
          <ProcessTimeline locale={locale} dict={dict} detailed />
        </div>
      </Section>

      <Section tone="soft" title={c.title} align="center">
        <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item) => (
            <li
              key={item}
              className="flex reveal gap-3 rounded-2xl border border-line bg-surface p-5"
            >
              <IconCheck className="mt-0.5 size-5 shrink-0 text-whatsapp" />
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand dict={dict} />
    </>
  );
}
