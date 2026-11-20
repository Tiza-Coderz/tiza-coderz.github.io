import Link from "next/link";
import { IconArrowRight, IconExternal } from "@/components/ui/Icons";

/** Datos mínimos y serializables de un proyecto (sirven también al componente cliente). */
export type ProjectCardData = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  sector: string;
  sectorLabel: string;
  kindLabel: string;
  kind: "producto" | "cliente";
  cover: string;
  stack: string[];
  demoUrl?: string;
};

export type ProjectCardLabels = { viewCase: string; liveDemo: string; externalLink: string };

export function ProjectCard({
  project,
  labels,
  priority = false,
}: {
  project: ProjectCardData;
  labels: ProjectCardLabels;
  priority?: boolean;
}) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-surface shadow-sm shadow-black/[0.03] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg dark:hover:border-brand-700">
      <div className="aspect-[8/5] overflow-hidden bg-brand-900">
        {/* eslint-disable-next-line @next/next/no-img-element -- export estático: imágenes ya optimizadas en WebP */}
        <img
          src={project.cover}
          alt=""
          width={1200}
          height={750}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-wide text-fg-muted uppercase">
          <span className="text-accent">{project.sectorLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{project.kindLabel}</span>
        </p>
        <h3 className="mt-2 text-xl font-bold">
          {/* El enlace cubre toda la tarjeta (::after) sin anidar enlaces. */}
          <Link href={project.href} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 leading-relaxed text-fg-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-bg-soft px-2.5 py-0.5 text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
            {labels.viewCase}
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1 rounded-full bg-chalk-yellow/20 px-3 py-1 text-xs font-semibold text-brand-900 hover:bg-chalk-yellow/35 dark:text-chalk-yellow"
            >
              {labels.liveDemo}
              <IconExternal className="size-3.5" />
              <span className="sr-only"> {labels.externalLink}</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
