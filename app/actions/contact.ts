"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { z } from "zod"
import { getAdminServices } from "@/lib/firebase/admin"
import { checkRateLimit } from "@/lib/rate-limit"

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .trim()
    .email("Ingresa un email corporativo válido")
    .max(120, "El email no puede exceder 120 caracteres"),
  organization: z
    .string()
    .trim()
    .min(2, "El nombre de la empresa u organización es requerido")
    .max(100, "La organización no puede exceder 100 caracteres"),
  service: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(50).optional(),
  details: z.string().trim().max(3000, "El mensaje no puede exceder 3,000 caracteres").optional(),
})

export async function submitContactForm(
  _prevState: { success: boolean; error: string | null } | null,
  formData: FormData
): Promise<{ success: boolean; error: string | null }> {
  // 1. Honeypot check (anti-bot trap)
  const honeypot = formData.get("aethel_contact_hp") as string
  if (honeypot && honeypot.trim().length > 0) {
    // Silently succeed to confuse malicious bots
    return { success: true, error: null }
  }

  // 2. IP-based Rate Limiting (max 3 submissions per 10 minutes)
  const headerList = await headers()
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "127.0.0.1"
  const rateCheck = checkRateLimit(`contact::${ip}`, {
    windowMs: 10 * 60 * 1000,
    max: 3,
  })

  if (!rateCheck.success) {
    const minutes = Math.ceil(rateCheck.retryAfterSeconds / 60)
    return {
      success: false,
      error: `Has alcanzado el límite de envíos. Por favor espera ${minutes} minuto(s) antes de enviar otra consulta.`,
    }
  }

  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    organization: formData.get("organization") as string,
    service: (formData.get("service") as string) || undefined,
    budget: (formData.get("budget") as string) || undefined,
    details: (formData.get("details") as string) || undefined,
  }

  const validated = contactSchema.safeParse(rawData)

  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message }
  }

  const { name, email, organization, service, budget, details } = validated.data
  const { db } = getAdminServices()

  // 3. Save lead into Cloud Firestore collection 'contact_leads'
  if (db) {
    try {
      await db.collection("contact_leads").add({
        name,
        email,
        organization,
        service: service || null,
        budget: budget || null,
        details: details || null,
        status: "new",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    } catch (dbError) {
      console.error("[Contact Form] Firestore Insert error:", dbError)
    }
  }

  // 4. Dispatch email notification via Resend with sanitized/escaped HTML
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    try {
      const { Resend } = await import("resend")
      const resend = new Resend(resendApiKey)
      const recipientEmail =
        process.env.CONTACT_NOTIFICATION_EMAIL || "admin@aethel.software"
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "Aethel Software <onboarding@resend.dev>"

      const safeName = escapeHtml(name)
      const safeEmail = escapeHtml(email)
      const safeOrg = escapeHtml(organization)
      const safeService = escapeHtml(service || "No especificado")
      const safeBudget = escapeHtml(budget || "No especificado")
      const safeDetails = details ? escapeHtml(details) : null

      await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        subject: `⚡ [Nuevo Lead] ${safeName} — ${safeOrg}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #030712; color: #f0f6fc; padding: 32px; border-radius: 12px; border: 1px solid #1f293d;">
            <div style="margin-bottom: 24px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #00e5ff; font-weight: bold;">Aethel Software // Inbound Request</span>
              <h1 style="color: #ffffff; margin: 8px 0 0; font-size: 22px;">Nueva Solicitud de Evaluación Técnica</h1>
            </div>

            <div style="background-color: #0e131f; border-radius: 8px; padding: 20px; border: 1px solid #1f293d; margin-bottom: 24px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; width: 140px;">Nombre:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;">Email:</td>
                  <td style="padding: 8px 0; color: #00e5ff;"><a href="mailto:${safeEmail}" style="color: #00e5ff; text-decoration: none;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;">Organización:</td>
                  <td style="padding: 8px 0; color: #ffffff;">${safeOrg}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;">Servicio:</td>
                  <td style="padding: 8px 0; color: #e2c974;">${safeService}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;">Presupuesto:</td>
                  <td style="padding: 8px 0; color: #ffffff;">${safeBudget}</td>
                </tr>
              </table>
            </div>

            ${
              safeDetails
                ? `
              <div style="margin-bottom: 24px;">
                <h3 style="color: #ffffff; font-size: 14px; margin-bottom: 8px;">Detalles & Requerimientos:</h3>
                <div style="background-color: #0e131f; padding: 16px; border-radius: 8px; border: 1px solid #1f293d; color: #cbd5e1; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${safeDetails}</div>
              </div>
            `
                : ""
            }

            <div style="border-top: 1px solid #1f293d; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
              Recibido en Aethel Software · Sistema Automatizado de Telemetría
            </div>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("[Contact Form] Resend dispatch error:", emailError)
    }
  }

  revalidatePath("/admin/leads")
  return { success: true, error: null }
}

