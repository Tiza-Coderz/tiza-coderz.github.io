"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IconClose, IconMenu } from "@/components/ui/Icons";
import { switchLocalePath, type Locale } from "@/i18n/config";

export type NavItem = { href: string; label: string };

function isActive(pathname: string, href: string) {
  // La portada (/es/) solo está activa en sí misma; el resto, también en sus subrutas.
  const segments = href.split("/").filter(Boolean).length;
  return segments <= 1 ? pathname === href : pathname.startsWith(href);
}

export function DesktopNav({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200"
                    : "text-fg-muted hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function LangSwitch({
  target,
  label,
  short,
}: {
  target: Locale;
  label: string;
  short: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={switchLocalePath(pathname, target)}
      hrefLang={target}
      lang={target}
      aria-label={label}
      title={label}
      className="grid h-10 min-w-10 place-items-center rounded-full px-2 text-sm font-semibold text-fg-muted transition-colors hover:bg-bg-soft hover:text-fg"
    >
      {short}
    </Link>
  );
}

export function MobileNav({
  items,
  label,
  openLabel,
  closeLabel,
  footer,
}: {
  items: NavItem[];
  label: string;
  openLabel: string;
  closeLabel: string;
  footer?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape cierra y devuelve el foco al botón; se bloquea el scroll del fondo.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-movil"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full text-fg hover:bg-bg-soft"
      >
        {open ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
      </button>

      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg"
      >
        <nav aria-label={label} className="px-4 py-6">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-lg font-semibold ${
                      active
                        ? "bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-200"
                        : "hover:bg-bg-soft"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {footer ? <div className="mt-6">{footer}</div> : null}
        </nav>
      </div>
    </div>
  );
}
