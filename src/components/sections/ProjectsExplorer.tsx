"use client";

import { useEffect, useState } from "react";
import { ProjectCard, type ProjectCardData, type ProjectCardLabels } from "./ProjectCard";

type SectorOption = { value: string; label: string; count: number };

/**
 * Grid filtrable por sector. Todo el HTML llega renderizado del build (sin JS se
 * ven todos los proyectos); el filtro solo oculta tarjetas y guarda el sector en
 * la URL (`?sector=ecommerce`) para poder compartir el enlace.
 */
export function ProjectsExplorer({
  projects,
  sectors,
  labels,
}: {
  projects: ProjectCardData[];
  sectors: SectorOption[];
  labels: ProjectCardLabels & {
    filterLabel: string;
    all: string;
    resultsCount: string;
    empty: string;
  };
}) {
  const [sector, setSector] = useState("todos");

  // Lee el sector inicial de la URL (no se puede en el render: el HTML es estático).
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("sector");
    if (fromUrl && sectors.some((s) => s.value === fromUrl)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con la URL una sola vez al montar
      setSector(fromUrl);
    }
  }, [sectors]);

  function choose(value: string) {
    setSector(value);
    const url = new URL(window.location.href);
    if (value === "todos") url.searchParams.delete("sector");
    else url.searchParams.set("sector", value);
    window.history.replaceState(null, "", url);
  }

  const visible = sector === "todos" ? projects : projects.filter((p) => p.sector === sector);
  const options: SectorOption[] = [
    { value: "todos", label: labels.all, count: projects.length },
    ...sectors,
  ];

  return (
    <div>
      <div
        role="group"
        aria-label={labels.filterLabel}
        className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {options.map((o) => {
          const active = o.value === sector;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => choose(o.value)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "border-brand-700 bg-brand-700 text-white dark:border-brand-500 dark:bg-brand-500"
                  : "border-line bg-surface text-fg-muted hover:border-brand-300 hover:text-fg"
              }`}
            >
              {o.label}
              <span
                className={`rounded-full px-1.5 text-xs ${active ? "bg-white/20" : "bg-bg-soft"}`}
                aria-hidden="true"
              >
                {o.count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {labels.resultsCount.replace("{count}", String(visible.length))}
      </p>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-fg-muted">{labels.empty}</p>
      ) : (
        <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <li key={project.slug} className="flex">
              <div className="h-full w-full">
                <ProjectCard project={project} labels={labels} priority={i < 3} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
