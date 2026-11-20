import type { Dictionary } from "./es";

export const en: Dictionary = {
  meta: {
    siteName: "Tiza Coderz",
    defaultTitle: "Tiza Coderz · Apps, websites and systems for Cuban small businesses",
    defaultDescription:
      "Design and software studio in Havana. UX/UI and brand design, online stores, business management systems, mobile apps and AI automation for Cuban small businesses.",
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
        "We design and build your business software: control your inventory and your cash register, stop losing orders and get paid in USD and CUP. Everything works even on a poor connection.",
      ctaWhatsapp: "Message us on WhatsApp",
      ctaProjects: "See projects",
      trust: [
        "Design and development in one team",
        "Works on slow data or offline",
        "Weekly demos",
      ],
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
      title: "From the idea to a working system",
      intro: "A clear 5-step process, so you always know what's being done and how much is left.",
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
          a: "Every project is different, so we don't publish a price list. After a free first conversation we send you a proposal with a fixed price in writing, with no commitment.",
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
          a: "It depends on the scope of your project. The proposal includes a timeline in writing and, during development, we show you the progress every week.",
        },
        {
          q: "Do you also do design?",
          a: "Yes. We design app and website interfaces (UX/UI), clickable prototypes and visual identity: logo, colors, typography and social media assets. You can hire design only or the full project.",
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
    title: "Design and development tailored to your business",
    intro:
      "You are not buying programming hours: you are buying a result for your business. From designing your brand and screens to a working system. Every project is quoted to fit, in a free first conversation.",
    includes: "Includes",
    idealFor: "Ideal for",
    quote: "Request a quote",
    seeExample: "See an example",
    seeAll: "See all services",
    quoteMessage:
      'Hi Tiza Coderz, I\'m interested in the "{service}" package. Could you send me more information for my business?',
    quoteNote:
      "We don't work with fixed rates: tell us about your case and we'll send you a proposal with price and timeline in writing, free and with no commitment.",
    pageTitle: "Services",
    pageDescription:
      "UX/UI and brand design, websites, catalogs and QR menus, online stores, management systems, mobile apps and AI automation for Cuban small businesses.",
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
  processPage: {
    pageTitle: "How we work",
    pageDescription:
      "Our 5-step process: free conversation, fixed-price proposal, design, development with weekly demos, and launch with maintenance.",
    commitments: {
      title: "Our commitments",
      items: [
        "A fixed price in writing before we start.",
        "A new demo every week, on your phone.",
        "You own the code and the data.",
        "We train you and your team.",
        "WhatsApp replies during business hours.",
        "First month of maintenance included.",
      ],
    },
  },
  about: {
    pageTitle: "About us",
    pageDescription:
      "Tiza Coderz is a software studio in Havana building apps, websites and systems for Cuban small businesses. Meet the team and how we think.",
    eyebrow: "About us",
    title: "A Havana studio that understands how your business works",
    intro:
      "Tiza Coderz was born to solve the real problems of Cuban small businesses: two currencies, a rate that changes every week, blackouts, expensive data and customers who write on WhatsApp. We don't sell technology: we make your business run better.",
    mission: {
      title: "Our mission",
      text: "To give any Cuban small business the same software a large company has, at a price that makes sense for the business, built by people who know its reality.",
    },
    values: {
      title: "How we work",
      items: [
        {
          title: "Clarity",
          text: "Fixed prices, realistic timelines and progress you can see every week.",
        },
        {
          title: "Built for Cuba",
          text: "Multi-currency, offline mode, WhatsApp and pages that load on slow data.",
        },
        {
          title: "Big-team quality",
          text: "Code review, automated tests and safe deployments, like a software company.",
        },
        {
          title: "Long-term relationship",
          text: "We don't disappear after launch: we maintain, improve and grow with you.",
        },
      ],
    },
    team: {
      title: "The team",
      intro:
        "A technical core with experience shipping products to production, plus a network of design and development collaborators we bring in depending on the size of each project.",
      founderBio:
        "Computer Engineer from CUJAE (2026). Over 3 years building digital products in production: Flutter mobile apps, web systems with React and Next.js, APIs with NestJS and FastAPI, and AI integration in real products. Has worked in remote teams for clients in Cuba, Venezuela and Spain.",
      skills: [
        "Flutter",
        "React / Next.js",
        "Node.js / NestJS",
        "FastAPI",
        "PostgreSQL / Supabase",
        "Applied AI",
      ],
      cv: "View résumé (PDF)",
      github: "GitHub",
      collaborators: "Collaborators",
      collaboratorsText:
        "Graphic design, UX and extra development when the project needs it, always under the same technical lead and the same quality standard.",
    },
  },
  contact: {
    pageTitle: "Contact",
    pageDescription:
      "Talk to Tiza Coderz on WhatsApp or by email. The first conversation is free: tell us your idea and we'll give you a price and a timeline.",
    eyebrow: "Contact",
    title: "Tell us your idea",
    intro:
      "The first conversation is free and with no commitment. WhatsApp is the fastest way; or fill in the form and we'll reply within 24 business hours.",
    channels: {
      whatsapp: "WhatsApp",
      whatsappHint: "The fastest way",
      email: "Email",
      emailHint: "For proposals and documents",
      location: "Location",
      locationHint: "In-person meetings in Havana",
      hours: "Hours",
    },
    form: {
      title: "Write to us",
      name: "Your name",
      contact: "Phone or email",
      contactHint: "So we can reply. E.g.: +53 5xxxxxxx or name@email.com",
      business: "Business name (optional)",
      projectType: "What do you need?",
      projectTypes: {
        diseno: "Design (logo, brand, screens)",
        presencia: "A website for my business",
        "catalogo-menu-qr": "Catalog or QR menu",
        "tienda-online": "Online store",
        "sistema-de-gestion": "Management system (POS, inventory…)",
        "app-movil": "Mobile app",
        "automatizacion-ia": "AI automation",
        otro: "Something else / not sure",
      },
      message: "Tell us what you need",
      messagePlaceholder:
        "E.g.: I have a café in Vedado and I want customers to see the menu with prices in USD and CUP…",
      honeypot: "Leave this field empty",
      submit: "Send message",
      sending: "Sending…",
      sendWhatsapp: "Send via WhatsApp",
      sendEmail: "Open in my email",
      success: "Message sent! We'll reply within 24 business hours.",
      errorNetwork:
        "It couldn't be sent: you seem to be offline. Try again or send it via WhatsApp.",
      errorServer:
        "The form service didn't respond. Please send us the message via WhatsApp or email.",
      noFormspree:
        "Choose how to send it: WhatsApp or your email will open with the message already written.",
      errors: {
        nameRequired: "Please enter your name.",
        contactRequired: "Please give us a phone number or email to reply.",
        contactInvalid: "Please check the phone number or email.",
        messageShort: "Tell us a bit more (at least 10 characters).",
      },
      messageLabels: {
        greeting: "Hi Tiza Coderz, I'm writing from your website.",
        name: "Name",
        contact: "Contact",
        business: "Business",
        projectType: "I need",
      },
      emailSubject: "Inquiry from the website",
    },
  },
  ctaBand: {
    title: "Shall we talk about your business?",
    text: "The first conversation is free and with no commitment. Tell us what is costing you time or money and we'll tell you how we would solve it, how much it would cost and how long it would take.",
    whatsapp: "Message us on WhatsApp",
    email: "Send an email",
  },
  footer: {
    tagline: "Custom design, apps, websites and systems for Cuban small businesses.",
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
