import Link from "next/link";
import type { Service, ServiceIcon } from "@data/services";
import { ButtonExternal } from "@/components/ui/Button";
import {
  IconArrowRight,
  IconCart,
  IconChart,
  IconCheck,
  IconGlobe,
  IconPalette,
  IconPhone,
  IconQr,
  IconSparkles,
  IconWhatsApp,
  IconWrench,
} from "@/components/ui/Icons";
import type { Dictionary, Locale } from "@/i18n";
import { href, whatsappLink } from "@/lib/site";
import { fillTemplate } from "@/lib/whatsapp";

export const serviceIcons: Record<ServiceIcon, typeof IconGlobe> = {
  palette: IconPalette,
  globe: IconGlobe,
  qr: IconQr,
  cart: IconCart,
  chart: IconChart,
  phone: IconPhone,
  sparkles: IconSparkles,
  wrench: IconWrench,
};

type Props = { service: Service; locale: Locale; dict: Dictionary; detailed?: boolean };

/** Tarjeta de servicio. No muestra precios ni plazos: se cotiza a la medida. */
export function ServiceCard({ service, locale, dict, detailed = false }: Props) {
  const Icon = serviceIcons[service.icon];
  const t = dict.services;
  const quote = whatsappLink(fillTemplate(t.quoteMessage, { service: service.name[locale] }));
  const example = service.examples[0];

  return (
    <article
      id={service.id}
      className="flex reveal flex-col rounded-(--radius-card) border border-line bg-surface p-6 shadow-sm shadow-black/[0.03] transition-[border-color,box-shadow] hover:border-brand-300 hover:shadow-md dark:hover:border-brand-700"
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
        <Icon className="size-6" />
      </span>

      <h3 className="mt-5 text-xl font-bold">{service.name[locale]}</h3>
      <p className="mt-2 leading-relaxed text-fg-muted">{service.summary[locale]}</p>

      {detailed ? (
        <>
          <h4 className="mt-5 text-sm font-semibold">{t.includes}</h4>
          <ul className="mt-2 space-y-2">
            {service.includes[locale].map((item) => (
              <li key={item} className="flex gap-2 text-[0.95rem]">
                <IconCheck className="mt-1 size-4 shrink-0 text-whatsapp" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-fg-muted">
            <strong className="font-semibold text-fg">{t.idealFor}:</strong>{" "}
            {service.idealFor[locale]}
          </p>
        </>
      ) : null}

      <div className="flex-1" />
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <ButtonExternal href={quote} variant="whatsapp" size="sm" srHint={dict.a11y.externalLink}>
          <IconWhatsApp className="size-4" />
          {t.quote}
        </ButtonExternal>
        {example ? (
          <Link
            href={href(locale, "projects", example)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            {t.seeExample}
            <IconArrowRight className="size-4" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function ServicesGrid({
  services,
  locale,
  dict,
  detailed = false,
}: {
  services: Service[];
  locale: Locale;
  dict: Dictionary;
  detailed?: boolean;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          locale={locale}
          dict={dict}
          detailed={detailed}
        />
      ))}
    </div>
  );
}

/** Nota bajo los servicios: el precio se da a la medida, sin costo. */
export function QuoteNote({ dict }: { dict: Dictionary }) {
  return <p className="mt-8 text-sm text-fg-muted">{dict.services.quoteNote}</p>;
}
