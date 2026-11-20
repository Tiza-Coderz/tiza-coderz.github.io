"use client";

import { useState, type FormEvent } from "react";
import { IconCheck, IconMail, IconWhatsApp } from "@/components/ui/Icons";
import { buttonClasses } from "@/components/ui/Button";
import {
  buildMailto,
  formatContactMessage,
  isSpam,
  projectTypes,
  submitToFormspree,
  validateContact,
  type ContactData,
  type ContactErrorKey,
} from "@/lib/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type FormText = {
  name: string;
  contact: string;
  contactHint: string;
  business: string;
  projectType: string;
  projectTypes: Record<(typeof projectTypes)[number], string>;
  message: string;
  messagePlaceholder: string;
  honeypot: string;
  submit: string;
  sending: string;
  sendWhatsapp: string;
  sendEmail: string;
  success: string;
  errorNetwork: string;
  errorServer: string;
  noFormspree: string;
  errors: Record<ContactErrorKey, string>;
  messageLabels: {
    greeting: string;
    name: string;
    contact: string;
    business: string;
    projectType: string;
  };
  emailSubject: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; reason: "network" | "server" };

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim() ?? "";

const fieldClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-bg px-4 py-3 text-base text-fg placeholder:text-fg-muted/70 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 aria-[invalid=true]:border-red-500";

export function ContactForm({
  t,
  email,
  whatsapp,
}: {
  t: FormText;
  email: string;
  whatsapp: string;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof ContactData, ContactErrorKey>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function read(form: HTMLFormElement) {
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "");
    return {
      name: get("name"),
      contact: get("contact"),
      business: get("business"),
      projectType: get("projectType") as (typeof projectTypes)[number],
      message: get("message"),
      website: get("website"),
    };
  }

  /** Valida y, si hay errores, enfoca el primero (accesibilidad). */
  function validated(form: HTMLFormElement): ContactData | null {
    const input = read(form);
    const result = validateContact(input);
    if (!result.ok) {
      setErrors(result.errors);
      const first = Object.keys(result.errors)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return null;
    }
    setErrors({});
    return isSpam(input) ? null : result.data;
  }

  function text(data: ContactData) {
    return formatContactMessage(data, t.messageLabels, t.projectTypes[data.projectType]);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = validated(form);
    if (!data) return;

    // Sin Formspree configurado, el botón principal abre WhatsApp.
    if (!formspreeId) {
      window.open(buildWhatsAppUrl(whatsapp, text(data)), "_blank", "noopener");
      return;
    }

    setStatus({ kind: "sending" });
    const result = await submitToFormspree(formspreeId, data);
    if (result.ok) {
      setStatus({ kind: "success" });
      form.reset();
    } else {
      setStatus({ kind: "error", reason: result.reason });
    }
  }

  function sendBy(channel: "whatsapp" | "email", form: HTMLFormElement | null) {
    if (!form) return;
    const data = validated(form);
    if (!data) return;
    if (channel === "whatsapp")
      window.open(buildWhatsAppUrl(whatsapp, text(data)), "_blank", "noopener");
    else window.location.href = buildMailto(email, `${t.emailSubject}: ${data.name}`, text(data));
  }

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-whatsapp/40 bg-whatsapp/10 p-6 text-center"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-whatsapp text-white">
          <IconCheck className="size-6" />
        </span>
        <p className="mt-4 text-lg font-semibold">{t.success}</p>
      </div>
    );
  }

  const err = (field: keyof ContactData) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
        {t.errors[errors[field]!]}
      </p>
    ) : null;
  const aria = (field: keyof ContactData, hint?: string) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby":
      [errors[field] ? `${field}-error` : null, hint].filter(Boolean).join(" ") || undefined,
  });
  const sending = status.kind === "sending";

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5" aria-busy={sending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold">
            {t.name}
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className={fieldClass}
            {...aria("name")}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor="contact" className="text-sm font-semibold">
            {t.contact}
          </label>
          <input
            id="contact"
            name="contact"
            autoComplete="tel"
            inputMode="text"
            required
            className={fieldClass}
            {...aria("contact", "contact-hint")}
          />
          <p id="contact-hint" className="mt-1 text-xs text-fg-muted">
            {t.contactHint}
          </p>
          {err("contact")}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="business" className="text-sm font-semibold">
            {t.business}
          </label>
          <input id="business" name="business" autoComplete="organization" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="projectType" className="text-sm font-semibold">
            {t.projectType}
          </label>
          <select id="projectType" name="projectType" defaultValue="otro" className={fieldClass}>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {t.projectTypes[type]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={t.messagePlaceholder}
          className={fieldClass}
          {...aria("message")}
        />
        {err("message")}
      </div>

      {/* Campo trampa para bots: oculto a personas y lectores de pantalla. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">{t.honeypot}</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "error" ? (
        <p
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        >
          {status.reason === "network" ? t.errorNetwork : t.errorServer}
        </p>
      ) : null}

      {!formspreeId ? <p className="text-sm text-fg-muted">{t.noFormspree}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {formspreeId ? (
          <button type="submit" disabled={sending} className={buttonClasses("primary", "lg")}>
            {sending ? (
              <span
                aria-hidden="true"
                className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            ) : null}
            {sending ? t.sending : t.submit}
          </button>
        ) : null}
        <button
          type={formspreeId ? "button" : "submit"}
          onClick={formspreeId ? (e) => sendBy("whatsapp", e.currentTarget.form) : undefined}
          className={buttonClasses(formspreeId ? "secondary" : "whatsapp", "lg")}
        >
          <IconWhatsApp className="size-5" />
          {t.sendWhatsapp}
        </button>
        <button
          type="button"
          onClick={(e) => sendBy("email", e.currentTarget.form)}
          className={buttonClasses("secondary", "lg")}
        >
          <IconMail className="size-5" />
          {t.sendEmail}
        </button>
      </div>
    </form>
  );
}
