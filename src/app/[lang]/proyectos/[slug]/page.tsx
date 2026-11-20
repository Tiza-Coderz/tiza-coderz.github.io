import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonExternal } from "@/components/ui/Button";
import {
  IconArrowRight,
  IconExternal,
  IconGitHub,
  IconShield,
  IconWhatsApp,
} from "@/components/ui/Icons";
import { Badge, Container } from "@/components/ui/Layout";
import { getDictionary, locales, resolveLocale } from "@/i18n";
import { renderMdx } from "@/lib/mdx";
import { getAdjacentProjects, getProject, getProjectSlugs } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { asset, href, whatsappLink } from "@/lib/site";
import { jsonLdScript, projectJsonLd } from "@/lib/structured-data";
import { fillTemplate } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getProjectSlugs().map((slug) => ({ lang, slug })));
}

type Props = PageProps<"/[lang]/proyectos/[slug]">;

async function load(params: Props["params"]) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const project = getProject(slug, locale);
  if (!project) notFound();
  return { locale, project, dict: getDictionary(locale) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, project } = await load(params);
  return pageMetadata({
    locale,
    path: `proyectos/${project.slug}`,
    title: project.title,
    description: project.summary,
    image: `/og/${project.slug}.jpg`,
    type: "article",
  });
}

const platformNames = {
  web: "Web",
  android: "Android",
  ios: "iOS",
  pwa: "PWA",
  telegram: "Telegram",
} as const;

