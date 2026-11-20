import type { Localized } from "@/i18n/config";

/**
 * Datos de la empresa. Es la única fuente de verdad para contacto, redes y
 * datos estructurados (JSON-LD). Cambie aquí y se actualiza todo el sitio.
 */
export const company = {
  name: "Tiza Coderz",
  shortDescription: {
    es: "Estudio de diseño y desarrollo en La Habana. Hacemos diseño, apps, webs y sistemas a la medida para mipymes cubanas.",
    en: "Design and software studio in Havana. We create custom design, apps, websites and business systems for Cuban small businesses.",
  } satisfies Localized,
  whatsapp: "+53 53475180",
  email: "tizacoders@gmail.com",
  github: "https://github.com/Tiza-Coderz",
  city: "La Habana",
  country: "CU",
  foundingYear: 2023,
  founder: {
    name: "Yanni Alejandro Fernández Quintana",
    shortName: "Yanni Fernández",
    role: { es: "Fundador y director técnico", en: "Founder & CTO" } satisfies Localized,
    github: "https://github.com/yanniAlejandro",
    cvUrl: "/cv.pdf",
  },
  /** Horario de atención por WhatsApp. */
  hours: {
    es: "Lunes a sábado, 9:00 a 19:00 (hora de Cuba)",
    en: "Monday to Saturday, 9:00 to 19:00 (Cuba time)",
  } satisfies Localized,
  areaServed: ["La Habana", "Cuba", "Remote"],
} as const;

export type Company = typeof company;
