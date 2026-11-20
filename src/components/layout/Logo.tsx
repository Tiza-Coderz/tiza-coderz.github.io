/**
 * Isotipo: «</>» en blanco sobre el azul de marca.
 * Es el mismo dibujo que `src/app/icon.svg` (favicon).
 */
export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0f4c75" />
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="11"
        fill="none"
        stroke="#0a2f49"
        strokeWidth="2"
      />
      <g
        fill="none"
        stroke="#f8f6f0"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      >
        <path d="M22 21 12 32l10 11" />
        <path d="M42 21l10 11-10 11" />
        <path d="M36 17 28 47" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-lg leading-none font-extrabold tracking-tight whitespace-nowrap">
        Tiza <span className="text-accent">Coderz</span>
      </span>
    </span>
  );
}
