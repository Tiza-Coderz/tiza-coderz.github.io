import type { Metadata } from "next";
import { company } from "@data/company";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonExternal } from "@/components/ui/Button";
import { IconExternal, IconGitHub, IconUsers } from "@/components/ui/Icons";
import { Card, Section } from "@/components/ui/Layout";
import { getDictionary, resolveLocale } from "@/i18n";
import { pageMetadata } from "@/lib/seo";
import { asset } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/nosotros">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale).about;
  return pageMetadata({
    locale,
    path: "nosotros",
    title: t.pageTitle,
    description: t.pageDescription,
  });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/nosotros">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const t = dict.about;
  const initials = company.founder.shortName
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <>
      <Section as="h1" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="reveal rounded-(--radius-card) bg-chalkboard p-8 text-white">
            <h2 className="text-2xl font-bold">{t.nameStory.title}</h2>
            <p className="mt-3 leading-relaxed text-white/85">{t.nameStory.text}</p>
            <p className="mt-5 font-chalk text-2xl text-chalk-yellow">{t.nameStory.spelling}</p>
          </div>
          <Card className="reveal">
            <h2 className="text-2xl font-bold">{t.mission.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-fg-muted">{t.mission.text}</p>
          </Card>
        </div>
      </Section>

      <Section tone="soft" title={t.values.title}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.values.items.map((v, i) => (
            <li
              key={v.title}
              className="reveal rounded-(--radius-card) border border-line bg-surface p-6"
            >
              <span className="font-chalk text-4xl text-chalk-yellow-strong">{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-fg-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.team.title} intro={t.team.intro}>
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card className="reveal sm:flex sm:gap-6 sm:p-8">
            <div
              aria-hidden="true"
              className="grid size-24 shrink-0 place-items-center rounded-3xl bg-chalkboard font-chalk text-4xl text-white"
            >
              {initials}
            </div>
            <div className="mt-5 sm:mt-0">
              <h3 className="text-xl font-bold">{company.founder.name}</h3>
              <p className="font-semibold text-accent">{company.founder.role[locale]}</p>
              <p className="mt-3 leading-relaxed text-fg-muted">{t.team.founderBio}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {t.team.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-line bg-bg-soft px-2.5 py-0.5 text-xs"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonExternal
                  href={asset(company.founder.cvUrl)}
                  variant="primary"
                  size="sm"
                  srHint={dict.a11y.externalLink}
                >
                  <IconExternal className="size-4" />
                  {t.team.cv}
                </ButtonExternal>
                <ButtonExternal
                  href={company.founder.github}
                  variant="secondary"
                  size="sm"
                  srHint={dict.a11y.externalLink}
                >
                  <IconGitHub className="size-4" />
                  {t.team.github}
                </ButtonExternal>
              </div>
            </div>
          </Card>
          <Card className="reveal">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              <IconUsers className="size-6" />
            </span>
            <h3 className="mt-4 text-xl font-bold">{t.team.collaborators}</h3>
            <p className="mt-2 leading-relaxed text-fg-muted">{t.team.collaboratorsText}</p>
          </Card>
        </div>
      </Section>

      <CtaBand locale={locale} dict={dict} />
    </>
  );
}
