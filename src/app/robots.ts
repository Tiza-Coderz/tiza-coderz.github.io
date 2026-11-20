import type { MetadataRoute } from "next";
import { absoluteUrl, isPreviewDeployment } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Las vistas previas de Vercel (una por PR) no deben aparecer en Google.
  if (isPreviewDeployment()) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
