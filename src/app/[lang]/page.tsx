import type { Metadata } from "next";
import { services } from "@data/services";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq, Hero, ProcessSection, Stats, Testimonials, WhyUs } from "@/components/sections/Home";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { QuoteNote, ServicesGrid } from "@/components/sections/Services";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Layout";
import { getDictionary, resolveLocale } from "@/i18n";
import { cardLabels, toCardData } from "@/lib/project-view";
import { getFeaturedProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { href } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "", description: dict.meta.defaultDescription });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const featured = getFeaturedProjects(locale, 4);
  const featuredServices = services.filter((s) => s.featured).slice(0, 6);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Stats dict={dict} />

      <Section
        id="servicios"
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        intro={dict.services.intro}
      >
        <ServicesGrid services={featuredServices} locale={locale} dict={dict} />
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <QuoteNote dict={dict} />
          <ButtonLink href={href(locale, "services")} variant="secondary" className="shrink-0">
            {dict.services.seeAll}
            <IconArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Section>

      <Section
        id="proyectos"
        eyebrow={dict.projects.eyebrow}
        title={dict.projects.featuredTitle}
        intro={dict.projects.featuredIntro}
        tone="soft"
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <li key={project.slug} className="reveal">
              <ProjectCard project={toCardData(project, locale, dict)} labels={cardLabels(dict)} />
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href={href(locale, "projects")} variant="primary">
            {dict.projects.seeAll}
            <IconArrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Section>

      <WhyUs dict={dict} />
      <ProcessSection locale={locale} dict={dict} />
      <Testimonials locale={locale} dict={dict} />
      <Faq dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
