import type { Metadata } from "next";
import { team, type TeamMember } from "@data/team";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonExternal } from "@/components/ui/Button";
import { IconExternal, IconGitHub, IconUsers } from "@/components/ui/Icons";
import { Card, Section } from "@/components/ui/Layout";
import { getDictionary, resolveLocale, type Dictionary, type Locale } from "@/i18n";
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

  return (
    <>
      <Section as="h1" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <div className="reveal rounded-(--radius-card) bg-brand-panel p-8 text-white sm:p-10">
          <h2 className="text-2xl font-bold">{t.mission.title}</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-white/85">{t.mission.text}</p>
        </div>
      </Section>

      <Section tone="soft" title={t.values.title}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.values.items.map((v, i) => (
            <li
              key={v.title}
              className="reveal rounded-(--radius-card) border border-line bg-surface p-6"
            >
              <span className="text-3xl font-extrabold text-accent">{i + 1}</span>
              <h3 className="mt-2 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-fg-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.team.title} intro={t.team.intro}>
        <ul className="grid auto-rows-fr gap-6 lg:grid-cols-2">
          {team.map((member) => (
            <li key={member.id} className="reveal">
              <TeamCard member={member} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
        <Card className="mt-6 reveal sm:flex sm:items-center sm:gap-5">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
            <IconUsers className="size-6" />
          </span>
          <div className="mt-4 sm:mt-0">
            <h3 className="text-xl font-bold">{t.team.collaborators}</h3>
            <p className="mt-1 leading-relaxed text-fg-muted">{t.team.collaboratorsText}</p>
          </div>
        </Card>
      </Section>

      <CtaBand dict={dict} />
    </>
  );
}

function initialsOf(name: string): string {
  const words = name.split(" ").filter(Boolean);
  return `${words[0]?.[0] ?? ""}${words.length > 2 ? (words[2]?.[0] ?? "") : (words[1]?.[0] ?? "")}`;
}

/** Tarjeta de una persona del equipo, con enlace a su CV. */
function TeamCard({
  member,
  locale,
  dict,
}: {
  member: TeamMember;
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.about.team;
  return (
    <Card className="flex h-full flex-col sm:p-8">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-panel text-2xl font-bold text-white"
        >
          {initialsOf(member.name)}
        </div>
        <div>
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="font-semibold text-accent">{member.role[locale]}</p>
        </div>
      </div>
      <p className="mt-4 leading-relaxed text-fg-muted">{member.bio[locale]}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {member.skills[locale].map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-line bg-bg-soft px-2.5 py-0.5 text-xs"
          >
            {skill}
          </li>
        ))}
      </ul>
      <div className="flex-1" />
      <div className="mt-6 flex flex-wrap gap-3">
        {member.cvUrl ? (
          <ButtonExternal
            href={asset(member.cvUrl)}
            variant="primary"
            size="sm"
            srHint={dict.a11y.externalLink}
            aria-label={`${t.cv}: ${member.name}`}
          >
            <IconExternal className="size-4" />
            {t.cv}
          </ButtonExternal>
        ) : null}
        {member.github ? (
          <ButtonExternal
            href={member.github}
            variant="secondary"
            size="sm"
            srHint={dict.a11y.externalLink}
          >
            <IconGitHub className="size-4" />
            {t.github}
          </ButtonExternal>
        ) : null}
      </div>
    </Card>
  );
}
