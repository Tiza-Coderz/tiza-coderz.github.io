import Link from "next/link";
import { ButtonExternal } from "@/components/ui/Button";
import { IconWhatsApp } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Layout";
import type { Dictionary, Locale } from "@/i18n";
import { href, mainNav, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";
import { DesktopNav, LangSwitch, MobileNav } from "./Navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = mainNav(locale, dict);
  const other: Locale = locale === "es" ? "en" : "es";
  const wa = whatsappLink(dict.whatsapp.defaultMessage);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href={href(locale, "home")}
          className="rounded-lg"
          aria-label={`Tiza Coderz — ${dict.nav.home}`}
        >
          <Logo />
        </Link>

        <DesktopNav items={items} label={dict.a11y.mainNav} />

        <div className="flex items-center gap-1">
          <LangSwitch
            target={other}
            label={dict.language.switchTo}
            short={dict.language.switchToShort}
          />
          <ThemeToggle label={dict.theme.toggle} />
          <ButtonExternal
            href={wa}
            variant="whatsapp"
            size="sm"
            className="ml-2 hidden sm:inline-flex"
            srHint={dict.a11y.externalLink}
          >
            <IconWhatsApp className="size-4" />
            {dict.nav.cta}
          </ButtonExternal>
          <MobileNav
            items={items}
            label={dict.a11y.mainNav}
            openLabel={dict.a11y.openMenu}
            closeLabel={dict.a11y.closeMenu}
            footer={
              <ButtonExternal href={wa} variant="whatsapp" size="lg" className="w-full">
                <IconWhatsApp className="size-5" />
                {dict.nav.cta}
              </ButtonExternal>
            }
          />
        </div>
      </Container>
    </header>
  );
}
