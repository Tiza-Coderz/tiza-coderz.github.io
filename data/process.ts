import type { Localized } from "@/i18n/config";

/** Las 5 etapas de trabajo con un cliente. */
export type ProcessStep = {
  n: number;
  icon: "chat" | "pencil" | "sparkles" | "code" | "rocket";
  title: Localized;
  description: Localized;
  duration: Localized;
  deliverable: Localized;
};

export const processSteps: ProcessStep[] = [
  {
    n: 1,
    icon: "chat",
    title: { es: "Conversación", en: "Conversation" },
    description: {
      es: "Nos cuenta cómo funciona su negocio y qué le quita tiempo o dinero. Por WhatsApp, llamada o en persona en La Habana. Sin costo y sin compromiso.",
      en: "You tell us how your business works and what costs you time or money. Over WhatsApp, a call or in person in Havana. Free and with no commitment.",
    },
    duration: { es: "30 minutos", en: "30 minutes" },
    deliverable: {
      es: "Diagnóstico del problema",
      en: "Problem diagnosis",
    },
  },
  {
    n: 2,
    icon: "pencil",
    title: { es: "Propuesta", en: "Proposal" },
    description: {
      es: "Le enviamos por escrito qué vamos a hacer, qué no, cuánto cuesta en USD (y su equivalente en CUP), en cuánto tiempo y cómo se paga.",
      en: "We send you in writing what we'll build, what we won't, the price in USD (and its CUP equivalent), the timeline and the payment schedule.",
    },
    duration: { es: "2 a 3 días", en: "2 to 3 days" },
    deliverable: { es: "Propuesta y contrato", en: "Proposal and contract" },
  },
  {
    n: 3,
    icon: "sparkles",
    title: { es: "Diseño", en: "Design" },
    description: {
      es: "Dibujamos las pantallas principales con su marca y sus datos reales. Usted las revisa y las ajustamos antes de escribir una línea de código.",
      en: "We sketch the main screens with your brand and real data. You review them and we adjust them before writing a single line of code.",
    },
    duration: { es: "3 a 7 días", en: "3 to 7 days" },
    deliverable: { es: "Prototipo navegable", en: "Clickable prototype" },
  },
  {
    n: 4,
    icon: "code",
    title: { es: "Desarrollo con demos semanales", en: "Development with weekly demos" },
    description: {
      es: "Cada semana le enviamos un enlace para que pruebe lo nuevo desde su teléfono. Si algo no le convence, se corrige a tiempo, no al final.",
      en: "Every week we send you a link to try the new features on your phone. If something isn't right, it gets fixed early, not at the end.",
    },
    duration: { es: "Según el paquete", en: "Depends on the package" },
    deliverable: { es: "Demo semanal en línea", en: "Weekly online demo" },
  },
  {
    n: 5,
    icon: "rocket",
    title: { es: "Entrega y mantenimiento", en: "Launch and maintenance" },
    description: {
      es: "Lo publicamos, le enseñamos a usarlo a usted y a su equipo, y quedamos a cargo del hosting, las copias de seguridad y los cambios. El primer mes de mantenimiento va incluido.",
      en: "We launch it, train you and your team, and take care of hosting, backups and changes. The first month of maintenance is included.",
    },
    duration: { es: "Continuo", en: "Ongoing" },
    deliverable: { es: "Sistema en producción + manual", en: "Live system + user guide" },
  },
];
