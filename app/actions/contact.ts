"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getAdminServices } from "@/lib/firebase/admin"

const contactSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().trim().email("Ingresa un email corporativo válido"),
  organization: z.string().trim().min(2, "El nombre de la empresa u organización es requerido"),
  service: z.string().optional(),
  budget: z.string().optional(),
  details: z.string().optional(),
})

export async function submitContactForm(
  _prevState: { success: boolean; error: string | null } | null,
  formData: FormData
): Promise<{ success: boolean; error: string | null }> {
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

  // 1. Save lead into Cloud Firestore collection 'contact_leads'
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
  } else {
    console.log("[Contact Form] Firebase not configured — lead data received:", {
      name,
      email,
      organization,
      service,
      budget,
      details,
    })
  }

  // 2. Dispatch email notification via Resend (if configured)
  const resendApiKey = process.env.RESEND_API_KEY
  if (resendApiKey) {
    try {
      const { Resend } = await import("resend")
      const resend = new Resend(resendApiKey)
      const recipientEmail =
        process.env.CONTACT_NOTIFICATION_EMAIL || "admin@aethel.software"
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "Aethel Software <onboarding@resend.dev>"

      await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        subject: `⚡ [Nuevo Lead] ${name} — ${organization}`,
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
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;">Email:</td>
                  <td style="padding: 8px 0; color: #00e5ff;"><a href="mailto:${email}" style="color: #00e5ff; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;">Organización:</td>
                  <td style="padding: 8px 0; color: #ffffff;">${organization}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;">Servicio:</td>
                  <td style="padding: 8px 0; color: #e2c974;">${service || "No especificado"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8;">Presupuesto:</td>
                  <td style="padding: 8px 0; color: #ffffff;">${budget || "No especificado"}</td>
                </tr>
              </table>
            </div>

            ${
              details
                ? `
              <div style="margin-bottom: 24px;">
                <h3 style="color: #ffffff; font-size: 14px; margin-bottom: 8px;">Detalles & Requerimientos:</h3>
                <div style="background-color: #0e131f; padding: 16px; border-radius: 8px; border: 1px solid #1f293d; color: #cbd5e1; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${details}</div>
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
