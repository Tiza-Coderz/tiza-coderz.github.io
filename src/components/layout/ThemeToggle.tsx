"use client";

import { IconMoon, IconSun } from "@/components/ui/Icons";

/**
 * Alterna claro/oscuro. El estado vive en la clase `.dark` de <html> (la pone el
 * script anti-parpadeo de `ThemeScript`), así que este botón no necesita
 * estado de React: los iconos se muestran u ocultan solo con CSS.
 */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const dark = !root.classList.contains("dark");
    root.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Modo privado o almacenamiento bloqueado: el tema vale solo para esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-fg-muted transition-colors hover:bg-bg-soft hover:text-fg"
    >
      <IconMoon className="size-5 dark:hidden" />
      <IconSun className="hidden size-5 dark:block" />
    </button>
  );
}

/** Se ejecuta antes de pintar para evitar el destello de tema incorrecto. */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
