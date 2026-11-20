import type { MetadataRoute } from "next";
import { company } from "@data/company";
import { asset } from "@/lib/site";

export const dynamic = "force-static";

/** PWA instalable: «Añadir a pantalla de inicio» en Android abre el sitio como app. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} · Apps, webs y sistemas para mipymes`,
    short_name: company.name,
    description: company.shortDescription.es,
    lang: "es-CU",
    start_url: asset("/es/"),
    scope: asset("/"),
    display: "standalone",
    orientation: "portrait",
    background_color: "#08131d",
    theme_color: "#0f4c75",
    categories: ["business", "productivity"],
    icons: [
      { src: asset("/icons/icon-192.png"), sizes: "192x192", type: "image/png", purpose: "any" },
      { src: asset("/icons/icon-512.png"), sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: asset("/icons/icon-maskable-512.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Proyectos", url: asset("/es/proyectos/") },
      { name: "Servicios y precios", url: asset("/es/servicios/") },
      { name: "Contacto", url: asset("/es/contacto/") },
    ],
  };
}
