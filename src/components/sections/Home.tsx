import { processSteps, type ProcessStep } from "@data/process";
import { testimonials } from "@data/testimonials";
import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import {
  IconArrowRight,
  IconChat,
  IconCheck,
  IconCode,
  IconCurrency,
  IconPencil,
  IconRocket,
  IconSparkles,
  IconUsers,
  IconWhatsApp,
  IconWifiOff,
} from "@/components/ui/Icons";
import { Container, Section } from "@/components/ui/Layout";
import type { Dictionary, Locale } from "@/i18n";
import { asset, href, whatsappLink } from "@/lib/site";

/* ───────────────────────── Hero ───────────────────────── */

const heroPhones = [
  "/images/projects/cajafacil/pos.webp",
  "/images/projects/comboya/movil-inicio.webp",
  "/images/projects/negocioclaro/dashboard-movil.webp",
];

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.hero;
  return (
    <section className="relative overflow-hidden bg-brand-panel text-white">
      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="animate-fade-up">
          <p className="text-sm font-semibold tracking-wider text-brand-200 uppercase">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t.titleStart}{" "}
            <span className="whitespace-nowrap text-brand-200">{t.titleHighlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/80">
            {t.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonExternal
              href={whatsappLink(dict.whatsapp.defaultMessage)}
              variant="whatsapp"
              size="lg"
              srHint={dict.a11y.externalLink}
            >
              <IconWhatsApp className="size-5" />
              {t.ctaWhatsapp}
            </ButtonExternal>
            <ButtonLink
              href={href(locale, "projects")}
              variant="ghost"
              size="lg"
              className="border border-white/30 text-white hover:bg-white/10"
            >
              {t.ctaProjects}
              <IconArrowRight className="size-5" />
            </ButtonLink>
          </div>
          <ul className="mt-8 flex flex-col gap-2 text-sm text-white/85 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {t.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <IconCheck className="size-4 text-brand-200" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tres productos reales en marcos de móvil. */}
        <div
          role="img"
          aria-label={t.visualAlt}
          className="relative mx-auto h-[420px] w-full max-w-[460px] sm:h-[520px]"
        >
          {heroPhones.map((src, i) => (
            <div
              key={src}
              className={`absolute top-0 w-[44%] rounded-[1.8rem] bg-[#0b1622] p-1.5 shadow-2xl ring-1 shadow-black/40 ring-white/10 ${
                ["left-0 mt-16 -rotate-6", "left-[28%] z-10 mt-4", "right-0 mt-24 rotate-6"][i]
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- export estático */}
              <img
                src={asset(src)}
                alt=""
                width={390}
                height={844}
                fetchPriority={i === 1 ? "high" : "auto"}
                className="w-full rounded-[1.5rem]"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── Cifras ───────────────────────── */

export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <div className="border-b border-line bg-surface">
      <Container>
        <dl className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
          {dict.home.stats.map((s) => (
            <div key={s.label} className="reveal px-2 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-sm text-fg-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}

/* ───────────────────────── Por qué ───────────────────────── */

const whyIcons = [IconCurrency, IconWifiOff, IconWhatsApp, IconUsers];

export function WhyUs({ dict }: { dict: Dictionary }) {
  const t = dict.home.why;
  return (
    <Section id="por-que" eyebrow={t.eyebrow} title={t.title}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((item, i) => {
          const Icon = whyIcons[i] ?? IconCheck;
          return (
            <li
              key={item.title}
              className="reveal rounded-(--radius-card) border border-line bg-surface p-6"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-highlight/20 text-brand-800 dark:text-highlight">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-fg-muted">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ───────────────────────── Proceso ───────────────────────── */

const stepIcons: Record<ProcessStep["icon"], typeof IconChat> = {
  chat: IconChat,
  pencil: IconPencil,
  sparkles: IconSparkles,
  code: IconCode,
  rocket: IconRocket,
};

export function ProcessTimeline({
  locale,
  dict,
  detailed = false,
}: {
  locale: Locale;
  dict: Dictionary;
  detailed?: boolean;
}) {
  const t = dict.home.process;
  return (
    <ol className={`grid gap-5 ${detailed ? "" : "md:grid-cols-5"}`}>
      {processSteps.map((step) => {
        const Icon = stepIcons[step.icon];
        return (
          <li
            key={step.n}
            className={`relative reveal rounded-(--radius-card) border border-line bg-surface p-6 ${
              detailed ? "sm:flex sm:gap-6" : ""
            }`}
          >
            <div className="flex items-center gap-3 sm:shrink-0 sm:self-start">
              <span className="w-7 text-3xl leading-none font-extrabold text-accent">{step.n}</span>
              <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                <Icon className="size-5" />
              </span>
            </div>
            <div className={detailed ? "mt-4 sm:mt-0" : "mt-4"}>
              <h3 className="text-lg font-bold">{step.title[locale]}</h3>
              <p className={`mt-2 leading-relaxed text-fg-muted ${detailed ? "" : "text-sm"}`}>
                {step.description[locale]}
              </p>
              {detailed ? (
                <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div>
                    <dt className="text-fg-muted">{t.deliverable}</dt>
                    <dd className="font-semibold">{step.deliverable[locale]}</dd>
                  </div>
                </dl>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ProcessSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.process;
  return (
    <Section id="proceso" eyebrow={t.eyebrow} title={t.title} intro={t.intro} tone="soft">
      <ProcessTimeline locale={locale} dict={dict} />
      <div className="mt-8">
        <ButtonLink href={href(locale, "process")} variant="secondary">
          {t.seeMore}
          <IconArrowRight className="size-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}

/* ───────────────────────── Testimonios ───────────────────────── */

/** No se muestra nada mientras `data/testimonials.ts` esté vacío. */
export function Testimonials({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  if (testimonials.length === 0) return null;
  const t = dict.home.testimonials;
  return (
    <Section id="testimonios" eyebrow={t.eyebrow} title={t.title} tone="soft">
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <li key={item.name} className="reveal">
            <figure className="h-full rounded-(--radius-card) border border-line bg-surface p-6">
              <blockquote className="leading-relaxed">
                <p>«{item.quote[locale]}»</p>
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="block font-semibold">{item.name}</span>
                <span className="text-fg-muted">
                  {item.role[locale]} · {item.business} · {item.place}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ───────────────────────── Preguntas frecuentes ───────────────────────── */

/** Acordeón nativo con <details>: accesible y sin JavaScript. */
export function Faq({ dict }: { dict: Dictionary }) {
  const t = dict.home.faq;
  return (
    <Section id="preguntas" eyebrow={t.eyebrow} title={t.title}>
      <div className="divide-y divide-line rounded-(--radius-card) border border-line bg-surface">
        {t.items.map((item) => (
          <details
            key={item.q}
            className="group px-6 py-1 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold">
              {item.q}
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full text-2xl leading-none text-accent transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-5 leading-relaxed text-fg-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
