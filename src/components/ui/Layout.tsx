import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
}

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** `soft` = fondo gris suave para alternar secciones. */
  tone?: "default" | "soft";
  align?: "left" | "center";
  /** Nivel del título: h1 en cabeceras de página, h2 en secciones. */
  as?: "h1" | "h2";
};

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
  tone = "default",
  align = "left",
  as: Heading = "h2",
}: SectionProps) {
  const headingId = id ? `${id}-titulo` : undefined;
  const centered = align === "center";
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`py-16 sm:py-24 ${tone === "soft" ? "bg-bg-soft" : ""} ${className}`}
    >
      <Container>
        {eyebrow || title || intro ? (
          <header className={`mb-10 max-w-2xl sm:mb-14 ${centered ? "mx-auto text-center" : ""}`}>
            {eyebrow ? (
              <p className="text-sm font-semibold tracking-wider text-accent uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <Heading
                id={headingId}
                className={`mt-2 font-bold tracking-tight text-balance ${Heading === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}
              >
                {title}
              </Heading>
            ) : null}
            {intro ? (
              <p className="mt-4 text-lg leading-relaxed text-pretty text-fg-muted">{intro}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </Container>
    </section>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "highlight";
}) {
  const tones = {
    neutral: "border-line bg-bg-soft text-fg-muted",
    brand:
      "border-brand-200 bg-brand-50 text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200",
    highlight: "border-highlight/50 bg-highlight/15 text-brand-900 dark:text-highlight",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-(--radius-card) border border-line bg-surface p-6 shadow-sm shadow-black/[0.03] ${className}`}
    >
      {children}
    </div>
  );
}
