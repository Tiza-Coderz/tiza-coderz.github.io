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
  home: {
    hero: {
      eyebrow: "Hecho en Cuba, para Cuba",
      titleStart: "Apps y sistemas a la medida para que su mipyme",
      titleHighlight: "venda más",
      subtitle:
        "Controle su inventario y su caja, deje de perder pedidos y cobre en USD y en CUP. Todo lo que hacemos funciona aunque la conexión sea mala.",
      ctaWhatsapp: "Escríbanos por WhatsApp",
      ctaProjects: "Ver proyectos",
      trust: [
        "Precios en USD y CUP",
        "Funciona con datos lentos o sin conexión",
        "Demos cada semana",
      ],
      visualAlt:
        "Tres apps hechas por Tiza Coderz en el móvil: punto de venta, tienda online y dashboard financiero",
    },
    stats: [
      { value: "+3 años", label: "construyendo productos digitales en producción" },
      { value: "+10", label: "proyectos entregados a clientes" },
      { value: "3 países", label: "clientes en Cuba, Venezuela y España" },
      { value: "4 demos", label: "públicas que puede probar hoy" },
    ],
    why: {
      eyebrow: "Por qué Tiza Coderz",
      title: "Software pensado para cómo trabaja un negocio en Cuba",
      items: [
        {
          title: "Dos monedas, una tasa que cambia",
          text: "Precios base en USD, equivalente en CUP con la tasa del día y cierres de caja por moneda. Sin recalcular a mano.",
        },
        {
          title: "Sin conexión, sin problema",
          text: "Apps que siguen vendiendo durante el apagón o sin datos, y sincronizan cuando vuelve la señal.",
        },
        {
          title: "WhatsApp en el centro",
          text: "Pedidos, avisos y recordatorios que llegan a WhatsApp ya redactados, porque ahí están sus clientes.",
        },
        {
          title: "Usted ve el avance cada semana",
          text: "Demos semanales desde su teléfono, precio cerrado por escrito y pagos por etapas.",
        },
      ],
    },
    process: {
      eyebrow: "Cómo trabajamos",
      title: "De la idea en la pizarra al sistema funcionando",
      intro:
        "Un proceso claro en 5 pasos, para que sepa en todo momento qué se está haciendo y cuánto falta.",
      duration: "Duración",
      deliverable: "Usted recibe",
      seeMore: "Ver el proceso completo",
    },
    testimonials: {
      eyebrow: "Lo que dicen nuestros clientes",
      title: "Negocios que ya trabajan con nosotros",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo que nos preguntan antes de empezar",
      items: [
        {
          q: "¿Cuánto cuesta una app o una web?",
          a: "Depende de lo que necesite, pero cada paquete tiene un precio de partida: una web de presencia desde 150 USD, una tienda online desde 500 USD y un sistema de gestión desde 900 USD. En la primera conversación le damos un precio cerrado por escrito.",
        },
        {
          q: "¿Puedo pagar en CUP?",
          a: "Sí. Los precios se fijan en USD y, si prefiere pagar en CUP, se calcula con la tasa del día de la factura. También aceptamos efectivo en USD, transferencia y pagos desde el exterior.",
        },
        {
          q: "¿Funciona si se va la luz o no hay datos?",
          a: "Nuestras apps de gestión están hechas para eso: guardan todo en el dispositivo y sincronizan cuando vuelve la conexión. Las webs están optimizadas para cargar rápido con datos móviles.",
        },
        {
          q: "¿Cuánto tiempo tarda?",
          a: "Una web de presencia, de 3 a 7 días. Una tienda online, de 2 a 4 semanas. Un sistema de gestión, de 3 a 8 semanas. Cada semana le mostramos el avance.",
        },
        {
          q: "¿Qué pasa después de la entrega?",
          a: "Le enseñamos a usarlo y quedamos a cargo del hosting, las copias de seguridad y los cambios menores con el plan de mantenimiento. El primer mes va incluido.",
        },
        {
          q: "¿El sistema es mío?",
          a: "Sí. Al terminar de pagar, el código y los datos son suyos. Si un día quiere irse con otro equipo, se lo entregamos todo.",
        },
      ],
    },
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
  projects: {
    eyebrow: "Nuestro trabajo",
    title: "Proyectos que puede probar hoy mismo",
    intro:
      "Productos completos, con demo pública y datos de ejemplo cubanos, y trabajos hechos para clientes. Entre, toque y compruebe cómo funcionaría en su negocio.",
    featuredTitle: "Casos destacados",
    featuredIntro:
      "Sistemas reales, publicados y funcionando. Cada uno resuelve un problema concreto de una mipyme cubana.",
    seeAll: "Ver todos los proyectos",
    filterLabel: "Filtrar por sector",
    all: "Todos",
    resultsCount: "{count} proyectos",
    empty: "No hay proyectos en este sector todavía.",
    viewCase: "Ver caso",
    liveDemo: "Demo en vivo",
    pageTitle: "Proyectos",
    pageDescription:
      "Casos de estudio de Tiza Coderz: punto de venta offline, tienda online de combos, dashboard financiero multimoneda, órdenes de servicio y más. Con demos para probar.",
    sectors: {
      comercio: "Comercio",
      ecommerce: "Tiendas online",
      servicios: "Servicios",
      finanzas: "Finanzas",
      creativos: "Marca personal",
      automatizacion: "Automatización",
    },
    kind: {
      producto: "Producto con demo",
      cliente: "Proyecto para cliente",
    },
    case: {
      breadcrumb: "Proyectos",
      client: "Cliente",
      year: "Año",
      platforms: "Plataformas",
      sector: "Sector",
      screenshots: "Capturas",
      stack: "Tecnologías",
      links: "Pruébelo usted mismo",
      demo: "Abrir la demo",
      repo: "Ver el código",
      credentials: "Acceso de prueba",
      user: "Usuario",
      password: "Contraseña",
      privateNote:
        "Este proyecto es privado del cliente: no se publican el código ni una demo abierta. Con gusto se lo mostramos en una reunión.",
      fallbackNote: "Este caso todavía no está traducido.",
      prev: "Anterior",
      next: "Siguiente",
      ctaTitle: "¿Quiere algo así para su negocio?",
      ctaText:
        "Lo adaptamos a su caso: su marca, sus productos, sus reglas. Escríbanos y en la primera conversación le damos precio y plazo.",
      ctaMessage:
        "Hola, Tiza Coderz. Vi el proyecto {project} en su web y me interesa algo parecido para mi negocio.",
      ctaButton: "Quiero algo parecido",
      screenshotAlt: "Captura de {project}",
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
