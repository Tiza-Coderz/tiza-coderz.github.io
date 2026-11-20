import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/projects";
import { sitemapEntries } from "@/lib/structured-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries(getProjectSlugs(), new Date());
}
