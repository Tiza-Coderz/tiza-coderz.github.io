import type { Dictionary } from "./es";

export const en: Dictionary = {
  meta: {
    siteName: "Tiza Coderz",
    defaultTitle: "Tiza Coderz · Apps, websites and systems for Cuban small businesses",
    defaultDescription:
      "Software studio in Havana. Online stores, business management systems, mobile apps and AI automation for Cuban small businesses. Prices in USD and CUP.",
  },
  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    footerNav: "Footer links",
    whatsappFab: "Message us on WhatsApp",
    externalLink: "(opens in a new tab)",
  },
  nav: {
    home: "Home",
    services: "Services",
    projects: "Projects",
    process: "How we work",
    about: "About us",
    contact: "Contact",
    cta: "Let's talk",
  },
  theme: {
    toggle: "Toggle theme",
    light: "Light",
    dark: "Dark",
  },
  language: {
    label: "Language",
    switchTo: "Español",
    switchToShort: "ES",
  },
  whatsapp: {
    defaultMessage:
      "Hi Tiza Coderz, I saw your website and I'd like to talk about a project for my business.",
  },
  home: {
    hero: {
      eyebrow: "Made in Cuba, for Cuba",
      titleStart: "Custom apps and systems that help your small business",
      titleHighlight: "sell more",
      subtitle:
        "Control your inventory and your cash register, stop losing orders and get paid in USD and CUP. Everything we build works even on a poor connection.",
      ctaWhatsapp: "Message us on WhatsApp",
      ctaProjects: "See projects",
      trust: ["Prices in USD and CUP", "Works on slow data or offline", "Weekly demos"],
      visualAlt:
        "Three apps built by Tiza Coderz on a phone: point of sale, online store and financial dashboard",
    },
    stats: [
      { value: "3+ years", label: "building digital products in production" },
      { value: "10+", label: "projects delivered to clients" },
      { value: "3 countries", label: "clients in Cuba, Venezuela and Spain" },
      { value: "4 demos", label: "public, ready for you to try today" },
    ],
    why: {
      eyebrow: "Why Tiza Coderz",
      title: "Software designed for how business works in Cuba",
      items: [
        {
          title: "Two currencies, a moving rate",
          text: "Base prices in USD, CUP equivalent at today's rate and cash closing per currency. No manual recalculation.",
        },
        {
          title: "Offline? No problem",
          text: "Apps that keep selling during blackouts or without data, and sync when the signal returns.",
        },
        {
          title: "WhatsApp at the center",
          text: "Orders, notifications and reminders arrive on WhatsApp already written, because that's where your customers are.",
        },
        {
          title: "You see progress every week",
          text: "Weekly demos on your phone, a fixed price in writing and payments by milestone.",
        },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "From the idea on the chalkboard to a working system",
      intro: "A clear 5-step process, so you always know what's being done and how much is left.",
      duration: "Duration",
      deliverable: "You get",
      seeMore: "See the full process",
    },
    testimonials: {
      eyebrow: "What our clients say",
      title: "Businesses already working with us",
    },
    faq: {
      eyebrow: "FAQ",
      title: "What people ask us before starting",
      items: [
        {
          q: "How much does an app or website cost?",
          a: "It depends on what you need, but every package has a starting price: a presence website from 150 USD, an online store from 500 USD and a management system from 900 USD. In the first conversation we give you a fixed price in writing.",
        },
        {
          q: "Can I pay in CUP?",
          a: "Yes. Prices are set in USD and, if you prefer to pay in CUP, we use the rate on the invoice date. We also accept USD cash, bank transfers and payments from abroad.",
        },
        {
          q: "Does it work during blackouts or without data?",
          a: "Our management apps are built for that: they store everything on the device and sync when the connection returns. Websites are optimized to load fast on mobile data.",
        },
        {
          q: "How long does it take?",
          a: "A presence website, 3 to 7 days. An online store, 2 to 4 weeks. A management system, 3 to 8 weeks. We show you the progress every week.",
        },
        {
          q: "What happens after launch?",
          a: "We train you and take care of hosting, backups and minor changes with the maintenance plan. The first month is included.",
        },
        {
          q: "Do I own the system?",
          a: "Yes. Once fully paid, the code and the data are yours. If you ever want to move to another team, we hand everything over.",
        },
      ],
    },
  },
  services: {
    eyebrow: "What we do",
    title: "Clear-priced packages, no surprises",
    intro:
      "You are not buying programming hours: you are buying a result for your business. Every package has a starting price and a timeline; we tailor it to your case in a free first conversation.",
    from: "From",
    upTo: "up to {price}",
    perMonth: "per month",
    approxCup: "≈ {amount}",
    timeline: "Timeline",
    includes: "Includes",
    idealFor: "Ideal for",
    quote: "Request a quote",
    seeExample: "See an example",
    seeAll: "See all services",
    quoteMessage:
      'Hi Tiza Coderz, I\'m interested in the "{service}" package. Could you send me more information for my business?',
    rateNote:
      "Prices in USD. The CUP amount is approximate: {rate} CUP per USD, rate as of {date}.",
    pageTitle: "Services and pricing",
    pageDescription:
      "Websites, catalogs and QR menus, online stores, management systems, mobile apps and AI automation for Cuban small businesses. Prices from 150 USD.",
    custom: {
      title: "Your idea doesn't fit a package?",
      text: "We also build custom projects: integrations, internal tools, moving from Excel to an app and whatever your business needs. Tell us the problem and we'll propose a solution.",
      cta: "Tell us your idea",
    },
    payments: {
      title: "Payment options",
      intro:
        "We work with a contract and an invoice. Payment is split into milestones so you see progress before paying in full.",
      methods: [
        "Cash in USD",
        "Transfer to a foreign-currency account",
        "CUP at the rate on the invoice date",
        "Payment from abroad (Zelle, TropiPay)",
      ],
      schedule: ["50% on signing", "30% on delivery of the test version", "20% on going live"],
    },
  },
  projects: {
    eyebrow: "Our work",
    title: "Projects you can try today",
    intro:
      "Complete products with public demos and Cuban sample data, plus work built for clients. Open them, click around and see how they would work for your business.",
    featuredTitle: "Featured work",
    featuredIntro:
      "Real systems, published and running. Each one solves a specific problem for a Cuban small business.",
    seeAll: "See all projects",
    filterLabel: "Filter by sector",
    all: "All",
    resultsCount: "{count} projects",
    empty: "No projects in this sector yet.",
    viewCase: "View case",
    liveDemo: "Live demo",
    pageTitle: "Projects",
    pageDescription:
      "Tiza Coderz case studies: offline point of sale, grocery-bundle online store, multi-currency financial dashboard, service orders and more. With demos to try.",
    sectors: {
      comercio: "Retail",
      ecommerce: "Online stores",
      servicios: "Services",
      finanzas: "Finance",
      creativos: "Personal brand",
      automatizacion: "Automation",
    },
    kind: {
      producto: "Product with demo",
      cliente: "Client project",
    },
    case: {
      breadcrumb: "Projects",
      client: "Client",
      year: "Year",
      platforms: "Platforms",
      sector: "Sector",
      screenshots: "Screenshots",
      stack: "Technologies",
      links: "Try it yourself",
      demo: "Open the demo",
      repo: "View the code",
      credentials: "Demo access",
      user: "User",
      password: "Password",
      privateNote:
        "This is a private client project: the code and an open demo are not published. We are happy to show it to you in a meeting.",
      fallbackNote: "This case study is not translated yet.",
      prev: "Previous",
      next: "Next",
      ctaTitle: "Want something like this for your business?",
      ctaText:
        "We adapt it to your case: your brand, your products, your rules. Message us and in the first conversation we'll give you a price and a timeline.",
      ctaMessage:
        "Hi Tiza Coderz, I saw the {project} project on your website and I'm interested in something similar for my business.",
      ctaButton: "I want something similar",
      screenshotAlt: "Screenshot of {project}",
    },
  },
  ctaBand: {
    title: "Shall we talk about your business?",
    text: "The first conversation is free and with no commitment. Tell us what is costing you time or money and we'll tell you how we would solve it, how much it would cost and how long it would take.",
    whatsapp: "Message us on WhatsApp",
    email: "Send an email",
  },
  footer: {
    tagline: "Custom apps, websites and systems for Cuban small businesses.",
    explore: "Explore",
    contact: "Contact",
    hours: "Hours",
    rights: "All rights reserved.",
    madeIn: "Made in Havana",
  },
  notFound: {
    title: "Page not found",
    description: "The page you are looking for doesn't exist or has moved.",
    back: "Back to home",
  },
};
