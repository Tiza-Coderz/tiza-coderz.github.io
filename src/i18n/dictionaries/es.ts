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
  services: {
    eyebrow: "Lo que hacemos",
    title: "Paquetes con precio claro, sin sorpresas",
    intro:
      "Usted no compra horas de programación: compra un resultado para su negocio. Cada paquete tiene un precio de partida y un plazo; lo ajustamos a su caso en la primera conversación, sin costo.",
    from: "Desde",
    upTo: "hasta {price}",
    perMonth: "al mes",
    approxCup: "≈ {amount}",
    timeline: "Plazo",
    includes: "Incluye",
    idealFor: "Ideal para",
    quote: "Pedir presupuesto",
    seeExample: "Ver un ejemplo",
    seeAll: "Ver todos los servicios",
    quoteMessage:
      "Hola, Tiza Coderz. Me interesa el paquete «{service}». ¿Me pueden dar más información para mi negocio?",
    rateNote:
      "Precios en USD. El equivalente en CUP es orientativo: {rate} CUP por USD, tasa del {date}.",
    pageTitle: "Servicios y precios",
    pageDescription:
      "Webs, catálogos y menús QR, tiendas online, sistemas de gestión, apps móviles y automatización con IA para mipymes cubanas. Precios desde 150 USD.",
    custom: {
      title: "¿Su idea no encaja en ningún paquete?",
      text: "También hacemos proyectos a la medida: integraciones, sistemas internos, migraciones de Excel a una app y lo que su negocio necesite. Cuéntenos el problema y le proponemos una solución.",
      cta: "Cuéntenos su idea",
    },
    payments: {
      title: "Formas de pago",
      intro:
        "Trabajamos con contrato y factura. El pago se divide en etapas para que usted vea avances antes de pagar el total.",
      methods: [
        "Efectivo en USD",
        "Transferencia a cuenta en divisas",
        "CUP a la tasa del día de la factura",
        "Pago desde el exterior (Zelle, TropiPay)",
      ],
      schedule: [
        "50 % al firmar",
        "30 % al entregar la versión de prueba",
        "20 % al pasar a producción",
      ],
    },
  },
  ctaBand: {
    title: "¿Hablamos de su negocio?",
    text: "La primera conversación es gratis y sin compromiso. Cuéntenos qué le quita tiempo o dinero y le decimos cómo lo resolveríamos, cuánto costaría y en cuánto tiempo.",
    whatsapp: "Escribir por WhatsApp",
    email: "Enviar un correo",
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
