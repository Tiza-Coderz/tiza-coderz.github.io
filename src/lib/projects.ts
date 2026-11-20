import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Proyectos del portafolio: un archivo MDX por proyecto e idioma.
 *
 *   content/projects/cajafacil.mdx      ← español (obligatorio)
 *   content/projects/cajafacil.en.mdx   ← inglés (si falta, se usa el español)
 *
 * El frontmatter se valida con Zod en el build: un campo mal escrito rompe el
 * CI en vez de publicar una página a medias.
 */
export const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export const sectors = [
  "comercio",
  "ecommerce",
  "servicios",
  "finanzas",
  "creativos",
  "automatizacion",
] as const;
export type Sector = (typeof sectors)[number];

export const platforms = ["web", "android", "ios", "pwa", "telegram"] as const;

const localImage = z
  .string()
  .regex(/^\/images\/projects\/[a-z0-9-]+\/[a-z0-9-]+\.(webp|png|jpg|svg)$/, {
    message: "Las imágenes van en /images/projects/<slug>/<nombre>.webp",
  });

export const projectFrontmatterSchema = z.object({
  title: z.string().min(2),
  /** Negocio para el que se hizo (real o de demostración). */
  client: z.string().min(2),
  /** `producto` = demo propia lista para adaptar; `cliente` = trabajo por encargo. */
  kind: z.enum(["producto", "cliente"]),
  sector: z.enum(sectors),
  summary: z.string().min(10).max(180),
  problem: z.string().min(10),
  solution: z.string().min(10),
  result: z.string().min(10),
  stack: z.array(z.string().min(1)).min(1),
  platforms: z.array(z.enum(platforms)).min(1),
  year: z.number().int().min(2020).max(2100),
  demoUrl: z.url().optional(),
  repoUrl: z.url().optional(),
  demoCredentials: z.object({ user: z.string(), password: z.string() }).optional(),
  cover: localImage,
  screenshots: z
    .array(
      z.object({
        src: localImage,
        alt: z.string().min(3),
        device: z.enum(["mobile", "desktop"]),
      }),
    )
    .default([]),
  /** Datos verificables (nada de métricas inventadas). */
  highlights: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
  featured: z.boolean().default(false),
  /** Orden en el grid: menor = primero. */
  order: z.number().int().default(100),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export type Project = ProjectFrontmatter & {
  slug: string;
  locale: Locale;
  /** true si se pidió inglés y no existe traducción: se muestra el español. */
  isFallback: boolean;
  body: string;
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fileFor(slug: string, locale: Locale): string {
  return path.join(
    PROJECTS_DIR,
    locale === defaultLocale ? `${slug}.mdx` : `${slug}.${locale}.mdx`,
  );
}

/** Valida y normaliza un archivo MDX. Exportada para testear errores de contenido. */
export function parseProjectSource(
  source: string,
  slug: string,
  locale: Locale,
  isFallback = false,
): Project {
  let data: unknown;
  let content: string;
  try {
    // Con opciones explícitas gray-matter no usa su caché interna, que
    // devolvería datos vacíos tras un primer error de YAML.
    ({ data, content } = matter(source, {}));
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`YAML no válido en content/projects/${slug} (${locale}): ${reason}`);
  }
  const parsed = projectFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Frontmatter no válido en content/projects/${slug} (${locale}):\n${issues}`);
  }
  return { ...parsed.data, slug, locale, isFallback, body: content.trim() };
}

/** Slugs a partir de los archivos en español (`<slug>.mdx`). */
export function getProjectSlugs(dir = PROJECTS_DIR): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") && f.split(".").length === 2)
    .map((f) => f.replace(/\.mdx$/, ""))
    .filter((slug) => {
      if (!SLUG_RE.test(slug))
        throw new Error(`Slug no válido: "${slug}" (use minúsculas y guiones)`);
      return true;
    })
    .sort();
}

const cache = new Map<string, Project>();

export function getProject(slug: string, locale: Locale): Project | undefined {
  const key = `${locale}:${slug}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const candidates: [string, boolean][] = [[fileFor(slug, locale), false]];
  if (locale !== defaultLocale) candidates.push([fileFor(slug, defaultLocale), true]);

  for (const [file, isFallback] of candidates) {
    let source: string;
    try {
      source = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    const project = parseProjectSource(source, slug, locale, isFallback);
    cache.set(key, project);
    return project;
  }
  return undefined;
}

/** Destacados primero, luego por `order`, luego productos antes que encargos, luego por título. */
export function sortProjects<T extends Pick<Project, "featured" | "order" | "title" | "kind">>(
  projects: T[],
): T[] {
  return [...projects].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      a.order - b.order ||
      (a.kind === b.kind ? 0 : a.kind === "producto" ? -1 : 1) ||
      a.title.localeCompare(b.title, "es"),
  );
}

export function filterBySector<T extends Pick<Project, "sector">>(
  projects: T[],
  sector?: string | null,
): T[] {
  if (!sector || sector === "todos") return projects;
  return projects.filter((p) => p.sector === sector);
}

/** Sectores que tienen al menos un proyecto, en el orden de `sectors`, con su cantidad. */
export function sectorCounts<T extends Pick<Project, "sector">>(projects: T[]) {
  return sectors
    .map((sector) => ({ sector, count: projects.filter((p) => p.sector === sector).length }))
    .filter((s) => s.count > 0);
}

export function getAllProjects(locale: Locale): Project[] {
  return sortProjects(
    getProjectSlugs()
      .map((slug) => getProject(slug, locale))
      .filter((p): p is Project => p !== undefined),
  );
}

export function getFeaturedProjects(locale: Locale, limit = 3): Project[] {
  return getAllProjects(locale)
    .filter((p) => p.featured)
    .slice(0, limit);
}

/** Proyecto anterior y siguiente para la navegación del caso de estudio. */
export function getAdjacentProjects(slug: string, locale: Locale) {
  const all = getAllProjects(locale);
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: all[(i - 1 + all.length) % all.length],
    next: all[(i + 1) % all.length],
  };
}

export const allLocales = locales;