export default async function CaseStudyPage({ params }: Props) {
  const { locale, project, dict } = await load(params);
  const t = dict.projects.case;
  const { prev, next } = getAdjacentProjects(project.slug, locale);
  const body = await renderMdx(project.body);
  const mobile = project.screenshots.filter((s) => s.device === "mobile");
  const desktop = project.screenshots.filter((s) => s.device === "desktop");
  const cta = whatsappLink(fillTemplate(t.ctaMessage, { project: project.title }));
  const extLink =
    "text-accent inline-flex items-center gap-2 font-semibold break-all hover:underline";

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(projectJsonLd(project, locale)) }}
      />
      {/* Cabecera */}
      <header className="border-b border-line bg-bg-soft">
        <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-fg-muted">
              <Link href={href(locale, "projects")} className="hover:text-fg">
                {t.breadcrumb}
              </Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{project.title}</span>
            </nav>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="brand">{dict.projects.sectors[project.sector]}</Badge>
              <Badge tone="chalk">{dict.projects.kind[project.kind]}</Badge>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-fg-muted">
              {project.summary}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div className="col-span-2">
                <dt className="text-fg-muted">{t.client}</dt>
                <dd className="font-semibold">{project.client}</dd>
              </div>
              <div>
                <dt className="text-fg-muted">{t.year}</dt>
                <dd className="font-semibold">{project.year}</dd>
              </div>
              <div>
                <dt className="text-fg-muted">{t.platforms}</dt>
                <dd className="font-semibold">
                  {project.platforms.map((p) => platformNames[p]).join(" · ")}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.demoUrl ? (
                <ButtonExternal
                  href={project.demoUrl}
                  variant="primary"
                  srHint={dict.a11y.externalLink}
                >
                  <IconExternal className="size-4" />
                  {t.demo}
                </ButtonExternal>
              ) : null}
              <ButtonExternal href={cta} variant="whatsapp" srHint={dict.a11y.externalLink}>
                <IconWhatsApp className="size-4" />
                {t.ctaButton}
              </ButtonExternal>
            </div>
          </div>

          <div className="overflow-hidden rounded-(--radius-card) border border-line shadow-xl shadow-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element -- export estático: WebP ya optimizado */}
            <img
              src={asset(project.cover)}
              alt={fillTemplate(t.screenshotAlt, { project: project.title })}
              width={1200}
              height={750}
              fetchPriority="high"
              className="w-full"
            />
          </div>
        </Container>
      </header>

      {/* Datos clave */}
      {project.highlights.length > 0 ? (
        <Container className="py-10">
          <ul className="grid gap-4 sm:grid-cols-3">
            {project.highlights.map((h) => (
              <li key={h.value} className="reveal rounded-2xl border border-line bg-surface p-5">
                <p className="text-2xl font-extrabold tracking-tight text-accent">{h.value}</p>
                <p className="mt-1 text-sm leading-snug text-fg-muted">{h.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      ) : null}

      {/* Problema → Solución → Resultado (cuerpo MDX) */}
      <Container className="pb-8">
        {project.isFallback ? (
          <p className="mx-auto mb-8 max-w-3xl rounded-xl bg-chalk-yellow/15 px-4 py-3 text-sm">
            {t.fallbackNote}
          </p>
        ) : null}
        <div className="mx-auto prose-tz max-w-3xl" lang={project.isFallback ? "es" : undefined}>
          {body}
        </div>
      </Container>

      {/* Capturas */}
      {project.screenshots.length > 0 ? (
        <section aria-labelledby="capturas" className="mt-12 bg-bg-soft py-16">
          <Container>
            <h2 id="capturas" className="text-3xl font-bold tracking-tight">
              {t.screenshots}
            </h2>
            {mobile.length > 0 ? (
              <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
                {mobile.map((s) => (
                  <li
                    key={s.src}
                    className="w-[62vw] max-w-[260px] shrink-0 snap-center lg:w-auto lg:max-w-none"
                  >
                    <figure>
                      <div className="rounded-[2rem] bg-[#0b1622] p-2 shadow-lg shadow-black/20">
                        {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
                        <img
                          src={asset(s.src)}
                          alt={s.alt}
                          width={390}
                          height={844}
                          loading="lazy"
                          decoding="async"
                          className="w-full rounded-[1.6rem]"
                        />
                      </div>
                      <figcaption className="mt-3 text-center text-sm text-fg-muted">
                        {s.alt}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : null}
            {desktop.length > 0 ? (
              <ul className="mt-10 grid gap-8 lg:grid-cols-2">
                {desktop.map((s) => (
                  <li key={s.src}>
                    <figure className="reveal">
                      <div className="overflow-hidden rounded-xl border border-line bg-[#0b1622] shadow-lg shadow-black/15">
                        <div className="flex gap-1.5 px-3 py-2" aria-hidden="true">
                          <span className="size-2.5 rounded-full bg-white/25" />
                          <span className="size-2.5 rounded-full bg-white/25" />
                          <span className="size-2.5 rounded-full bg-white/25" />
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
                        <img
                          src={asset(s.src)}
                          alt={s.alt}
                          width={1280}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="w-full"
                        />
                      </div>
                      <figcaption className="mt-3 text-sm text-fg-muted">{s.alt}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </section>
      ) : null}

      {/* Stack y enlaces */}
      <Container className="grid gap-6 py-16 lg:grid-cols-2">
        <section
          aria-labelledby="stack"
          className="rounded-(--radius-card) border border-line bg-surface p-6"
        >
          <h2 id="stack" className="text-2xl font-bold">
            {t.stack}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-bg-soft px-3.5 py-1.5 text-sm font-medium"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="enlaces"
          className="rounded-(--radius-card) border border-line bg-surface p-6"
        >
          <h2 id="enlaces" className="text-2xl font-bold">
            {t.links}
          </h2>
          {project.demoUrl || project.repoUrl ? (
            <>
              <ul className="mt-5 space-y-3">
                {project.demoUrl ? (
                  <li>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={extLink}
                    >
                      <IconExternal className="size-4 shrink-0" />
                      {project.demoUrl.replace(/^https:\/\//, "")}
                      <span className="sr-only"> {dict.a11y.externalLink}</span>
                    </a>
                  </li>
                ) : null}
                {project.repoUrl ? (
                  <li>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={extLink}
                    >
                      <IconGitHub className="size-4 shrink-0" />
                      {t.repo}
                      <span className="sr-only"> {dict.a11y.externalLink}</span>
                    </a>
                  </li>
                ) : null}
              </ul>
              {project.demoCredentials ? (
                <div className="mt-6 rounded-xl border border-chalk-yellow/40 bg-chalk-yellow/15 p-4">
                  <p className="text-sm font-semibold">{t.credentials}</p>
                  <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                    <dt className="text-fg-muted">{t.user}</dt>
                    <dd>
                      <code className="font-mono">{project.demoCredentials.user}</code>
                    </dd>
                    <dt className="text-fg-muted">{t.password}</dt>
                    <dd>
                      <code className="font-mono">{project.demoCredentials.password}</code>
                    </dd>
                  </dl>
                </div>
              ) : null}
            </>
          ) : (
            <p className="mt-5 flex gap-3 leading-relaxed text-fg-muted">
              <IconShield className="mt-1 size-5 shrink-0 text-accent" />
              {t.privateNote}
            </p>
          )}
        </section>
      </Container>

      {/* Llamada a la acción */}
      <Container className="pb-12">
        <div className="reveal rounded-[2rem] bg-chalkboard px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-balance">{t.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">{t.ctaText}</p>
          <div className="mt-8 flex justify-center">
            <ButtonExternal href={cta} variant="whatsapp" size="lg" srHint={dict.a11y.externalLink}>
              <IconWhatsApp className="size-5" />
              {t.ctaButton}
            </ButtonExternal>
          </div>
        </div>
      </Container>

      {/* Anterior / siguiente */}
      {prev && next ? (
        <Container className="pb-20">
          <nav aria-label={dict.projects.pageTitle} className="grid gap-4 sm:grid-cols-2">
            <Link
              href={href(locale, "projects", prev.slug)}
              className="rounded-2xl border border-line p-5 transition-colors hover:border-brand-300"
            >
              <span className="text-sm text-fg-muted">← {t.prev}</span>
              <span className="mt-1 block font-bold">{prev.title}</span>
            </Link>
            <Link
              href={href(locale, "projects", next.slug)}
              className="rounded-2xl border border-line p-5 text-right transition-colors hover:border-brand-300"
            >
              <span className="inline-flex items-center gap-1 text-sm text-fg-muted">
                {t.next} <IconArrowRight className="size-3.5" />
              </span>
              <span className="mt-1 block font-bold">{next.title}</span>
            </Link>
          </nav>
        </Container>
      ) : null}
    </article>
  );
}
