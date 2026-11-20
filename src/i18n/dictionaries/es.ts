/**
 * Diccionario base (español de Cuba, trato de «usted»).
 * `en.ts` debe tener exactamente las mismas claves: lo comprueba TypeScript.
 */
export const es = {
  meta: {
    siteName: "Tiza Coderz",
    defaultTitle: "Tiza Coderz · Apps, webs y sistemas para mipymes cubanas",
    defaultDescription:
      "Estudio de desarrollo en La Habana. Tiendas online, sistemas de gestión, apps móviles y automatización con IA para mipymes cubanas. Precios en USD y CUP.",
  },
  a11y: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mainNav: "Navegación principal",
    footerNav: "Enlaces del pie de página",
    whatsappFab: "Escríbanos por WhatsApp",
    externalLink: "(se abre en una pestaña nueva)",
  },
  nav: {
    home: "Inicio",
    services: "Servicios",
    projects: "Proyectos",
    process: "Cómo trabajamos",
    about: "Nosotros",
    contact: "Contacto",
    cta: "Hablemos",
  },
  theme: {
    toggle: "Cambiar tema",
    light: "Claro",
    dark: "Oscuro",
  },
  language: {
    label: "Idioma",
    switchTo: "English",
    switchToShort: "EN",
  },
  whatsapp: {
    defaultMessage:
      "Hola, Tiza Coderz. Vi su web y me gustaría hablar sobre un proyecto para mi negocio.",
  },
  footer: {
    tagline: "Apps, webs y sistemas a la medida para mipymes cubanas.",
    explore: "Explorar",
    contact: "Contacto",
    hours: "Horario",
    rights: "Todos los derechos reservados.",
    madeIn: "Hecho en La Habana",
  },
  notFound: {
    title: "Página no encontrada",
    description: "La página que busca no existe o cambió de dirección.",
    back: "Volver al inicio",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof es>;
