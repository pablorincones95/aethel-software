"use server"

import { revalidatePath } from "next/cache"
import { getAdminServices } from "@/lib/firebase/admin"
import { verifyAdminSession } from "@/app/admin/actions/auth"

const ALLOWED_SECTION_KEYS = new Set([
  "hero",
  "services",
  "design_seo",
  "ai_services",
  "tech_stack",
  "process",
  "philosophy",
  "contact",
])

export async function updateContentSection(
  sectionKey: string,
  content: Record<string, unknown>
) {
  // 1. Enforce admin authentication
  const session = await verifyAdminSession()
  if (!session.authenticated) {
    return { success: false, error: session.error || "Acceso no autorizado." }
  }

  // 2. Validate section key to prevent arbitrary collection key tampering
  const cleanKey = sectionKey.trim().toLowerCase()
  if (!ALLOWED_SECTION_KEYS.has(cleanKey)) {
    return { success: false, error: `Clave de sección no válida: ${sectionKey}` }
  }

  // 3. Ensure database service is active
  const { db } = getAdminServices()
  if (!db) {
    return { success: false, error: "Firebase no está configurado en el servidor." }
  }

  try {
    await db
      .collection("site_content")
      .doc(cleanKey)
      .set(
        {
          section_key: cleanKey,
          content,
          updated_at: new Date().toISOString(),
          updated_by: session.email || "admin",
        },
        { merge: true }
      )

    revalidatePath("/admin/content")
    revalidatePath("/")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error al actualizar sección de contenido"
    return { success: false, error: message }
  }
}

