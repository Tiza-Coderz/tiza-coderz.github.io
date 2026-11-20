import type { Localized } from "@/i18n/config";

/**
 * Paquetes de servicios. Los precios son «desde» en USD; el equivalente en CUP
 * se calcula con `data/exchange-rate.ts`. Para cambiar un precio, edítelo aquí.
 */
export type ServiceIcon = "globe" | "qr" | "cart" | "chart" | "phone" | "sparkles" | "wrench";

export type Service = {
  id: string;
  icon: ServiceIcon;
  name: Localized;
  /** Una frase con el resultado para el negocio, no la tecnología. */
  summary: Localized;
  includes: Localized<string[]>;
  idealFor: Localized;
  priceFromUsd: number;
  priceToUsd?: number;
  /** `monthly` = cuota mensual (mantenimiento). */
  billing: "one-time" | "monthly";
  timeline: Localized;
  /** Slugs de `content/projects` que sirven de ejemplo. */
  examples: string[];
  featured: boolean;
};

export const services: Service[] = [
  {
    id: "presencia",
    icon: "globe",
    name: { es: "Presencia", en: "Online presence" },
    summary: {
      es: "Que su negocio aparezca en Google y que el cliente le escriba por WhatsApp con un toque.",
      en: "Get your business found on Google and let customers message you on WhatsApp in one tap.",
    },
    includes: {
      es: [
        "Página web de una sola página, rápida en datos móviles",
        "Botón de WhatsApp, ubicación en el mapa y horario",
        "Galería de fotos y servicios",
        "Dominio y hosting el primer año",
      ],
      en: [
        "One-page website, fast on mobile data",
        "WhatsApp button, map location and opening hours",
        "Photo gallery and services",
        "Domain and hosting for the first year",
      ],
    },
    idealFor: {
      es: "Negocios que hoy solo existen en Instagram o por recomendación.",
      en: "Businesses that today only exist on Instagram or by word of mouth.",
    },
    priceFromUsd: 150,
    priceToUsd: 300,
    billing: "one-time",
    timeline: { es: "3 a 7 días", en: "3 to 7 days" },
    examples: [],
    featured: false,
  },
  {
    id: "catalogo-menu-qr",
    icon: "qr",
    name: { es: "Catálogo / Menú QR", en: "Catalog / QR menu" },
    summary: {
      es: "Cuando suban los precios, usted los cambia en 10 segundos desde el teléfono, sin reimprimir nada.",
      en: "When prices go up, you update them from your phone in 10 seconds, with no reprinting.",
    },
    includes: {
      es: [
        "Catálogo o menú editable por usted",
        "Precios en USD y CUP según la tasa del día",
        "Pedidos que llegan a su WhatsApp ya redactados",
        "Códigos QR listos para imprimir",
      ],
      en: [
        "Catalog or menu you can edit yourself",
        "Prices in USD and CUP at today's rate",
        "Orders arrive on your WhatsApp already written up",
        "Print-ready QR codes",
      ],
    },
    idealFor: {
      es: "Restaurantes, cafeterías, dulcerías y tiendas con catálogo cambiante.",
      en: "Restaurants, cafés, bakeries and shops with a changing catalog.",
    },
    priceFromUsd: 250,
    priceToUsd: 600,
    billing: "one-time",
    timeline: { es: "1 a 2 semanas", en: "1 to 2 weeks" },
    examples: [],
    featured: true,
  },
  {
    id: "tienda-online",
    icon: "cart",
    name: { es: "Tienda online", en: "Online store" },
    summary: {
      es: "Venda también a los cubanos de afuera: catálogo, carrito, envíos por municipio y pedidos ordenados.",
      en: "Sell to Cubans abroad too: catalog, cart, delivery by municipality and organized orders.",
    },
    includes: {
      es: [
        "Catálogo con búsqueda y filtros",
        "Carrito y checkout con costo de envío por municipio",
        "Seguimiento del pedido para el cliente",
        "Panel de pedidos, productos y reportes",
      ],
      en: [
        "Catalog with search and filters",
        "Cart and checkout with delivery cost by municipality",
        "Order tracking for your customers",
        "Admin panel for orders, products and reports",
      ],
    },
    idealFor: {
      es: "Tiendas de combos, mercados online y negocios que venden por WhatsApp.",
      en: "Grocery-bundle shops, online markets and businesses selling via WhatsApp.",
    },
    priceFromUsd: 500,
    priceToUsd: 1200,
    billing: "one-time",
    timeline: { es: "2 a 4 semanas", en: "2 to 4 weeks" },
    examples: ["comboya"],
    featured: true,
  },
  {
    id: "sistema-de-gestion",
    icon: "chart",
    name: { es: "Sistema de gestión", en: "Management system" },
    summary: {
      es: "Caja cuadrada, inventario bajo control y la ganancia real del mes, en USD y en CUP.",
      en: "Balanced cash drawer, inventory under control and your real monthly profit, in USD and CUP.",
    },
    includes: {
      es: [
        "Punto de venta, inventario y cierre de caja",
        "Multimoneda con tasa editable e historial",
        "Usuarios con roles y permisos",
        "Reportes e informes para el contador",
      ],
      en: [
        "Point of sale, inventory and cash closing",
        "Multi-currency with editable rate and history",
        "Users with roles and permissions",
        "Reports for you and your accountant",
      ],
    },
    idealFor: {
      es: "Mini-mercados, ferreterías, talleres y distribuidoras.",
      en: "Mini-markets, hardware stores, repair shops and distributors.",
    },
    priceFromUsd: 900,
    priceToUsd: 3000,
    billing: "one-time",
    timeline: { es: "3 a 8 semanas", en: "3 to 8 weeks" },
    examples: ["cajafacil", "tallertrack", "negocioclaro"],
    featured: true,
  },
  {
    id: "app-movil",
    icon: "phone",
    name: { es: "App móvil a la medida", en: "Custom mobile app" },
    summary: {
      es: "Su propia app Android (APK o Apklis) que funciona aunque se vaya la conexión.",
      en: "Your own Android app (APK or Apklis) that keeps working when the connection drops.",
    },
    includes: {
      es: [
        "App Android con Flutter (iOS opcional)",
        "Funciona sin internet y sincroniza al volver la señal",
        "Panel web y backend",
        "Publicación en Apklis o descarga directa",
      ],
      en: [
        "Android app built with Flutter (iOS optional)",
        "Works offline and syncs when the signal returns",
        "Web admin panel and backend",
        "Published on Apklis or as a direct download",
      ],
    },
    idealFor: {
      es: "Mensajerías, negocios con trabajadores en la calle y productos propios.",
      en: "Delivery services, businesses with field staff and digital products.",
    },
    priceFromUsd: 1500,
    priceToUsd: 5000,
    billing: "one-time",
    timeline: { es: "1 a 3 meses", en: "1 to 3 months" },
    examples: ["cajafacil", "bys"],
    featured: true,
  },
  {
    id: "automatizacion-ia",
    icon: "sparkles",
    name: { es: "Automatización con IA", en: "AI automation" },
    summary: {
      es: "Deje de responder lo mismo cien veces al día: bots y flujos que trabajan por usted.",
      en: "Stop answering the same question a hundred times a day: bots and workflows that work for you.",
    },
    includes: {
      es: [
        "Bot de Telegram o WhatsApp para pedidos y preguntas",
        "Respuestas con IA entrenadas con la información de su negocio",
        "Integraciones con hojas de cálculo, correo y redes",
        "Panel para revisar conversaciones",
      ],
      en: [
        "Telegram or WhatsApp bot for orders and questions",
        "AI answers trained on your business information",
        "Integrations with spreadsheets, email and social media",
        "Dashboard to review conversations",
      ],
    },
    idealFor: {
      es: "Negocios con muchos mensajes repetidos o tareas manuales diarias.",
      en: "Businesses with lots of repeated messages or daily manual tasks.",
    },
    priceFromUsd: 300,
    priceToUsd: 1500,
    billing: "one-time",
    timeline: { es: "1 a 3 semanas", en: "1 to 3 weeks" },
    examples: ["reelbridge"],
    featured: true,
  },
  {
    id: "mantenimiento",
    icon: "wrench",
    name: { es: "Mantenimiento", en: "Maintenance" },
    summary: {
      es: "Su sistema siempre en línea, con copias de seguridad y alguien que responde cuando hace falta.",
      en: "Your system always online, backed up, and someone who answers when you need it.",
    },
    includes: {
      es: [
        "Hosting y dominio",
        "Copias de seguridad",
        "Cambios menores cada mes",
        "Soporte por WhatsApp",
      ],
      en: ["Hosting and domain", "Backups", "Minor changes every month", "WhatsApp support"],
    },
    idealFor: {
      es: "Todos nuestros clientes. El primer mes va incluido.",
      en: "All our clients. The first month is included.",
    },
    priceFromUsd: 25,
    priceToUsd: 150,
    billing: "monthly",
    timeline: { es: "Mensual", en: "Monthly" },
    examples: [],
    featured: false,
  },
];
