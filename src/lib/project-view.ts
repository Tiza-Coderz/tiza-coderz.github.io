import type { ProjectCardData } from "@/components/sections/ProjectCard";
import type { Dictionary, Locale } from "@/i18n";
import { asset, href } from "./site";
import { sectorCounts, type Project } from "./projects";

/** Convierte un proyecto en los datos serializables que pinta la tarjeta. */
export function toCardData(project: Project, locale: Locale, dict: Dictionary): ProjectCardData {
  return {
    slug: project.slug,
    href: href(locale, "projects", project.slug),
    title: project.title,
    summary: project.summary,
    sector: project.sector,
    sectorLabel: dict.projects.sectors[project.sector],
    kind: project.kind,
    kindLabel: dict.projects.kind[project.kind],
    cover: asset(project.cover),
    stack: project.stack,
    demoUrl: project.demoUrl,
  };
}

export function sectorOptions(projects: Project[], dict: Dictionary) {
  return sectorCounts(projects).map(({ sector, count }) => ({
    value: sector,
    label: dict.projects.sectors[sector],
    count,
  }));
}

export function cardLabels(dict: Dictionary) {
  return {
    viewCase: dict.projects.viewCase,
    liveDemo: dict.projects.liveDemo,
    externalLink: dict.a11y.externalLink,
  };
}
