import { IconWhatsApp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";

/** Botón flotante de WhatsApp, visible en todas las páginas. Sin JavaScript. */
export function WhatsAppFab({ message, label }: { message: string; label: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 hover:bg-whatsapp-strong sm:right-6 sm:bottom-6"
    >
      <IconWhatsApp className="size-7" />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp opacity-25 [animation-iteration-count:3]"
      />
    </a>
  );
}
