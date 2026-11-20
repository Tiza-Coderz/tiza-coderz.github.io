import type { Localized } from "@/i18n/config";

/**
 * Equipo que aparece en «Nosotros». Para añadir a alguien, copie un bloque.
 * El CV va en /public (p. ej. /cv-nombre-apellido.pdf) y debe pesar poco:
 * mucha gente lo abre con datos móviles.
 */
export type TeamMember = {
  id: string;
  name: string;
  role: Localized;
  bio: Localized;
  skills: Localized<string[]>;
  /** Ruta del CV en /public. */
  cvUrl?: string;
  github?: string;
};

export const team: TeamMember[] = [
  {
    id: "yanni-fernandez",
    name: "Yanni Alejandro Fernández Quintana",
    role: { es: "Fundador y director técnico", en: "Founder & CTO" },
    bio: {
      es: "Ingeniero Informático graduado de la CUJAE (2026). Más de 3 años construyendo productos digitales en producción: apps móviles con Flutter, sistemas web con React y Next.js, APIs con NestJS y FastAPI, e integración de inteligencia artificial en productos reales. Ha trabajado en equipos remotos para clientes de Cuba, Venezuela y España.",
      en: "Computer Engineer from CUJAE (2026). Over 3 years building digital products in production: Flutter mobile apps, web systems with React and Next.js, APIs with NestJS and FastAPI, and AI integration in real products. Has worked in remote teams for clients in Cuba, Venezuela and Spain.",
    },
    skills: {
      es: [
        "Flutter",
        "React / Next.js",
        "Node.js / NestJS",
        "FastAPI",
        "PostgreSQL / Supabase",
        "IA aplicada",
      ],
      en: [
        "Flutter",
        "React / Next.js",
        "Node.js / NestJS",
        "FastAPI",
        "PostgreSQL / Supabase",
        "Applied AI",
      ],
    },
    cvUrl: "/cv.pdf",
    github: "https://github.com/yanniAlejandro",
  },
  {
    id: "kamila-aiguesvives",
    name: "Kamila Aiguesvives",
    role: { es: "Diseñadora gráfica y de marca", en: "Graphic & brand designer" },
    bio: {
      es: "Diseñadora gráfica y artista visual formada en la Academia Nacional de Bellas Artes San Alejandro, con estudios de Arquitectura en la CUJAE y diplomado en Diseño Gráfico. Desde 2020 crea identidades visuales, diseño editorial y web, contenido para redes, productos y animaciones 3D para agencias y clientes de Cuba y España.",
      en: "Graphic designer and visual artist trained at the San Alejandro National Academy of Fine Arts, with Architecture studies at CUJAE and a diploma in Graphic Design. Since 2020 she has created visual identities, editorial and web design, social media content, 3D products and animations for agencies and clients in Cuba and Spain.",
    },
    skills: {
      es: [
        "Branding e identidad visual",
        "Diseño editorial",
        "Diseño web y UI",
        "Modelado y animación 3D",
        "Edición de video",
        "Figma · Adobe · Blender",
      ],
      en: [
        "Branding & visual identity",
        "Editorial design",
        "Web & UI design",
        "3D modeling & animation",
        "Video editing",
        "Figma · Adobe · Blender",
      ],
    },
    cvUrl: "/cv-kamila-aiguesvives.pdf",
  },
];
