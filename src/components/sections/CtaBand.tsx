import { company } from "@data/company";
import { ButtonExternal, buttonClasses } from "@/components/ui/Button";
import { IconMail, IconWhatsApp } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Layout";
import type { Dictionary } from "@/i18n";
import { whatsappLink } from "@/lib/site";

/** Llamada final a la acción, en el panel de marca. Se repite al pie de cada página. */
export function CtaBand({ dict, message }: { dict: Dictionary; message?: string }) {
  return (
    <section aria-labelledby="cta-titulo" className="py-16 sm:py-20">
      <Container>
        <div className="relative reveal overflow-hidden rounded-[2rem] bg-brand-panel px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <h2
            id="cta-titulo"
            className="text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            {dict.ctaBand.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-pretty text-white/80">
            {dict.ctaBand.text}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonExternal
              href={whatsappLink(message ?? dict.whatsapp.defaultMessage)}
              variant="whatsapp"
              size="lg"
              srHint={dict.a11y.externalLink}
            >
              <IconWhatsApp className="size-5" />
              {dict.ctaBand.whatsapp}
            </ButtonExternal>
            <a
              href={`mailto:${company.email}`}
              className={buttonClasses("ghost", "lg", "text-white hover:bg-white/10")}
            >
              <IconMail className="size-5" />
              {dict.ctaBand.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
