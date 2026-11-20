import type { Localized } from "@/i18n/config";

/**
 * Testimonios de clientes. La sección se oculta mientras este array esté vacío.
 *
 * ✏️  Use solo testimonios REALES y con permiso del cliente: una opinión
 *     inventada que un cliente descubre hace más daño que no tener ninguna.
 *     Pida 2–3 frases por WhatsApp al entregar cada proyecto.
 *
 * Plantilla:
 *
 *   {
 *     name: "Nombre Apellido",
 *     role: { es: "Dueño", en: "Owner" },
 *     business: "Nombre del negocio",
 *     place: "Vedado, La Habana",
 *     quote: {
 *       es: "Lo que dijo el cliente, con sus palabras.",
 *       en: "The same quote, translated.",
 *     },
 *     project: "cajafacil", // opcional: slug de content/projects
 *   },
 */
export type Testimonial = {
  name: string;
  role: Localized;
  business: string;
  place: string;
  quote: Localized;
  project?: string;
};

export const testimonials: Testimonial[] = [];
