import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Tiza Coderz",
  robots: { index: false, follow: true },
};

/** Layout raíz solo para `/`, que redirige al idioma del visitante. */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
