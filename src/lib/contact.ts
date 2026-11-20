import { z } from "zod";

/**
 * Lógica del formulario de contacto, separada del componente para poder
 * testearla. El formulario tiene tres salidas:
 *   1. Formspree (si hay NEXT_PUBLIC_FORMSPREE_ID): envío real por correo.
 *   2. WhatsApp: abre wa.me con el mensaje ya redactado.
 *   3. mailto: abre el correo del visitante (respaldo sin servicios externos).
 */
export const projectTypes = [
  "presencia",
  "catalogo-menu-qr",
  "tienda-online",
  "sistema-de-gestion",
  "app-movil",
  "automatizacion-ia",
  "otro",
] as const;

export type ContactErrorKey =
  "nameRequired" | "contactRequired" | "contactInvalid" | "messageShort";

const phoneRe = /^\+?[\d\s()-]{8,}$/;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameRequired"),
  contact: z
    .string()
    .trim()
    .min(1, "contactRequired")
    .refine((v) => emailRe.test(v) || phoneRe.test(v), "contactInvalid"),
  business: z.string().trim().max(120).default(""),
  projectType: z.enum(projectTypes).default("otro"),
  message: z.string().trim().min(10, "messageShort").max(2000),
  /** Campo trampa: los bots lo rellenan, las personas no lo ven. */
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export type ValidationResult =
  | { ok: true; data: ContactData }
  | { ok: false; errors: Partial<Record<keyof ContactData, ContactErrorKey>> };

export function validateContact(input: ContactInput): ValidationResult {
  const parsed = contactSchema.safeParse(input);
  if (parsed.success) return { ok: true, data: parsed.data };
  const errors: Partial<Record<keyof ContactData, ContactErrorKey>> = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as keyof ContactData;
    if (!errors[field]) errors[field] = issue.message as ContactErrorKey;
  }
  return { ok: false, errors };
}

export function isSpam(input: ContactInput): boolean {
  return Boolean(input.website && input.website.trim().length > 0);
}

/** Texto plano del mensaje, igual para WhatsApp y correo. */
export function formatContactMessage(
  data: ContactData,
  labels: {
    greeting: string;
    name: string;
    contact: string;
    business: string;
    projectType: string;
  },
  projectTypeLabel: string,
): string {
  return [
    labels.greeting,
    "",
    data.message,
    "",
    `${labels.name}: ${data.name}`,
    `${labels.contact}: ${data.contact}`,
    data.business ? `${labels.business}: ${data.business}` : null,
    `${labels.projectType}: ${projectTypeLabel}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

export function buildMailto(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type SubmitResult = { ok: true } | { ok: false; reason: "network" | "server" };

/** Envía a Formspree. Devuelve un resultado en vez de lanzar, para pintar el estado de error. */
export async function submitToFormspree(
  formId: string,
  data: ContactData,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  try {
    const res = await fetchImpl(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        contact: data.contact,
        business: data.business,
        projectType: data.projectType,
        message: data.message,
        _subject: `Nuevo contacto web: ${data.name}`,
      }),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "server" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
