/**
 * Construye un enlace `https://wa.me/<número>?text=<mensaje>`.
 *
 * - Acepta el número con espacios, guiones, paréntesis o `+` y deja solo dígitos.
 * - Si el número tiene 8 dígitos (móvil cubano sin prefijo) le añade el 53.
 * - El mensaje se codifica con `encodeURIComponent` (tildes, ñ, saltos de línea).
 */
export function normalizeCubanPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 0) {
    throw new Error("El número de WhatsApp está vacío.");
  }
  if (digits.length === 8) return `53${digits}`;
  if (digits.startsWith("0053")) return digits.slice(2);
  return digits;
}

export function buildWhatsAppUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${normalizeCubanPhone(phone)}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Sustituye `{clave}` en una plantilla. Las claves que faltan se dejan tal cual. */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
