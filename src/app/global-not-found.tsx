import type { Metadata } from "next";
import { ThemeScript } from "@/components/layout/ThemeToggle";
import { LogoMark } from "@/components/layout/Logo";
import { basePath } from "@/lib/site";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 · Tiza Coderz",
  description: "Página no encontrada · Page not found",
};

/** 404 bilingüe para cualquier URL que no exista (GitHub Pages sirve /404.html). */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="grid min-h-dvh place-items-center p-6">
        <main className="max-w-md text-center">
          <LogoMark className="mx-auto size-14" />
          <p className="mt-6 text-6xl font-extrabold text-accent">404</p>
          <h1 className="mt-2 text-2xl font-bold">Página no encontrada</h1>
          <p className="mt-2 text-fg-muted">La página que busca no existe o cambió de dirección.</p>
          <p className="mt-1 text-sm text-fg-muted" lang="en">
            The page you are looking for doesn&apos;t exist.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`${basePath}/es/`}
              className="rounded-full bg-brand-700 px-5 py-2.5 font-semibold text-white hover:bg-brand-800"
            >
              Volver al inicio
            </a>
            <a
              href={`${basePath}/en/`}
              lang="en"
              className="rounded-full border border-line px-5 py-2.5 font-semibold"
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
