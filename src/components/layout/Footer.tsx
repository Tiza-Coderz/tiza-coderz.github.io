import Link from "next/link";
import { company } from "@data/company";
import { IconClock, IconGitHub, IconMail, IconMapPin, IconWhatsApp } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Layout";
import type { Dictionary, Locale } from "@/i18n";
import { href, mainNav, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  const linkClass = "text-fg-muted hover:text-fg transition-colors";

  return (
    <footer className="border-t border-line bg-bg-soft">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Link href={href(locale, "home")} className="inline-block rounded-lg">
            <Logo />
          </Link>
          <p className="mt-4 max-w-xs leading-relaxed text-fg-muted">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.a11y.footerNav}>
          <h2 className="text-sm font-semibold tracking-wide uppercase">{dict.footer.explore}</h2>
          <ul className="mt-4 space-y-2.5">
            {mainNav(locale, dict).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase">{dict.footer.contact}</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={whatsappLink(dict.whatsapp.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                <IconWhatsApp className="size-4 text-whatsapp" />
                {company.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                <IconMail className="size-4" />
                {company.email}
              </a>
            </li>
            <li>
              <a
                href={company.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-2`}
              >
                <IconGitHub className="size-4" />
                github.com/Tiza-Coderz
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-fg-muted">
              <IconMapPin className="size-4" />
              {company.city}, Cuba
            </li>
            <li className="flex items-start gap-2 text-fg-muted">
              <IconClock className="mt-1 size-4 shrink-0" />
              <span>
                <span className="sr-only">{dict.footer.hours}: </span>
                {company.hours[locale]}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. {dict.footer.rights}
          </p>
          <p>{dict.footer.madeIn}</p>
        </Container>
      </div>
    </footer>
  );
}
