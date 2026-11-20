import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { Section } from "@/components/ui/Layout";
import { getDictionary, resolveLocale } from "@/i18n";
import { cardLabels, sectorOptions, toCardData } from "@/lib/project-view";
import { getAllProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/proyectos">): Promise<Metadata> {
  const locale = resolveLocale((await params).lang);
  const t = getDictionary(locale).projects;
  return pageMetadata({
    locale,
    path: "proyectos",
    title: t.pageTitle,
    description: t.pageDescription,
  });
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/proyectos">) {
  const locale = resolveLocale((await params).lang);
  const dict = getDictionary(locale);
  const t = dict.projects;
  const projects = getAllProjects(locale);

  return (
    <>
      <Section as="h1" eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <ProjectsExplorer
          projects={projects.map((p) => toCardData(p, locale, dict))}
          sectors={sectorOptions(projects, dict)}
          labels={{
            ...cardLabels(dict),
            filterLabel: t.filterLabel,
            all: t.all,
            resultsCount: t.resultsCount,
            empty: t.empty,
          }}
        />
      </Section>
      <CtaBand dict={dict} />
    </>
  );
}
