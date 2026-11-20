import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "highlight";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-sm shadow-brand-900/20 hover:bg-brand-800 dark:bg-brand-500 dark:hover:bg-brand-400",
  secondary:
    "border border-line bg-surface text-fg hover:border-brand-400 hover:text-accent dark:hover:border-brand-300",
  ghost: "text-fg hover:bg-bg-soft",
  whatsapp: "bg-whatsapp text-white shadow-sm shadow-black/10 hover:bg-whatsapp-strong",
  highlight: "bg-highlight text-brand-950 hover:bg-highlight-strong",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

/** Enlace interno (usa `next/link` para navegación sin recarga). */
export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, "className">) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

/** Enlace externo: abre en otra pestaña y avisa a lectores de pantalla. */
export function ButtonExternal({
  variant,
  size,
  className,
  children,
  srHint,
  ...props
}: CommonProps & Omit<ComponentProps<"a">, "className" | "target" | "rel"> & { srHint?: string }) {
  return (
    <a
      className={buttonClasses(variant, size, className)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
      {srHint ? <span className="sr-only"> {srHint}</span> : null}
    </a>
  );
}
