import { describe, expect, it, vi } from "vitest";
import {
  buildMailto,
  formatContactMessage,
  isSpam,
  submitToFormspree,
  validateContact,
  type ContactData,
} from "./contact";

const base = {
  name: "Yudith Pérez",
  contact: "+53 5 234 5678",
  business: "Cafetería La Rampa",
  projectType: "catalogo-menu-qr" as const,
  message: "Quiero un menú QR para la cafetería del Vedado.",
};

describe("validateContact", () => {
  it("acepta teléfono cubano o correo", () => {
    expect(validateContact(base).ok).toBe(true);
    expect(validateContact({ ...base, contact: "yudith@nauta.cu" }).ok).toBe(true);
  });

  it("recorta espacios y aplica valores por defecto", () => {
    const r = validateContact({
      name: "  Raúl  ",
      contact: "52345678",
      message: "Necesito una tienda online",
    });
    expect(r.ok && r.data).toMatchObject({ name: "Raúl", business: "", projectType: "otro" });
  });

  it("devuelve una clave de error por campo", () => {
    const r = validateContact({ name: "A", contact: "hola", message: "corto" });
    expect(r).toEqual({
      ok: false,
      errors: { name: "nameRequired", contact: "contactInvalid", message: "messageShort" },
    });
  });

  it("distingue contacto vacío de contacto mal escrito", () => {
    const r = validateContact({ ...base, contact: "   " });
    expect(!r.ok && r.errors.contact).toBe("contactRequired");
  });
});

describe("isSpam", () => {
  it("detecta el campo trampa relleno", () => {
    expect(isSpam({ ...base, website: "http://spam" })).toBe(true);
    expect(isSpam(base)).toBe(false);
  });
});

describe("mensajes", () => {
  const labels = {
    greeting: "Hola, Tiza Coderz.",
    name: "Nombre",
    contact: "Contacto",
    business: "Negocio",
    projectType: "Proyecto",
  };

  it("formatea el mensaje y omite el negocio vacío", () => {
    const data = { ...base, business: "", website: "" } as ContactData;
    const text = formatContactMessage(data, labels, "Catálogo / Menú QR");
    expect(text).toBe(
      "Hola, Tiza Coderz.\n\nQuiero un menú QR para la cafetería del Vedado.\n\nNombre: Yudith Pérez\nContacto: +53 5 234 5678\nProyecto: Catálogo / Menú QR",
    );
  });

  it("codifica asunto y cuerpo del mailto", () => {
    expect(buildMailto("tizacoders@gmail.com", "Menú QR", "Línea 1\nLínea 2")).toBe(
      "mailto:tizacoders@gmail.com?subject=Men%C3%BA%20QR&body=L%C3%ADnea%201%0AL%C3%ADnea%202",
    );
  });
});

describe("submitToFormspree", () => {
  const data = { ...base, website: "" } as ContactData;

  it("envía JSON y devuelve ok", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    await expect(submitToFormspree("abc123", data, fetchMock)).resolves.toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://formspree.io/f/abc123");
    expect(JSON.parse(init.body)).toMatchObject({
      name: "Yudith Pérez",
      projectType: "catalogo-menu-qr",
    });
  });

  it("distingue error del servidor y de red", async () => {
    const serverError = vi.fn().mockResolvedValue(new Response("{}", { status: 422 }));
    const offline = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(submitToFormspree("abc", data, serverError)).resolves.toEqual({
      ok: false,
      reason: "server",
    });
    await expect(submitToFormspree("abc", data, offline)).resolves.toEqual({
      ok: false,
      reason: "network",
    });
  });
});
